import { getMongoClient } from "@/lib/mongodb";

export const runtime = "nodejs";
export const maxDuration = 10;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
};

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function jsonResponse(
  body: { error?: string; ok?: boolean; code?: string },
  status: number
) {
  return Response.json(body, { status });
}

function getErrorDetails(error: unknown) {
  const errorName = error instanceof Error ? error.name : "UnknownError";
  const errorMessage = error instanceof Error ? error.message : String(error);
  const lowerMessage = errorMessage.toLowerCase();

  if (lowerMessage.includes("bad auth") || lowerMessage.includes("auth")) {
    return { errorName, errorMessage, code: "MONGODB_AUTH_FAILED" };
  }

  if (lowerMessage.includes("timed out") || lowerMessage.includes("timeout")) {
    return { errorName, errorMessage, code: "MONGODB_TIMEOUT" };
  }

  if (
    lowerMessage.includes("ssl") ||
    lowerMessage.includes("tls") ||
    lowerMessage.includes("certificate") ||
    lowerMessage.includes("alert internal error")
  ) {
    return { errorName, errorMessage, code: "MONGODB_TLS_OR_NETWORK_ERROR" };
  }

  if (
    lowerMessage.includes("econnrefused") ||
    lowerMessage.includes("enotfound") ||
    lowerMessage.includes("querysrv")
  ) {
    return { errorName, errorMessage, code: "MONGODB_NETWORK_ERROR" };
  }

  return { errorName, errorMessage, code: "MONGODB_SAVE_FAILED" };
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid request body." }, 400);
  }

  const name = cleanText(payload.name);
  const email = cleanText(payload.email);
  const message = cleanText(payload.message);
  const website = cleanText(payload.website);

  if (website) {
    return jsonResponse({ ok: true }, 200);
  }

  if (!name || !email || !message) {
    return jsonResponse({ error: "Name, email, and message are required." }, 400);
  }

  if (!isValidEmail(email)) {
    return jsonResponse({ error: "Please enter a valid email address." }, 400);
  }

  if (name.length > 120 || email.length > 180 || message.length > 3000) {
    return jsonResponse({ error: "Message is too long." }, 400);
  }

  if (!process.env.MONGODB_URI) {
    return jsonResponse({ error: "Contact form database is not configured yet." }, 503);
  }

  const dbName = process.env.MONGODB_DB || "portfolio";
  const collectionName = process.env.MONGODB_MESSAGES_COLLECTION || "messages";

  try {
    const client = await getMongoClient();

    await client.db(dbName).collection(collectionName).insertOne({
      name,
      email: email.toLowerCase(),
      message,
      status: "unread",
      source: "portfolio-contact-form",
      createdAt: new Date(),
      metadata: {
        userAgent: request.headers.get("user-agent"),
        referrer: request.headers.get("referer"),
      },
    });
  } catch (error) {
    const details = getErrorDetails(error);

    console.error("MongoDB contact insert failed", {
      dbName,
      collectionName,
      connectionFormat: process.env.MONGODB_URI?.startsWith("mongodb+srv://")
        ? "srv"
        : "direct",
      errorName: details.errorName,
      errorMessage: details.errorMessage,
      code: details.code,
    });

    return jsonResponse(
      {
        error: "Message could not be saved right now.",
        code: details.code,
      },
      502
    );
  }

  return jsonResponse({ ok: true }, 200);
}

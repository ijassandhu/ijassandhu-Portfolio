import { MongoClient, type MongoClientOptions } from "mongodb";

const options: MongoClientOptions = {
  maxPoolSize: 1,
  minPoolSize: 0,
  connectTimeoutMS: 5000,
  socketTimeoutMS: 10000,
  serverSelectionTimeoutMS: 5000,
};

const TLS_PARAM_PATTERN = /[?&](tls|ssl)=/i;

declare global {
  var mongoClient: MongoClient | undefined;
  var mongoClientPromise: Promise<MongoClient> | undefined;
}

function appendUriParam(uri: string, key: string, value: string) {
  if (uri.endsWith("?") || uri.endsWith("&")) {
    return `${uri}${key}=${value}`;
  }

  return `${uri}${uri.includes("?") ? "&" : "?"}${key}=${value}`;
}

function shouldForceAtlasTls(uri: string) {
  return (
    uri.startsWith("mongodb://") &&
    uri.includes(".mongodb.net") &&
    !TLS_PARAM_PATTERN.test(uri)
  );
}

function getNormalizedMongoUri(uri: string) {
  return shouldForceAtlasTls(uri) ? appendUriParam(uri, "tls", "true") : uri;
}

export function getMongoConnectionInfo() {
  const uri = process.env.MONGODB_URI || "";

  return {
    connectionFormat: uri.startsWith("mongodb+srv://") ? "srv" : "direct",
    atlasHost: uri.includes(".mongodb.net"),
    tlsConfigured:
      uri.startsWith("mongodb+srv://") ||
      /[?&](tls|ssl)=true/i.test(uri) ||
      shouldForceAtlasTls(uri),
    tlsAddedByApp: shouldForceAtlasTls(uri),
  };
}

export function getMongoClient() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (globalThis.mongoClient) {
    return Promise.resolve(globalThis.mongoClient);
  }

  globalThis.mongoClientPromise ??= new MongoClient(getNormalizedMongoUri(uri), options)
    .connect()
    .then((client) => {
      globalThis.mongoClient = client;
      return client;
    })
    .catch((error) => {
      globalThis.mongoClientPromise = undefined;
      throw error;
    });

  return globalThis.mongoClientPromise;
}

import { MongoClient } from "mongodb";

const options = {};

declare global {
  var mongoClientPromise: Promise<MongoClient> | undefined;
}

export function getMongoClient() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (process.env.NODE_ENV === "development") {
    globalThis.mongoClientPromise ??= new MongoClient(uri, options).connect();
    return globalThis.mongoClientPromise;
  }

  return new MongoClient(uri, options).connect();
}

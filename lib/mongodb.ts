import { MongoClient, type MongoClientOptions } from "mongodb";

const options: MongoClientOptions = {
  maxPoolSize: 1,
  minPoolSize: 0,
  connectTimeoutMS: 5000,
  socketTimeoutMS: 10000,
  serverSelectionTimeoutMS: 5000,
};

declare global {
  var mongoClient: MongoClient | undefined;
  var mongoClientPromise: Promise<MongoClient> | undefined;
}

export function getMongoClient() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (globalThis.mongoClient) {
    return Promise.resolve(globalThis.mongoClient);
  }

  globalThis.mongoClientPromise ??= new MongoClient(uri, options)
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

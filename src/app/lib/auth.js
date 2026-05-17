import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

// Singleton pattern for Vercel serverless
let client = null;
let db = null;
let connectPromise = null;

async function getDb() {
  // Return existing connection if available
  if (client && db) {
    return { client, db };
  }

  // Prevent multiple simultaneous connection attempts
  if (connectPromise) {
    return connectPromise;
  }

  connectPromise = (async () => {
    try {
      if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI environment variable is not set");
      }

      client = new MongoClient(process.env.MONGO_URI, {
        maxPoolSize: 1, // Serverless friendly
        minPoolSize: 0,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 10000,
      });

      await client.connect();
      db = client.db();
      connectPromise = null;
      return { client, db };
    } catch (error) {
      connectPromise = null;
      throw error;
    }
  })();

  return connectPromise;
}

let authInstance = null;

export async function getAuth() {
  if (authInstance) {
    return authInstance;
  }

  const { client: mongoClient, db: mongoDb } = await getDb();

  authInstance = betterAuth({
    database: mongodbAdapter(mongoDb, {
      client: mongoClient,
    }),
    emailAndPassword: {
      enabled: true,
    },
    baseURL: process.env.BETTER_AUTH_URL || 
      (process.env.NODE_ENV === "production" 
        ? "https://mango-rosy.vercel.app" 
        : "http://localhost:3000"),
    basePath: "/api/auth",
    trustedOrigins: (process.env.BETTER_AUTH_TRUSTED_ORIGINS || "").split(",").filter(Boolean),
  });

  return authInstance;
}

export const auth = new Proxy(
  {},
  {
    get: (target, prop) => {
      return async (...args) => {
        const authInstance = await getAuth();
        return authInstance[prop]?.(...args);
      };
    },
  }
);
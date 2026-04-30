import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { username } from "better-auth/plugins";
import { MongoClient } from "mongodb";

let db = null;
let authInstance = null;

async function getDatabase() {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  return client.db("user");
}

async function createAuthInstance() {
  if (!db) {
    db = await getDatabase();
  }

  const baseURL = process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_BETTER_AUTH_URL;
  
  const trustedOrigins = process.env.BETTER_AUTH_TRUSTED_ORIGINS
    ? process.env.BETTER_AUTH_TRUSTED_ORIGINS.split(',')
    : [
        "http://localhost:3000",
        "https://mango-rosy.vercel.app",
      ];

  return betterAuth({
    baseURL,
    database: mongodbAdapter(db),
    plugins: [username()],
    emailAndPassword: {
      enabled: true,
    },
    trustedOrigins,
  });
}

export async function getAuth() {
  if (!authInstance) {
    authInstance = await createAuthInstance();
  }
  return authInstance;
}

export const auth = createAuthInstance();

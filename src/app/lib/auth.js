import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

// Singleton pattern to avoid multiple connections
let client;
let db;

async function getDb() {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URI);
    await client.connect(); // ← THIS was missing
    db = client.db();
  }
  return { client, db };
}

const { client: mongoClient, db: mongoDb } = await getDb();

export const auth = betterAuth({
  database: mongodbAdapter(mongoDb, {
    client: mongoClient,
  }),
  emailAndPassword: {
    enabled: true,
  },
});
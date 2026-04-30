import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { username } from "better-auth/plugins";
import { MongoClient } from "mongodb";

if (!global._mongoClient) {
  global._mongoClient = new MongoClient(process.env.MONGO_URI);
}

const client = global._mongoClient;
await client.connect();
const db = client.db("user");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: mongodbAdapter(db),
  plugins: [username()],
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [
    "https://mango-rosy.vercel.app",
    "https://mango-mzj3nw3u5-rahatakondo18-6432s-projects.vercel.app",
    "http://localhost:3000",
  ],
});
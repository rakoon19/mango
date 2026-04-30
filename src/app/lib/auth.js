import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { username } from "better-auth/plugins";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db("user");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  plugins: [username()],
  emailAndPassword: {
    enabled: true,
  },
  emailSender: {
    async send(data) {
      console.log("Verification email data:", data);
    },
  },
  // Update this section:
  trustedOrigins: [
    "https://mango-mzj3nw3u5-rahatakondo18-6432s-projects.vercel.app", // Your Frontend
    "http://localhost:3000", // For local development
  ],
});
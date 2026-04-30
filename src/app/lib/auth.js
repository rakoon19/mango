import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { username } from "better-auth/plugins";
import { MongoClient } from "mongodb";

let authInstance = null;

async function createAuthInstance() {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  const db = client.db("user");

  const baseURL = process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_BETTER_AUTH_URL;
  
const trustedOrigins = process.env.BETTER_AUTH_TRUSTED_ORIGINS
    ? process.env.BETTER_AUTH_TRUSTED_ORIGINS.split(',')
    : [
        "http://localhost:3000",
        "https://mango-rosy.vercel.app",
        "https://mango-1n4j93fkk-rahatakondo18-6432s-projects.vercel.app",
        "https://mango-1fancsst2-rahatakondo18-6432s-projects.vercel.app",
        "https://mango-mgjnrbk79-rahatakondo18-6432s-projects.vercel.app",
        "https://mango-88sz87n67-rahatakondo18-6432s-projects.vercel.app",
        "https://*.vercel.app"
      ];

  return betterAuth({
    baseURL,
    database: mongodbAdapter(db),
    plugins: [username()],
    emailAndPassword: { enabled: true },
    trustedOrigins,
  });
}

export async function getAuth() {
  if (!authInstance) {
    authInstance = await createAuthInstance();
  }
  return authInstance;
}

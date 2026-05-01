import { createAuthClient } from "better-auth/react";

const getBaseURL = () => {
  if (typeof window !== "undefined" && window.location.hostname === "localhost") { // ← fixed
    return "http://localhost:3000";
  }
  return process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "https://mango-rosy.vercel.app"; // ← fixed
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
});

export const { signIn, signUp, useSession } = authClient;
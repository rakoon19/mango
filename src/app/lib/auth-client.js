import { createAuthClient } from "better-auth/react";

const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost';

const getBaseURL = () => {
  if (isLocalhost) {
    return "http://localhost:3000";
  }
  return process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "https://mango-rosy.vercel.app";
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
});

export const { signIn, signUp, useSession } = authClient;

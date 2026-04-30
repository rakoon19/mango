import { createAuthClient } from "better-auth/react";

const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost';

export const authClient = createAuthClient({
  baseURL: isLocalhost 
    ? "http://localhost:3000" 
    : process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "https://mango-rosy.vercel.app"
});

export const { signIn, signUp, useSession } = authClient;

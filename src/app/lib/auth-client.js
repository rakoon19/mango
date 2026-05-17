import { createAuthClient } from "better-auth/react"

const baseURL = process.env.NODE_ENV === "production" 
  ? (typeof window !== "undefined" ? window.location.origin : "https://mango-rosy.vercel.app")
  : "http://localhost:3000";

export const authClient = createAuthClient({
    baseURL: baseURL,
    basePath: "/api/auth",
})
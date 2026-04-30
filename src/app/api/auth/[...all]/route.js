import { getAuth } from "@/app/lib/auth"; 
import { toNextJsHandler } from "better-auth/next-js";

function isOriginAllowed(origin, trustedOrigins) {
  if (!origin) return false;
  if (trustedOrigins.includes(origin)) return true;
  
  // Support wildcard *.vercel.app
  for (const trusted of trustedOrigins) {
    if (trusted.endsWith(".vercel.app")) {
      const baseDomain = trusted.replace("*.", "");
      if (origin.endsWith(baseDomain) || origin.includes(".vercel.app")) {
        return true;
      }
    }
  }
  return false;
}

async function addCORSHeaders(response, request) {
  const auth = await getAuth();
  const trustedOrigins = auth?.trustedOrigins || [];
  
  const origin = request?.headers?.get("origin");
  const allowedOrigin = isOriginAllowed(origin, trustedOrigins) ? origin : trustedOrigins[0] || "*";
  
  const newHeaders = new Headers(response.headers);
  newHeaders.set("Access-Control-Allow-Origin", allowedOrigin);
  newHeaders.set("Access-Control-Allow-Credentials", "true");
  newHeaders.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  newHeaders.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}

export const OPTIONS = async (request) => {
  const auth = await getAuth();
  const trustedOrigins = auth?.trustedOrigins || [];
  
  const origin = request?.headers?.get("origin");
  const allowedOrigin = isOriginAllowed(origin, trustedOrigins) ? origin : "*";
  
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": allowedOrigin,
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
    },
  });
};

export const POST = async (request) => {
  const auth = await getAuth();
  const handler = toNextJsHandler(auth);
  const response = await handler.POST(request);
  return addCORSHeaders(response, request);
};

export const GET = async (request) => {
  const auth = await getAuth();
  const handler = toNextJsHandler(auth);
  const response = await handler.GET(request);
  return addCORSHeaders(response, request);
};

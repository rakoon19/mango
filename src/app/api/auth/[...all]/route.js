import { getAuth } from "@/app/lib/auth"; 
import { toNextJsHandler } from "better-auth/next-js";

function isOriginAllowed(origin, trustedOrigins) {
  if (!origin) return false;
  if (trustedOrigins.includes(origin)) return true;
  
  // Support wildcard *.vercel.app and other wildcard patterns
  for (const trusted of trustedOrigins) {
    if (trusted.startsWith("*.")) {
      // Handle wildcard patterns like *.vercel.app
      const baseDomain = trusted.slice(2); // Remove "*." prefix
      // Check if origin ends with the base domain (handles multi-level subdomains)
      if (origin.endsWith(baseDomain) || origin === baseDomain) {
        return true;
      }
    }
    // Also check if origin is a subdomain of any trusted origin
    if (trusted.endsWith(".vercel.app") || trusted.includes(".vercel.app")) {
      const baseDomain = ".vercel.app";
      if (origin.endsWith(baseDomain)) {
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
  // Always use the specific origin - never use wildcard when credentials are included
  let allowedOrigin;
  if (isOriginAllowed(origin, trustedOrigins)) {
    allowedOrigin = origin; // Return the exact origin from the request
  } else if (origin && origin.includes(".vercel.app")) {
    // Allow any vercel.app preview deployment
    allowedOrigin = origin;
  } else {
    // Fallback to first trusted origin or the origin if present
    allowedOrigin = trustedOrigins[0] || origin || "https://mango-rosy.vercel.app";
  }
  
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
  // Never use wildcard when credentials are included - always use specific origin
  let allowedOrigin;
  if (isOriginAllowed(origin, trustedOrigins)) {
    allowedOrigin = origin;
  } else if (origin && origin.includes(".vercel.app")) {
    // Allow any vercel.app preview deployment
    allowedOrigin = origin;
  } else {
    allowedOrigin = trustedOrigins[0] || origin || "https://mango-rosy.vercel.app";
  }
  
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

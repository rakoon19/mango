import { getAuth } from "@/app/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "https://mango-rosy.vercel.app",
];

function getCORSHeaders(origin) {
  const allowedOrigin =
    origin && ALLOWED_ORIGINS.includes(origin)
      ? origin
      : ALLOWED_ORIGINS[0];

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

export const OPTIONS = async (request) => {
  const origin = request.headers.get("origin");
  return new Response(null, {
    status: 204,
    headers: {
      ...getCORSHeaders(origin),
      "Access-Control-Max-Age": "86400",
    },
  });
};

export const GET = async (request) => {
  const auth = await getAuth();
  const { GET: handler } = toNextJsHandler(auth);
  const response = await handler(request);

  const origin = request.headers.get("origin");
  const newHeaders = new Headers(response.headers);
  Object.entries(getCORSHeaders(origin)).forEach(([k, v]) =>
    newHeaders.set(k, v)
  );

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
};

export const POST = async (request) => {
  const auth = await getAuth();
  const { POST: handler } = toNextJsHandler(auth);
  const response = await handler(request);

  const origin = request.headers.get("origin");
  const newHeaders = new Headers(response.headers);
  Object.entries(getCORSHeaders(origin)).forEach(([k, v]) =>
    newHeaders.set(k, v)
  );

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
};
import { getAuth } from "@/app/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export async function POST(request) {
  const auth = await getAuth();
  const handler = toNextJsHandler(auth);
  return handler.POST(request);
}

export async function GET(request) {
  const auth = await getAuth();
  const handler = toNextJsHandler(auth);
  return handler.GET(request);
}
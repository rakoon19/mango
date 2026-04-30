import { getAuth } from "@/app/lib/auth"; 
import { toNextJsHandler } from "better-auth/next-js";

export const POST = async (request) => {
  const auth = await getAuth();
  const handler = toNextJsHandler(auth);
  return handler.POST(request);
};

export const GET = async (request) => {
  const auth = await getAuth();
  const handler = toNextJsHandler(auth);
  return handler.GET(request);
};

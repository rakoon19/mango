import { getAuth } from "@/app/lib/auth"; 
import { toNextJsHandler } from "better-auth/next-js";

const authPromise = getAuth();

export const { POST, GET } = toNextJsHandler(await authPromise);

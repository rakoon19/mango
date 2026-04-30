import dns from "node:dns";
dns.setServers(['8.8.8.8', '8.8.4.4']);

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { username } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db("user");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),
    emailAndPassword: { 
    enabled: true, 
  },    
});
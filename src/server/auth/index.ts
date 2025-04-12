// src/server/auth/index.ts

import NextAuth from "next-auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { cache } from "react";
import { authConfig } from "./config";

/**
 * Returns a JSON‑serializable session object (or null) for the current request.
 */
export async function auth() {
  const session = await getServerSession(authConfig);
  return session ? JSON.parse(JSON.stringify(session)) : null;
}

/**
 * Triggers a redirect to the sign‑in page.
 */
export async function signIn() {
  redirect("/api/auth/signin");
}

/**
 * Triggers a redirect to the sign‑out page.
 */
export async function signOut() {
  redirect("/api/auth/signout");
}

// If you need additional NextAuth handlers for your API routes:
const { handlers } = NextAuth(authConfig);
export { handlers };

// Optionally, if you want to cache your auth call:
export const cachedAuth = cache(() => getServerSession(authConfig));

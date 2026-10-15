import "server-only";

import { createClient } from "@insforge/sdk";

export function createInsforgeReadClient() {
  const baseUrl = process.env.NEXT_PUBLIC_INSFORGE_URL;
  const anonKey = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY;

  if (!baseUrl || !anonKey) {
    return null;
  }

  return createClient({ baseUrl, anonKey });
}

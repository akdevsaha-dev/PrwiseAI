import { headers } from "next/headers";
import { Session } from "./types";

export async function getSession(): Promise<Session | null> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";
  const res = await fetch(`${backendUrl}/api/me`, {
    headers: await headers(),
  });

  const data = (await res.json()) as Session;
  if (!data?.user) return null;
  return data;
}

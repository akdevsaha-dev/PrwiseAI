import { headers } from "next/headers";
import { Session } from "./types";

export async function getSession(): Promise<Session | null> {
  const res = await fetch("http://localhost:3000/api/me", {
    headers: await headers(),
  });

  const data = (await res.json()) as Session;
  if (!data?.user) return null;
  return data;
}

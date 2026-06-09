import { headers } from "next/headers";
import { Session } from "./types";

export async function getSession(): Promise<Session | null> {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";
    const reqHeaders = await headers();
    const cookie = reqHeaders.get("cookie") || "";

    const res = await fetch(`${backendUrl}/api/me`, {
      headers: {
        cookie: cookie,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`getSession failed with status: ${res.status}`);
      return null;
    }

    const data = (await res.json()) as Session;
    if (!data?.user) return null;
    return data;
  } catch (error) {
    console.error("Error in getSession fetch:", error);
    return null;
  }
}

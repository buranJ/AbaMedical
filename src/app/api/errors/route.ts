import { NextResponse } from "next/server";
import { z } from "zod";

const errorSchema = z.object({ message: z.string().trim().min(1).max(300), source: z.string().trim().max(160), path: z.string().trim().max(200) });
const attempts = new Map<string, { count: number; reset: number }>();

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "local";
  const now = Date.now();
  const record = attempts.get(ip);
  if (record && record.reset > now && record.count >= 10) return NextResponse.json({ ok: false }, { status: 429 });
  attempts.set(ip, !record || record.reset < now ? { count: 1, reset: now + 60_000 } : { ...record, count: record.count + 1 });
  const parsed = errorSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 });

  if (process.env.ERRORS_WEBHOOK_URL) {
    await fetch(process.env.ERRORS_WEBHOOK_URL, { method: "POST", headers: { "content-type": "application/json", ...(process.env.ERRORS_WEBHOOK_SECRET ? { authorization: `Bearer ${process.env.ERRORS_WEBHOOK_SECRET}` } : {}) }, body: JSON.stringify({ service: "aba-medical-web", ...parsed.data }) }).catch(() => null);
  }
  return NextResponse.json({ ok: true });
}

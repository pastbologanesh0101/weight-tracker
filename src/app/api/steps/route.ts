import { NextRequest, NextResponse } from "next/server";
import { setStepLog } from "@/lib/data";

export async function POST(req: NextRequest) {
  const { logged_date, steps } = await req.json();
  if (!logged_date || typeof steps !== "number" || steps < 0) {
    return NextResponse.json({ error: "Invalid step log" }, { status: 400 });
  }
  await setStepLog(logged_date, steps);
  return NextResponse.json({ ok: true });
}

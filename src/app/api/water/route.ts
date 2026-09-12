import { NextRequest, NextResponse } from "next/server";
import { setWaterLog } from "@/lib/data";

export async function POST(req: NextRequest) {
  const { logged_date, liters } = await req.json();
  if (!logged_date || typeof liters !== "number" || liters < 0) {
    return NextResponse.json({ error: "Invalid water log" }, { status: 400 });
  }
  await setWaterLog(logged_date, liters);
  return NextResponse.json({ ok: true });
}

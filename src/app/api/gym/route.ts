import { NextRequest, NextResponse } from "next/server";
import { addGymLog } from "@/lib/data";

const VALID_TYPES = ["push", "pull", "legs", "rest"];

export async function POST(req: NextRequest) {
  const { logged_date, day_type } = await req.json();
  if (!logged_date || !VALID_TYPES.includes(day_type)) {
    return NextResponse.json({ error: "Invalid gym log" }, { status: 400 });
  }
  await addGymLog(logged_date, day_type);
  return NextResponse.json({ ok: true });
}

import { NextRequest, NextResponse } from "next/server";
import { addWeightEntry, getWeightEntries } from "@/lib/data";

export async function GET() {
  const entries = await getWeightEntries();
  return NextResponse.json({ entries });
}

export async function POST(req: NextRequest) {
  const { logged_date, weight_kg } = await req.json();
  if (typeof weight_kg !== "number" || weight_kg <= 0 || !logged_date) {
    return NextResponse.json({ error: "Invalid weight entry" }, { status: 400 });
  }
  await addWeightEntry(logged_date, weight_kg);
  return NextResponse.json({ ok: true });
}

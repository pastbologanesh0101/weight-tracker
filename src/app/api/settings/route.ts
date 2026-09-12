import { NextRequest, NextResponse } from "next/server";
import { getSettings, upsertSettings } from "@/lib/data";

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json({ settings });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  await upsertSettings({
    height_cm: body.height_cm ?? null,
    start_weight: body.start_weight ?? null,
    goal_weight: body.goal_weight ?? null,
    start_date: body.start_date ?? null,
    target_date: body.target_date ?? null,
  });
  return NextResponse.json({ ok: true });
}

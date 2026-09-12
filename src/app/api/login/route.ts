import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, tokenForPasscode } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { passcode } = await req.json();

  if (typeof passcode !== "string" || passcode !== process.env.WEIGHT_PASSCODE) {
    return NextResponse.json({ error: "Incorrect passcode" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, tokenForPasscode(passcode), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return res;
}

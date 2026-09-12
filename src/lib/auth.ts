import { createHash } from "crypto";

export const SESSION_COOKIE = "wt_session";

export function tokenForPasscode(passcode: string) {
  return createHash("sha256").update(passcode).digest("hex");
}

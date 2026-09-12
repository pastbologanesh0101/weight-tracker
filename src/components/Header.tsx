"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header({ title }: { title: string }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="flex items-center justify-between mb-6">
      <h1 className="text-lg font-semibold">{title}</h1>
      <div className="flex items-center gap-4 text-sm">
        <Link href="/" className="text-[var(--text-secondary)] hover:text-[var(--foreground)]">
          Dashboard
        </Link>
        <Link
          href="/settings"
          className="text-[var(--text-secondary)] hover:text-[var(--foreground)]"
        >
          Settings
        </Link>
        <button onClick={logout} className="text-[var(--text-secondary)] hover:text-red-500">
          Log out
        </button>
      </div>
    </header>
  );
}

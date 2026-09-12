"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { GymLog } from "@/lib/data";
import { todayISO } from "@/lib/date";

const DAY_TYPES: { value: GymLog["day_type"]; label: string }[] = [
  { value: "push", label: "Push" },
  { value: "pull", label: "Pull" },
  { value: "legs", label: "Legs" },
  { value: "rest", label: "Rest" },
];

export default function GymLogCard({ logs }: { logs: GymLog[] }) {
  const router = useRouter();
  const [saving, setSaving] = useState<string | null>(null);
  const today = todayISO();
  const todayLog = logs.find((l) => l.logged_date === today);

  async function logDay(day_type: GymLog["day_type"]) {
    setSaving(day_type);
    await fetch("/api/gym", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ logged_date: today, day_type }),
    });
    setSaving(null);
    router.refresh();
  }

  const recent = [...logs].slice(0, 7).reverse();

  return (
    <div className="bg-[var(--surface)] rounded-2xl border border-[var(--gridline)] p-5 space-y-4">
      <h2 className="font-semibold">Gym log</h2>
      <div className="grid grid-cols-4 gap-2">
        {DAY_TYPES.map((d) => (
          <button
            key={d.value}
            onClick={() => logDay(d.value)}
            disabled={saving !== null}
            className={`rounded-lg py-2 text-sm font-medium transition ${
              todayLog?.day_type === d.value
                ? "bg-emerald-600 text-white"
                : "bg-transparent border border-[var(--gridline)] text-[var(--text-secondary)] hover:border-emerald-500"
            } disabled:opacity-50`}
          >
            {saving === d.value ? "..." : d.label}
          </button>
        ))}
      </div>
      {recent.length > 0 && (
        <div className="flex gap-1.5 flex-wrap pt-1">
          {recent.map((l) => (
            <span
              key={l.logged_date}
              title={`${l.logged_date}: ${l.day_type}`}
              className="text-xs rounded-md px-2 py-1 bg-[var(--gridline)] text-[var(--text-secondary)] capitalize"
            >
              {l.day_type}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

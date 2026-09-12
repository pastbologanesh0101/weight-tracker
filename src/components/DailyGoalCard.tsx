"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { todayISO } from "@/lib/date";

export default function DailyGoalCard({
  title,
  unit,
  goal,
  current,
  endpoint,
  field,
  step,
}: {
  title: string;
  unit: string;
  goal: number;
  current: number;
  endpoint: string;
  field: string;
  step?: number;
}) {
  const router = useRouter();
  const [value, setValue] = useState(String(current || ""));
  const [saving, setSaving] = useState(false);
  const pct = Math.min(100, Math.max(0, (current / goal) * 100));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const num = parseFloat(value);
    if (num < 0 || Number.isNaN(num)) return;
    setSaving(true);
    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ logged_date: todayISO(), [field]: num }),
    });
    setSaving(false);
    router.refresh();
  }

  return (
    <div className="bg-[var(--surface)] rounded-2xl border border-[var(--gridline)] p-5 space-y-3">
      <div className="flex items-baseline justify-between">
        <h2 className="font-semibold">{title}</h2>
        <span className="text-sm text-[var(--text-secondary)]">
          {current} / {goal} {unit}
        </span>
      </div>
      <div className="h-2.5 rounded-full bg-[var(--gridline)] overflow-hidden">
        <div
          className="h-full rounded-full bg-[var(--series-weight)] transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="number"
          step={step ?? 1}
          inputMode="decimal"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={`Today's ${unit}`}
          className="flex-1 rounded-lg border border-[var(--gridline)] bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-4 py-2 text-sm font-medium transition"
        >
          {saving ? "Saving..." : "Update"}
        </button>
      </form>
    </div>
  );
}

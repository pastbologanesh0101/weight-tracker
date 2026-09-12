"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import WeightChart from "./WeightChart";
import type { WeightEntry } from "@/lib/data";
import { todayISO } from "@/lib/date";

export default function WeightCard({
  entries,
  goalWeight,
}: {
  entries: WeightEntry[];
  goalWeight: number | null;
}) {
  const router = useRouter();
  const latest = entries[entries.length - 1];
  const [weight, setWeight] = useState(latest ? String(latest.weight_kg) : "");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = parseFloat(weight);
    if (!value || value <= 0) return;
    setSaving(true);
    await fetch("/api/weight", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ logged_date: todayISO(), weight_kg: value }),
    });
    setSaving(false);
    router.refresh();
  }

  return (
    <div className="bg-[var(--surface)] rounded-2xl border border-[var(--gridline)] p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Weight trend</h2>
        {latest && (
          <span className="text-sm text-[var(--text-secondary)]">
            Last: {latest.weight_kg} kg
          </span>
        )}
      </div>
      <WeightChart entries={entries} goalWeight={goalWeight} />
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="number"
          step="0.1"
          inputMode="decimal"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Today's weight (kg)"
          className="flex-1 rounded-lg border border-[var(--gridline)] bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-4 py-2 text-sm font-medium transition"
        >
          {saving ? "Saving..." : "Log"}
        </button>
      </form>
    </div>
  );
}

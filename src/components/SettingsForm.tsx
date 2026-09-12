"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Settings } from "@/lib/data";

export default function SettingsForm({ settings }: { settings: Settings }) {
  const router = useRouter();
  const [heightCm, setHeightCm] = useState(settings.height_cm?.toString() ?? "");
  const [startWeight, setStartWeight] = useState(settings.start_weight?.toString() ?? "");
  const [goalWeight, setGoalWeight] = useState(settings.goal_weight?.toString() ?? "");
  const [targetDate, setTargetDate] = useState(settings.target_date ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        height_cm: heightCm ? parseFloat(heightCm) : null,
        start_weight: startWeight ? parseFloat(startWeight) : null,
        goal_weight: goalWeight ? parseFloat(goalWeight) : null,
        target_date: targetDate || null,
      }),
    });
    setSaving(false);
    setSaved(true);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="Height (cm)">
        <input
          type="number"
          value={heightCm}
          onChange={(e) => setHeightCm(e.target.value)}
          className="w-full rounded-lg border border-[var(--gridline)] bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </Field>
      <Field label="Start weight (kg)">
        <input
          type="number"
          step="0.1"
          value={startWeight}
          onChange={(e) => setStartWeight(e.target.value)}
          className="w-full rounded-lg border border-[var(--gridline)] bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </Field>
      <Field label="Goal weight (kg)">
        <input
          type="number"
          step="0.1"
          value={goalWeight}
          onChange={(e) => setGoalWeight(e.target.value)}
          className="w-full rounded-lg border border-[var(--gridline)] bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </Field>
      <Field label="Target date">
        <input
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          className="w-full rounded-lg border border-[var(--gridline)] bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </Field>
      <button
        type="submit"
        disabled={saving}
        className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white py-2.5 font-medium transition"
      >
        {saving ? "Saving..." : saved ? "Saved" : "Save settings"}
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm text-[var(--text-secondary)]">{label}</span>
      {children}
    </label>
  );
}

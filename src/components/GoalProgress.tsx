import type { WeightEntry } from "@/lib/data";

export default function GoalProgress({
  entries,
  startWeight,
  goalWeight,
  targetDate,
}: {
  entries: WeightEntry[];
  startWeight: number | null;
  goalWeight: number | null;
  targetDate: string | null;
}) {
  const latest = entries[entries.length - 1]?.weight_kg ?? startWeight;

  if (!startWeight || !goalWeight || !latest) {
    return (
      <div className="bg-[var(--surface)] rounded-2xl border border-[var(--gridline)] p-5">
        <h2 className="font-semibold mb-1">Goal progress</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Set your start weight and goal weight in Settings to track progress.
        </p>
      </div>
    );
  }

  const totalToLose = startWeight - goalWeight;
  const lostSoFar = startWeight - latest;
  const pct = totalToLose > 0 ? Math.min(100, Math.max(0, (lostSoFar / totalToLose) * 100)) : 0;
  const remaining = Math.max(0, latest - goalWeight);

  let daysLeft: number | null = null;
  if (targetDate) {
    const diff = new Date(targetDate).getTime() - new Date().setHours(0, 0, 0, 0);
    daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  return (
    <div className="bg-[var(--surface)] rounded-2xl border border-[var(--gridline)] p-5 space-y-3">
      <h2 className="font-semibold">Goal progress</h2>
      <div className="flex items-baseline justify-between">
        <span className="text-2xl font-semibold">{pct.toFixed(0)}%</span>
        <span className="text-sm text-[var(--text-secondary)]">
          {remaining.toFixed(1)} kg to go
        </span>
      </div>
      <div className="h-2.5 rounded-full bg-[var(--gridline)] overflow-hidden">
        <div
          className="h-full rounded-full bg-[var(--series-good)] transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-[var(--text-muted)]">
        <span>{startWeight} kg</span>
        {daysLeft !== null && (
          <span>{daysLeft >= 0 ? `${daysLeft} days left` : "Target date passed"}</span>
        )}
        <span>{goalWeight} kg</span>
      </div>
    </div>
  );
}

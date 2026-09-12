import type { WeightEntry } from "@/lib/data";

function bmiCategory(bmi: number) {
  if (bmi < 18.5) return { label: "Underweight", color: "var(--text-muted)" };
  if (bmi < 25) return { label: "Healthy", color: "var(--series-good)" };
  if (bmi < 30) return { label: "Overweight", color: "#eda100" };
  return { label: "Obese", color: "#e34948" };
}

export default function BMICard({
  entries,
  heightCm,
}: {
  entries: WeightEntry[];
  heightCm: number | null;
}) {
  const latest = entries[entries.length - 1]?.weight_kg;

  if (!heightCm || !latest) {
    return (
      <div className="bg-[var(--surface)] rounded-2xl border border-[var(--gridline)] p-5">
        <h2 className="font-semibold mb-1">BMI</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Set your height in Settings and log a weight to see your BMI.
        </p>
      </div>
    );
  }

  const heightM = heightCm / 100;
  const bmi = latest / (heightM * heightM);
  const { label, color } = bmiCategory(bmi);

  return (
    <div className="bg-[var(--surface)] rounded-2xl border border-[var(--gridline)] p-5 space-y-1">
      <h2 className="font-semibold">BMI</h2>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-semibold">{bmi.toFixed(1)}</span>
        <span className="text-sm font-medium" style={{ color }}>
          {label}
        </span>
      </div>
      <p className="text-xs text-[var(--text-muted)]">
        Based on {latest} kg at {heightCm} cm
      </p>
    </div>
  );
}

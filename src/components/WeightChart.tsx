"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
import type { WeightEntry } from "@/lib/data";

export default function WeightChart({
  entries,
  goalWeight,
}: {
  entries: WeightEntry[];
  goalWeight: number | null;
}) {
  const data = entries.map((e) => ({
    date: new Date(e.logged_date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    weight: e.weight_kg,
  }));

  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-sm text-[var(--text-muted)]">
        Log your first weigh-in to see your trend.
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 16, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--gridline)" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fill: "var(--text-muted)", fontSize: 12 }}
            axisLine={{ stroke: "var(--baseline)" }}
            tickLine={false}
          />
          <YAxis
            domain={["dataMin - 2", "dataMax + 2"]}
            tick={{ fill: "var(--text-muted)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={40}
          />
          <Tooltip
            contentStyle={{
              background: "var(--surface)",
              border: "1px solid var(--gridline)",
              borderRadius: 8,
              fontSize: 13,
            }}
            labelStyle={{ color: "var(--text-secondary)" }}
            formatter={(value) => [`${value} kg`, "Weight"]}
          />
          {goalWeight && (
            <ReferenceLine
              y={goalWeight}
              stroke="var(--baseline)"
              strokeDasharray="4 4"
              label={{
                value: `Goal ${goalWeight}kg`,
                position: "insideTopRight",
                fill: "var(--text-muted)",
                fontSize: 12,
              }}
            />
          )}
          <Line
            type="monotone"
            dataKey="weight"
            stroke="var(--series-weight)"
            strokeWidth={2}
            dot={{ r: 3, fill: "var(--series-weight)" }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

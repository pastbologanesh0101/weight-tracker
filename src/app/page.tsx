import Header from "@/components/Header";
import WeightCard from "@/components/WeightCard";
import GoalProgress from "@/components/GoalProgress";
import BMICard from "@/components/BMICard";
import GymLogCard from "@/components/GymLogCard";
import DailyGoalCard from "@/components/DailyGoalCard";
import {
  getSettings,
  getWeightEntries,
  getGymLogs,
  getTodayTotals,
} from "@/lib/data";
import { todayISO } from "@/lib/date";

export const dynamic = "force-dynamic";

const WATER_GOAL_LITERS = 4;
const STEP_GOAL = 10000;

export default async function DashboardPage() {
  const [settings, entries, gymLogs, todayTotals] = await Promise.all([
    getSettings(),
    getWeightEntries(),
    getGymLogs(),
    getTodayTotals(todayISO()),
  ]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Header title="Weight Tracker" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <WeightCard entries={entries} goalWeight={settings.goal_weight} />
        </div>
        <GoalProgress
          entries={entries}
          startWeight={settings.start_weight}
          goalWeight={settings.goal_weight}
          targetDate={settings.target_date}
        />
        <BMICard entries={entries} heightCm={settings.height_cm} />
        <div className="sm:col-span-2">
          <GymLogCard logs={gymLogs} />
        </div>
        <DailyGoalCard
          title="Water"
          unit="L"
          goal={WATER_GOAL_LITERS}
          current={todayTotals.water}
          endpoint="/api/water"
          field="liters"
          step={0.1}
        />
        <DailyGoalCard
          title="Steps"
          unit="steps"
          goal={STEP_GOAL}
          current={todayTotals.steps}
          endpoint="/api/steps"
          field="steps"
          step={100}
        />
      </div>
    </div>
  );
}

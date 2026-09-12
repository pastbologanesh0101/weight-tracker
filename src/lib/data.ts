import { supabaseAdmin } from "@/lib/supabase";

export type Settings = {
  height_cm: number | null;
  start_weight: number | null;
  goal_weight: number | null;
  start_date: string | null;
  target_date: string | null;
};

export type WeightEntry = { logged_date: string; weight_kg: number };
export type GymLog = { logged_date: string; day_type: "push" | "pull" | "legs" | "rest"; completed: boolean };
export type WaterLog = { logged_date: string; liters: number };
export type StepLog = { logged_date: string; steps: number };

export async function getSettings(): Promise<Settings> {
  const db = supabaseAdmin();
  const { data } = await db.from("settings").select("*").eq("id", 1).maybeSingle();
  return (
    data ?? {
      height_cm: null,
      start_weight: null,
      goal_weight: null,
      start_date: null,
      target_date: null,
    }
  );
}

export async function upsertSettings(settings: Partial<Settings>) {
  const db = supabaseAdmin();
  const { error } = await db.from("settings").upsert({ id: 1, ...settings });
  if (error) throw error;
}

export async function getWeightEntries(): Promise<WeightEntry[]> {
  const db = supabaseAdmin();
  const { data, error } = await db
    .from("weight_entries")
    .select("logged_date, weight_kg")
    .order("logged_date", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function addWeightEntry(logged_date: string, weight_kg: number) {
  const db = supabaseAdmin();
  const { error } = await db.from("weight_entries").upsert({ logged_date, weight_kg });
  if (error) throw error;
}

export async function getGymLogs(): Promise<GymLog[]> {
  const db = supabaseAdmin();
  const { data, error } = await db
    .from("gym_logs")
    .select("logged_date, day_type, completed")
    .order("logged_date", { ascending: false })
    .limit(28);
  if (error) throw error;
  return data ?? [];
}

export async function addGymLog(logged_date: string, day_type: GymLog["day_type"]) {
  const db = supabaseAdmin();
  const { error } = await db
    .from("gym_logs")
    .upsert({ logged_date, day_type, completed: true });
  if (error) throw error;
}

export async function getTodayTotals(logged_date: string) {
  const db = supabaseAdmin();
  const [water, steps] = await Promise.all([
    db.from("water_logs").select("liters").eq("logged_date", logged_date).maybeSingle(),
    db.from("step_logs").select("steps").eq("logged_date", logged_date).maybeSingle(),
  ]);
  return {
    water: water.data?.liters ?? 0,
    steps: steps.data?.steps ?? 0,
  };
}

export async function setWaterLog(logged_date: string, liters: number) {
  const db = supabaseAdmin();
  const { error } = await db.from("water_logs").upsert({ logged_date, liters });
  if (error) throw error;
}

export async function setStepLog(logged_date: string, steps: number) {
  const db = supabaseAdmin();
  const { error } = await db.from("step_logs").upsert({ logged_date, steps });
  if (error) throw error;
}

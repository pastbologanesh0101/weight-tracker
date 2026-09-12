import Header from "@/components/Header";
import SettingsForm from "@/components/SettingsForm";
import { getSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <Header title="Settings" />
      <SettingsForm settings={settings} />
    </div>
  );
}

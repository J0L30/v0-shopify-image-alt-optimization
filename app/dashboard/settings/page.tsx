import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { SettingsForm } from "@/components/settings-form"
import { getSettings } from "@/lib/settings"
import { requireAuth } from "@/lib/auth"

export default async function SettingsPage() {
  // Ensure user is authenticated
  await requireAuth()

  // Get current settings
  const settings = await getSettings()

  return (
    <DashboardShell>
      <DashboardHeader heading="Settings" text="Manage your optimization preferences" />

      <SettingsForm settings={settings} />
    </DashboardShell>
  )
}

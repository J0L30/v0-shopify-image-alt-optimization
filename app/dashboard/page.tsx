import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ImageScanButton } from "@/components/image-scan-button"
import { ImageStats } from "@/components/image-stats"
import { OptimizationSettings } from "@/components/optimization-settings"
import { RecentOptimizations } from "@/components/recent-optimizations"
import { SupportChat } from "@/components/support-chat"
import { TrialStatus } from "@/app/trial-status"
import { getShopifyStore } from "@/lib/shopify"
import { getStoreStats } from "@/lib/stats"
import { requireAuth } from "@/lib/auth"

export default async function DashboardPage() {
  // Ensure user is authenticated
  await requireAuth()

  // Get store information
  const store = await getShopifyStore()
  const stats = await getStoreStats()

  return (
    <DashboardShell>
      <DashboardHeader heading="Image Alt SEO Dashboard" text={`Connected to ${store?.name || "your store"}`}>
        <ImageScanButton />
      </DashboardHeader>

      <div className="grid gap-6 lg:grid-cols-2">
        <TrialStatus />
        <ImageStats stats={stats} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <OptimizationSettings />
        <RecentOptimizations />
      </div>

      <SupportChat />
    </DashboardShell>
  )
}

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ImageList } from "@/components/image-list"
import { ImageFilters } from "@/components/image-filters"
import { getShopifyImages } from "@/lib/shopify"
import { requireAuth } from "@/lib/auth"

export default async function ImagesPage() {
  // Ensure user is authenticated
  await requireAuth()

  // Get images from the store
  const images = await getShopifyImages()

  return (
    <DashboardShell>
      <DashboardHeader heading="Store Images" text="View and manage all images in your store" />

      <ImageFilters />

      <ImageList images={images} />
    </DashboardShell>
  )
}

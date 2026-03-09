import { type NextRequest, NextResponse } from "next/server"
import { verifyShopifyWebhook } from "@/lib/shopify"

export async function POST(request: NextRequest) {
  try {
    // Verify the webhook is from Shopify
    const isValid = await verifyShopifyWebhook(request)

    if (!isValid) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const data = await request.json()
    const topic = request.headers.get("x-shopify-topic") || ""

    // Handle different webhook topics
    if (topic === "products/create" || topic === "products/update") {
      // Queue image optimization for new/updated products
      await queueProductImagesForOptimization(data)
    }

    return new NextResponse("Webhook processed", { status: 200 })
  } catch (error) {
    console.error("Webhook error:", error)
    return new NextResponse("Server error", { status: 500 })
  }
}

async function queueProductImagesForOptimization(productData: any) {
  // Implementation to queue images for optimization
  // This would typically add to a database queue or task system
}

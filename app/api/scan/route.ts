import { type NextRequest, NextResponse } from "next/server"
import { requireApiAuth } from "@/lib/auth"
import { scanShopifyStore } from "@/lib/scanner"

export async function POST(request: NextRequest) {
  try {
    // Verify the request is authenticated
    const authResult = await requireApiAuth(request)

    if (!authResult.authenticated) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Start the scan process
    const scanJob = await scanShopifyStore(authResult.storeId)

    return NextResponse.json({
      success: true,
      jobId: scanJob.id,
      message: "Store scan initiated",
    })
  } catch (error) {
    console.error("Scan API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to start scan",
      },
      { status: 500 },
    )
  }
}

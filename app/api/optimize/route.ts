import { type NextRequest, NextResponse } from "next/server"
import { requireApiAuth } from "@/lib/auth"
import { optimizeImageAltText } from "@/lib/optimizer"

export async function POST(request: NextRequest) {
  try {
    // Verify the request is authenticated
    const authResult = await requireApiAuth(request)

    if (!authResult.authenticated) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { imageIds } = await request.json()

    if (!imageIds || !Array.isArray(imageIds)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request: imageIds array required",
        },
        { status: 400 },
      )
    }

    // Create a job to optimize the images
    const jobId = `job-${Date.now()}`

    // In a real app, you would queue this job in a database or task queue
    // For now, we'll just return a success response

    // Start the optimization process in the background
    setTimeout(async () => {
      try {
        // For each image ID, fetch the image details and optimize
        for (const imageId of imageIds) {
          // In a real app, you would fetch the image details from Shopify
          // and then optimize the alt text
          await optimizeImageAltText(authResult.storeId, [imageId])
        }

        console.log(`Optimization job ${jobId} completed for ${imageIds.length} images`)
      } catch (error) {
        console.error(`Error in background optimization job ${jobId}:`, error)
      }
    }, 100)

    return NextResponse.json({
      success: true,
      jobId,
      message: `Optimization started for ${imageIds.length} images`,
    })
  } catch (error) {
    console.error("Optimization API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to start optimization",
      },
      { status: 500 },
    )
  }
}

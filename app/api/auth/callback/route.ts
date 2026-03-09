import { type NextRequest, NextResponse } from "next/server"
import { handleAuthCallback } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    // Handle Shopify OAuth callback
    const { success, redirectUrl } = await handleAuthCallback(request)

    if (success) {
      return NextResponse.redirect(new URL(redirectUrl, request.url))
    }

    // If authentication failed
    return NextResponse.redirect(new URL("/?error=auth_failed", request.url))
  } catch (error) {
    console.error("Auth callback error:", error)
    return NextResponse.redirect(new URL("/?error=server_error", request.url))
  }
}

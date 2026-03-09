// Remove the "use client" directive from the top of the file
import type { NextRequest } from "next/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Server-side authentication check
export async function isAuthenticated(): Promise<boolean> {
  // Check if the user is authenticated with Shopify
  // This would typically check for a valid session or token in cookies
  const cookieStore = cookies()
  const authToken = cookieStore.get("shopify_auth_token")

  return !!authToken?.value
}

// Server-side auth requirement - use this in server components
export async function requireAuth() {
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    redirect("/")
  }
}

// Server-side API auth check
export async function requireApiAuth(request: NextRequest) {
  // Verify API request authentication
  // This would typically check for a valid API token in headers

  return {
    authenticated: true,
    storeId: "sample-store-id",
  }
}

// Server-side auth callback handler
export async function handleAuthCallback(request: NextRequest) {
  // Process Shopify OAuth callback
  // This would validate the code and exchange it for access tokens

  return {
    success: true,
    redirectUrl: "/dashboard",
  }
}

// Create a separate file for client-side auth functions

import { NextResponse } from "next/server"

export async function GET() {
  // Get the app URL with a fallback
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  
  // In a real implementation, this would redirect to Shopify OAuth
  const shopifyAuthUrl = "https://your-store.myshopify.com/admin/oauth/authorize"
  const params = new URLSearchParams({
    client_id: process.env.SHOPIFY_API_KEY || "",
    scope: "read_products,write_products",
    redirect_uri: `${appUrl}/api/auth/callback`,
    state: "state-token", // In production, use a secure random token
  })

  // For development, we'll just redirect to the callback with a mock code
  return NextResponse.redirect(
    `${appUrl}/api/auth/callback?code=mock_code&shop=your-store.myshopify.com`,
  )
}

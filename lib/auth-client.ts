"use client"

// Client-side authentication functions

export function initiateAuth() {
  // Redirect to Shopify OAuth flow
  window.location.href = "/api/auth/login"
}

export function signOut() {
  // Sign out the user
  window.location.href = "/"
}

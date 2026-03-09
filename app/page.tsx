import { redirect } from "next/navigation"
import { StoreConnectButton } from "@/components/store-connect-button"

export default async function Home() {
  // For development, let's always consider the user not authenticated
  // so we can see the login page
  const authenticated = false // await isAuthenticated()

  if (authenticated) {
    redirect("/dashboard")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <h1 className="text-3xl font-bold">Image Alt SEO Optimizer</h1>
        <p className="text-muted-foreground">
          Automatically optimize your Shopify store images with AI-powered alt text for better SEO
        </p>
        <StoreConnectButton />
      </div>
    </main>
  )
}

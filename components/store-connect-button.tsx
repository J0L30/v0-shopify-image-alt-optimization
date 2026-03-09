"use client"

import { Button } from "@/components/ui/button"
import { StoreIcon as ShopifyIcon } from "lucide-react"
import { initiateAuth } from "@/lib/auth-client"

export function StoreConnectButton() {
  return (
    <Button size="lg" className="w-full" onClick={() => initiateAuth()}>
      <ShopifyIcon className="mr-2 h-5 w-5" />
      Connect Your Shopify Store
    </Button>
  )
}

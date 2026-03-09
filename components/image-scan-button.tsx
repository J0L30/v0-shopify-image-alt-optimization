"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, ScanIcon } from "lucide-react"
import { scanStore } from "@/lib/actions"
import { toast } from "@/components/ui/use-toast"

export function ImageScanButton() {
  const [isScanning, setIsScanning] = useState(false)

  const handleScan = async () => {
    try {
      setIsScanning(true)
      const result = await scanStore()

      if (result.success) {
        toast({
          title: "Scan initiated",
          description: "We're scanning your store for images. This may take a few minutes.",
        })
      } else {
        throw new Error(result.error || "Failed to start scan")
      }
    } catch (error) {
      toast({
        title: "Scan failed",
        description: "There was an error starting the scan. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsScanning(false)
    }
  }

  return (
    <Button onClick={handleScan} disabled={isScanning}>
      {isScanning ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Scanning...
        </>
      ) : (
        <>
          <ScanIcon className="mr-2 h-4 w-4" />
          Scan Store
        </>
      )}
    </Button>
  )
}

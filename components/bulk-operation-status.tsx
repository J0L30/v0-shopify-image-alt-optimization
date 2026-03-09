"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, AlertTriangle, CheckCircle2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface BulkOperationStatusProps {
  operationId: string
  operationType: "scan" | "optimize"
  onComplete?: () => void
}

export function BulkOperationStatus({ operationId, operationType, onComplete }: BulkOperationStatusProps) {
  const [status, setStatus] = useState<"running" | "completed" | "failed" | "canceled">("running")
  const [progress, setProgress] = useState(0)
  const [processedCount, setProcessedCount] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkStatus = async () => {
      try {
        // This would call your API to check the status
        // For demo purposes, we'll simulate progress

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        if (progress < 100) {
          // Simulate progress
          const newProgress = Math.min(progress + Math.random() * 10, 100)
          setProgress(newProgress)
          setProcessedCount(Math.floor((newProgress / 100) * totalCount))

          if (newProgress === 100) {
            setStatus("completed")
            if (onComplete) onComplete()

            toast({
              title: `${operationType === "scan" ? "Scan" : "Optimization"} complete`,
              description: `Successfully processed ${totalCount} images.`,
            })
          }
        }
      } catch (err) {
        setStatus("failed")
        setError("An error occurred while processing your request.")

        toast({
          title: "Operation failed",
          description: "There was an error processing your request.",
          variant: "destructive",
        })
      }
    }

    // Set initial values for demo
    if (totalCount === 0) {
      setTotalCount(operationType === "scan" ? 1250 : 350)
    }

    // Check status every 2 seconds if operation is still running
    if (status === "running") {
      const interval = setInterval(checkStatus, 2000)
      return () => clearInterval(interval)
    }
  }, [operationId, operationType, status, progress, totalCount, onComplete])

  const handleCancel = async () => {
    try {
      // This would call your API to cancel the operation
      await new Promise((resolve) => setTimeout(resolve, 500))

      setStatus("canceled")
      toast({
        title: "Operation canceled",
        description: "The operation has been canceled.",
      })
    } catch (err) {
      toast({
        title: "Failed to cancel",
        description: "There was an error canceling the operation.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{operationType === "scan" ? "Store Scan" : "Image Optimization"} Status</CardTitle>
        <CardDescription>
          {status === "running" && "Processing your images. This may take a few minutes."}
          {status === "completed" && "Operation completed successfully."}
          {status === "failed" && "Operation failed. Please try again."}
          {status === "canceled" && "Operation was canceled."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Badge variant={status === "running" ? "outline" : status === "completed" ? "default" : "destructive"}>
              {status === "running" && <Loader2 className="mr-1 h-3 w-3 animate-spin" />}
              {status === "completed" && <CheckCircle2 className="mr-1 h-3 w-3" />}
              {(status === "failed" || status === "canceled") && <AlertTriangle className="mr-1 h-3 w-3" />}
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground">
            {processedCount} of {totalCount} images
          </div>
        </div>

        <Progress value={progress} className="h-2" />

        {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

        {status === "running" && (
          <Button variant="outline" size="sm" onClick={handleCancel}>
            Cancel Operation
          </Button>
        )}

        {(status === "completed" || status === "failed" || status === "canceled") && (
          <div className="text-xs text-muted-foreground">Operation ID: {operationId}</div>
        )}
      </CardContent>
    </Card>
  )
}

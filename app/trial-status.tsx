"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CalendarIcon, AlertCircle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export function TrialStatus() {
  const [daysRemaining, setDaysRemaining] = useState(14)
  const [trialProgress, setTrialProgress] = useState(0)

  useEffect(() => {
    // In a real app, this would fetch from your backend
    setTrialProgress(100 - (daysRemaining / 14) * 100)
  }, [daysRemaining])

  const handleCancelTrial = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel your trial? You'll still have access until the trial period ends.",
    )

    if (confirmed) {
      toast({
        title: "Trial canceled",
        description: "Your trial has been canceled. You won't be charged when the trial ends.",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CalendarIcon className="mr-2 h-5 w-5" />
          Trial Status
        </CardTitle>
        <CardDescription>Your 14-day free trial is active</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Trial progress</span>
            <span className="text-sm font-medium">{daysRemaining} days remaining</span>
          </div>
          <Progress value={trialProgress} />
        </div>

        <div className="rounded-md bg-amber-50 p-4 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            <p>
              Your trial will end on {new Date(Date.now() + daysRemaining * 86400000).toLocaleDateString()}. You won't
              be charged until then.
            </p>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={handleCancelTrial}>
            Cancel trial
          </Button>
          <Button>Upgrade now</Button>
        </div>
      </CardContent>
    </Card>
  )
}

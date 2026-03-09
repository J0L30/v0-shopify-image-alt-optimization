"use client"

import { useState } from "react"
import { Check, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"

export function PricingPlan() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSelectPlan = async (planId: string) => {
    try {
      setIsProcessing(true)
      setSelectedPlan(planId)

      // In a real implementation, this would redirect to Shopify billing
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Free trial activated",
        description: "Your 14-day free trial has started. No charges until trial ends.",
      })
    } catch (error) {
      toast({
        title: "Error activating plan",
        description: "There was an error starting your trial. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="border-muted-foreground/20">
        <CardHeader>
          <CardTitle>Basic</CardTitle>
          <CardDescription>For small stores getting started with SEO</CardDescription>
          <div className="mt-4 flex items-baseline text-5xl font-bold">
            $9.99
            <span className="ml-1 text-base font-medium text-muted-foreground">/month</span>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-3">
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-green-500" />
              <span>Up to 500 product images</span>
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-green-500" />
              <span>Basic AI optimization</span>
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-green-500" />
              <span>Email support</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => handleSelectPlan("basic")} disabled={isProcessing}>
            {isProcessing && selectedPlan === "basic" ? "Processing..." : "Start 14-day free trial"}
          </Button>
        </CardFooter>
      </Card>

      <Card className="border-primary/50 shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Pro</CardTitle>
            <Badge>Most Popular</Badge>
          </div>
          <CardDescription>For growing businesses serious about SEO</CardDescription>
          <div className="mt-4 flex items-baseline text-5xl font-bold">
            $19.99
            <span className="ml-1 text-base font-medium text-muted-foreground">/month</span>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-3">
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-green-500" />
              <span>Up to 2,000 product images</span>
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-green-500" />
              <span>Advanced AI optimization</span>
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-green-500" />
              <span>Priority support</span>
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-green-500" />
              <span>Accessibility compliance checks</span>
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-green-500" />
              <span>Multilingual support (2 languages)</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => handleSelectPlan("pro")} disabled={isProcessing}>
            {isProcessing && selectedPlan === "pro" ? "Processing..." : "Start 14-day free trial"}
          </Button>
        </CardFooter>
      </Card>

      <Card className="border-muted-foreground/20">
        <CardHeader>
          <CardTitle>Enterprise</CardTitle>
          <CardDescription>For large stores with advanced needs</CardDescription>
          <div className="mt-4 flex items-baseline text-5xl font-bold">
            $39.99
            <span className="ml-1 text-base font-medium text-muted-foreground">/month</span>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-3">
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-green-500" />
              <span>Unlimited product images</span>
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-green-500" />
              <span>Premium AI optimization</span>
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-green-500" />
              <span>24/7 priority support</span>
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-green-500" />
              <span>Advanced accessibility compliance</span>
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-green-500" />
              <span>Multilingual support (unlimited)</span>
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-green-500" />
              <span>Non-product image optimization</span>
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-green-500" />
              <span>Custom AI training</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => handleSelectPlan("enterprise")} disabled={isProcessing}>
            {isProcessing && selectedPlan === "enterprise" ? "Processing..." : "Start 14-day free trial"}
          </Button>
        </CardFooter>
      </Card>

      <TooltipProvider>
        <div className="lg:col-span-3 flex items-center justify-center text-sm text-muted-foreground">
          <Info className="h-4 w-4 mr-2" />
          <span>All plans include a 14-day free trial. No credit card required.</span>
          <Tooltip>
            <TooltipTrigger className="ml-1 underline cursor-help">Billing policy</TooltipTrigger>
            <TooltipContent className="max-w-sm">
              <p>
                You won't be charged until your trial ends. Cancel anytime during the trial period and you won't be
                billed. We'll send a reminder 3 days before your trial ends.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  )
}

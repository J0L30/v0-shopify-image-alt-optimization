"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle2, Info, XCircle, Wand2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface AccessibilityIssue {
  id: string
  type: "error" | "warning" | "info"
  message: string
  element: string
  wcagCriteria: string
  suggestion: string
}

interface AccessibilityCheckerProps {
  imageId: string
  altText: string
  imageSrc: string
  productTitle: string
}

export function AccessibilityChecker({ imageId, altText, imageSrc, productTitle }: AccessibilityCheckerProps) {
  const [score, setScore] = useState(0)
  const [issues, setIssues] = useState<AccessibilityIssue[]>([])
  const [isChecking, setIsChecking] = useState(false)
  const [isFixing, setIsFixing] = useState(false)
  const [hasChecked, setHasChecked] = useState(false)

  const getScoreColor = () => {
    if (score >= 90) return "text-green-500"
    if (score >= 70) return "text-amber-500"
    return "text-red-500"
  }

  const handleCheck = async () => {
    try {
      setIsChecking(true)

      // Simulate API call to check accessibility
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate mock issues based on the alt text
      const mockIssues: AccessibilityIssue[] = []
      let calculatedScore = 100

      if (!altText || altText.trim() === "") {
        mockIssues.push({
          id: "missing-alt",
          type: "error",
          message: "Missing alt text",
          element: `<img src="${imageSrc}" />`,
          wcagCriteria: "WCAG 1.1.1 Non-text Content (Level A)",
          suggestion: "Add descriptive alt text that conveys the purpose of the image.",
        })
        calculatedScore -= 50
      } else if (altText.length < 10) {
        mockIssues.push({
          id: "short-alt",
          type: "warning",
          message: "Alt text may be too short",
          element: `<img src="${imageSrc}" alt="${altText}" />`,
          wcagCriteria: "WCAG 1.1.1 Non-text Content (Level A)",
          suggestion: "Consider providing more descriptive alt text.",
        })
        calculatedScore -= 20
      } else if (altText.length > 125) {
        mockIssues.push({
          id: "long-alt",
          type: "warning",
          message: "Alt text may be too long",
          element: `<img src="${imageSrc}" alt="${altText}" />`,
          wcagCriteria: "WCAG 1.1.1 Non-text Content (Level A)",
          suggestion: "Consider shortening alt text to be more concise.",
        })
        calculatedScore -= 10
      }

      if ((altText && altText.includes("image of")) || altText.includes("picture of")) {
        mockIssues.push({
          id: "redundant-alt",
          type: "info",
          message: "Redundant text in alt attribute",
          element: `<img src="${imageSrc}" alt="${altText}" />`,
          wcagCriteria: "WCAG 1.1.1 Non-text Content (Level A)",
          suggestion: "Avoid using phrases like 'image of' or 'picture of' in alt text.",
        })
        calculatedScore -= 5
      }

      setScore(calculatedScore)
      setIssues(mockIssues)
      setHasChecked(true)

      toast({
        title: "Accessibility check complete",
        description: `Found ${mockIssues.length} issues with your alt text.`,
      })
    } catch (error) {
      toast({
        title: "Check failed",
        description: "Failed to check accessibility.",
        variant: "destructive",
      })
    } finally {
      setIsChecking(false)
    }
  }

  const handleFix = async () => {
    try {
      setIsFixing(true)

      // Simulate API call to fix issues
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generate optimized alt text
      const optimizedAltText = `${productTitle} with detailed product features visible`

      // Update score and clear issues
      setScore(95)
      setIssues([])

      toast({
        title: "Alt text optimized",
        description: "Your alt text has been optimized for accessibility.",
      })
    } catch (error) {
      toast({
        title: "Optimization failed",
        description: "Failed to optimize alt text.",
        variant: "destructive",
      })
    } finally {
      setIsFixing(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CheckCircle2 className="mr-2 h-5 w-5" />
          Accessibility Checker
        </CardTitle>
        <CardDescription>Check your alt text for WCAG compliance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {hasChecked ? (
          <>
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Accessibility Score</div>
              <div className={`text-xl font-bold ${getScoreColor()}`}>{score}/100</div>
            </div>
            <Progress value={score} className="h-2" />

            {issues.length > 0 ? (
              <div className="space-y-4 mt-4">
                <h4 className="text-sm font-medium">Issues Found ({issues.length})</h4>

                {issues.map((issue) => (
                  <div key={issue.id} className="rounded-md border p-4 text-sm">
                    <div className="flex items-start">
                      {issue.type === "error" && <XCircle className="mt-0.5 mr-2 h-4 w-4 text-red-500 shrink-0" />}
                      {issue.type === "warning" && (
                        <AlertTriangle className="mt-0.5 mr-2 h-4 w-4 text-amber-500 shrink-0" />
                      )}
                      {issue.type === "info" && <Info className="mt-0.5 mr-2 h-4 w-4 text-blue-500 shrink-0" />}

                      <div className="space-y-1 w-full">
                        <div className="font-medium">{issue.message}</div>
                        <div className="text-muted-foreground">{issue.suggestion}</div>

                        <div className="mt-2 rounded bg-muted p-2 font-mono text-xs">{issue.element}</div>

                        <div className="mt-2 flex items-center justify-between">
                          <Badge variant="outline">{issue.wcagCriteria}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <Button className="w-full" onClick={handleFix} disabled={isFixing}>
                  {isFixing ? (
                    <>Optimizing alt text...</>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Fix All Issues
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="rounded-md bg-green-50 p-4 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-200">
                <div className="flex">
                  <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                  <div>
                    <p className="font-medium">All accessibility checks passed!</p>
                    <p className="mt-1">Your alt text meets WCAG accessibility standards.</p>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 space-y-4">
            <div className="text-center text-muted-foreground">
              Check your alt text for accessibility issues and WCAG compliance.
            </div>
            <Button onClick={handleCheck} disabled={isChecking}>
              {isChecking ? <>Checking accessibility...</> : <>Run Accessibility Check</>}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

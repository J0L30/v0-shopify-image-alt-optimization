"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { AlertTriangle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export function UninstallOptions() {
  const [isUninstalling, setIsUninstalling] = useState(false)
  const [keepChanges, setKeepChanges] = useState(true)
  const [exportData, setExportData] = useState(false)

  const handleUninstall = async () => {
    try {
      setIsUninstalling(true)

      // If the user wants to export data, generate and download the export
      if (exportData) {
        await generateAndDownloadExport()
      }

      // If the user doesn't want to keep changes, revert them
      if (!keepChanges) {
        await revertAllChanges()
      }

      // Simulate uninstall process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "App uninstalled",
        description: "The app has been successfully uninstalled.",
      })

      // Redirect to Shopify admin
      window.location.href = "https://admin.shopify.com/apps"
    } catch (error) {
      toast({
        title: "Uninstall failed",
        description: "There was an error uninstalling the app. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUninstalling(false)
    }
  }

  const generateAndDownloadExport = async () => {
    // Simulate generating and downloading an export
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create a mock CSV file
    const csvContent =
      "data:text/csv;charset=utf-8,Image ID,Product Title,Original Alt Text,Optimized Alt Text\n1,Product 1,,Optimized text 1\n2,Product 2,Old text,Optimized text 2"

    // Create a download link and trigger it
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "alt_text_export.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const revertAllChanges = async () => {
    // Simulate reverting all changes
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Changes reverted",
      description: "All alt text changes have been reverted to their original state.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-red-600 flex items-center">
          <AlertTriangle className="mr-2 h-5 w-5" />
          Uninstall App
        </CardTitle>
        <CardDescription>Configure what happens when you uninstall the app</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-md bg-amber-50 p-4 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
          <p>
            Uninstalling the app will remove it from your store. You can choose what happens to the alt text changes
            made by the app.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="keep-changes"
              checked={keepChanges}
              onCheckedChange={(checked) => setKeepChanges(checked as boolean)}
            />
            <Label htmlFor="keep-changes" className="text-sm font-medium">
              Keep all alt text changes made by the app
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="export-data"
              checked={exportData}
              onCheckedChange={(checked) => setExportData(checked as boolean)}
            />
            <Label htmlFor="export-data" className="text-sm font-medium">
              Export all alt text data before uninstalling
            </Label>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="destructive" onClick={handleUninstall} disabled={isUninstalling}>
          {isUninstalling ? "Uninstalling..." : "Uninstall App"}
        </Button>
      </CardFooter>
    </Card>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { updateSettings } from "@/lib/actions"
import { toast } from "@/components/ui/use-toast"

export function OptimizationSettings() {
  const [autoOptimize, setAutoOptimize] = useState(true)
  const [keywordDensity, setKeywordDensity] = useState(70)
  const [saving, setSaving] = useState(false)

  const handleSettingChange = async (setting: string, value: any) => {
    try {
      setSaving(true)

      if (setting === "autoOptimize") {
        setAutoOptimize(value)
      } else if (setting === "keywordDensity") {
        setKeywordDensity(value)
      }

      await updateSettings({
        [setting]: value,
      })

      toast({
        title: "Settings updated",
        description: "Your optimization settings have been saved.",
      })
    } catch (error) {
      toast({
        title: "Failed to update settings",
        description: "There was an error saving your settings.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Optimization Settings</CardTitle>
        <CardDescription>Configure how your images are optimized</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="auto-optimize" className="flex flex-col space-y-1">
            <span>Auto-Optimize New Images</span>
            <span className="font-normal text-xs text-muted-foreground">
              Automatically optimize alt text for new images
            </span>
          </Label>
          <Switch
            id="auto-optimize"
            checked={autoOptimize}
            onCheckedChange={(checked) => handleSettingChange("autoOptimize", checked)}
            disabled={saving}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="keyword-density">Keyword Density</Label>
            <span className="text-sm">{keywordDensity}%</span>
          </div>
          <Slider
            id="keyword-density"
            min={30}
            max={100}
            step={5}
            value={[keywordDensity]}
            onValueChange={(value) => handleSettingChange("keywordDensity", value[0])}
            disabled={saving}
          />
          <p className="text-xs text-muted-foreground">
            Higher values prioritize exact keywords, lower values favor natural language
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

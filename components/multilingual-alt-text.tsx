"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LanguageSelector } from "@/components/language-selector"
import { toast } from "@/components/ui/use-toast"
import { Loader2, Trash2 } from "lucide-react"

interface MultilingualAltTextProps {
  imageId: string
  productTitle: string
  currentAltText: string
  storeLanguages: { code: string; name: string }[]
}

export function MultilingualAltText({
  imageId,
  productTitle,
  currentAltText,
  storeLanguages,
}: MultilingualAltTextProps) {
  const [activeLanguage, setActiveLanguage] = useState(storeLanguages[0]?.code || "en")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [altTexts, setAltTexts] = useState<Record<string, string>>({
    en: currentAltText || "",
  })
  const [additionalLanguages, setAdditionalLanguages] = useState<string[]>([])

  const handleLanguageChange = (language: string) => {
    if (!additionalLanguages.includes(language) && language !== storeLanguages[0]?.code) {
      setAdditionalLanguages([...additionalLanguages, language])
    }
  }

  const handleRemoveLanguage = (language: string) => {
    setAdditionalLanguages(additionalLanguages.filter((lang) => lang !== language))

    // If removing the active language, switch to the primary language
    if (activeLanguage === language) {
      setActiveLanguage(storeLanguages[0]?.code || "en")
    }
  }

  const handleGenerateAll = async () => {
    try {
      setIsGenerating(true)

      // Simulate API call to generate alt text in all languages
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const generatedTexts: Record<string, string> = {
        en: `${productTitle} - premium quality product with elegant design`,
      }

      // Generate for store languages
      storeLanguages.forEach((lang) => {
        if (lang.code !== "en") {
          generatedTexts[lang.code] = `${productTitle} - translated alt text for ${lang.name}`
        }
      })

      // Generate for additional languages
      additionalLanguages.forEach((lang) => {
        generatedTexts[lang] = `${productTitle} - translated alt text for ${lang}`
      })

      setAltTexts(generatedTexts)

      toast({
        title: "Alt text generated",
        description: `Generated alt text in ${Object.keys(generatedTexts).length} languages.`,
      })
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Failed to generate alt text in all languages.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)

      // Simulate API call to save alt text
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Alt text saved",
        description: `Saved alt text in ${Object.keys(altTexts).length} languages.`,
      })
    } catch (error) {
      toast({
        title: "Save failed",
        description: "Failed to save alt text.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Multilingual Alt Text</CardTitle>
        <CardDescription>Optimize alt text in multiple languages</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Languages</div>
            <div className="flex items-center space-x-2">
              <LanguageSelector onLanguageChange={handleLanguageChange} />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {storeLanguages.map((lang) => (
              <Badge key={lang.code} variant="secondary">
                {lang.name}
                {lang.code === storeLanguages[0]?.code && " (Primary)"}
              </Badge>
            ))}

            {additionalLanguages.map((lang) => (
              <Badge key={lang} variant="outline" className="flex items-center gap-1">
                {lang.toUpperCase()}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 text-muted-foreground hover:text-foreground"
                  onClick={() => handleRemoveLanguage(lang)}
                >
                  <Trash2 className="h-3 w-3" />
                  <span className="sr-only">Remove {lang}</span>
                </Button>
              </Badge>
            ))}
          </div>
        </div>

        <Tabs value={activeLanguage} onValueChange={setActiveLanguage}>
          <TabsList className="w-full flex-wrap">
            {storeLanguages.map((lang) => (
              <TabsTrigger key={lang.code} value={lang.code} className="flex-1">
                {lang.name}
              </TabsTrigger>
            ))}

            {additionalLanguages.map((lang) => (
              <TabsTrigger key={lang} value={lang} className="flex-1">
                {lang.toUpperCase()}
              </TabsTrigger>
            ))}
          </TabsList>

          {[...storeLanguages.map((l) => l.code), ...additionalLanguages].map((lang) => (
            <TabsContent key={lang} value={lang} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Alt Text ({lang.toUpperCase()})</label>
                <Input
                  value={altTexts[lang] || ""}
                  onChange={(e) => setAltTexts({ ...altTexts, [lang]: e.target.value })}
                  placeholder={`Enter alt text in ${lang.toUpperCase()}`}
                />
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={handleGenerateAll} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>Generate in All Languages</>
            )}
          </Button>

          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>Save Changes</>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

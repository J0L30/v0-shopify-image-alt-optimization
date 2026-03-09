"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Loader2, Globe, FileImage, ShoppingBag, Layout, FileText } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface CrawlStats {
  totalImages: number
  productImages: number
  blogImages: number
  pageImages: number
  themeImages: number
  missingAltText: number
  optimizedImages: number
}

export function SiteCrawler() {
  const [isCrawling, setIsCrawling] = useState(false)
  const [progress, setProgress] = useState(0)
  const [hasCrawled, setHasCrawled] = useState(false)
  const [stats, setStats] = useState<CrawlStats>({
    totalImages: 0,
    productImages: 0,
    blogImages: 0,
    pageImages: 0,
    themeImages: 0,
    missingAltText: 0,
    optimizedImages: 0,
  })

  const handleCrawl = async () => {
    try {
      setIsCrawling(true)
      setProgress(0)

      // Simulate crawling progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 5
        })
      }, 300)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 6000))

      // Set mock stats
      setStats({
        totalImages: 187,
        productImages: 120,
        blogImages: 35,
        pageImages: 22,
        themeImages: 10,
        missingAltText: 68,
        optimizedImages: 42,
      })

      setHasCrawled(true)
      clearInterval(interval)
      setProgress(100)

      toast({
        title: "Site crawl complete",
        description: "Found 187 images across your store.",
      })
    } catch (error) {
      toast({
        title: "Crawl failed",
        description: "There was an error crawling your site.",
        variant: "destructive",
      })
    } finally {
      setIsCrawling(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Globe className="mr-2 h-5 w-5" />
          Site Crawler
        </CardTitle>
        <CardDescription>Find all images across your entire store</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isCrawling ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Crawling your site...</div>
              <div className="text-sm font-medium">{progress}%</div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        ) : hasCrawled ? (
          <Tabs defaultValue="all">
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="all" className="text-xs">
                All ({stats.totalImages})
              </TabsTrigger>
              <TabsTrigger value="products" className="text-xs">
                Products ({stats.productImages})
              </TabsTrigger>
              <TabsTrigger value="blog" className="text-xs">
                Blog ({stats.blogImages})
              </TabsTrigger>
              <TabsTrigger value="pages" className="text-xs">
                Pages ({stats.pageImages})
              </TabsTrigger>
              <TabsTrigger value="theme" className="text-xs">
                Theme ({stats.themeImages})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-3">
                  <div className="flex items-center">
                    <FileImage className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Total Images</div>
                      <div className="text-2xl font-bold">{stats.totalImages}</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-3">
                  <div className="flex items-center">
                    <Badge variant="destructive" className="mr-2">
                      !
                    </Badge>
                    <div>
                      <div className="text-sm font-medium">Missing Alt Text</div>
                      <div className="text-2xl font-bold">{stats.missingAltText}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h4 className="text-sm font-medium mb-3">Image Distribution</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <ShoppingBag className="h-4 w-4 mr-2 text-muted-foreground" />
                      Product Images
                    </div>
                    <div>{stats.productImages}</div>
                  </div>
                  <Progress value={(stats.productImages / stats.totalImages) * 100} className="h-2" />

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                      Blog Images
                    </div>
                    <div>{stats.blogImages}</div>
                  </div>
                  <Progress value={(stats.blogImages / stats.totalImages) * 100} className="h-2" />

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Layout className="h-4 w-4 mr-2 text-muted-foreground" />
                      Page Images
                    </div>
                    <div>{stats.pageImages}</div>
                  </div>
                  <Progress value={(stats.pageImages / stats.totalImages) * 100} className="h-2" />

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                      Theme Images
                    </div>
                    <div>{stats.themeImages}</div>
                  </div>
                  <Progress value={(stats.themeImages / stats.totalImages) * 100} className="h-2" />
                </div>
              </div>

              <Button className="w-full" onClick={handleCrawl}>
                Crawl Again
              </Button>
            </TabsContent>

            <TabsContent value="products" className="space-y-4">
              <div className="rounded-lg border p-4">
                <h4 className="text-sm font-medium mb-3">Product Images</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Total</div>
                    <div className="text-2xl font-bold">{stats.productImages}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Missing Alt Text</div>
                    <div className="text-2xl font-bold">{Math.floor(stats.productImages * 0.3)}</div>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                View Product Images
              </Button>
            </TabsContent>

            <TabsContent value="blog" className="space-y-4">
              <div className="rounded-lg border p-4">
                <h4 className="text-sm font-medium mb-3">Blog Images</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Total</div>
                    <div className="text-2xl font-bold">{stats.blogImages}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Missing Alt Text</div>
                    <div className="text-2xl font-bold">{Math.floor(stats.blogImages * 0.5)}</div>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                View Blog Images
              </Button>
            </TabsContent>

            <TabsContent value="pages" className="space-y-4">
              <div className="rounded-lg border p-4">
                <h4 className="text-sm font-medium mb-3">Page Images</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Total</div>
                    <div className="text-2xl font-bold">{stats.pageImages}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Missing Alt Text</div>
                    <div className="text-2xl font-bold">{Math.floor(stats.pageImages * 0.4)}</div>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                View Page Images
              </Button>
            </TabsContent>

            <TabsContent value="theme" className="space-y-4">
              <div className="rounded-lg border p-4">
                <h4 className="text-sm font-medium mb-3">Theme Images</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Total</div>
                    <div className="text-2xl font-bold">{stats.themeImages}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Missing Alt Text</div>
                    <div className="text-2xl font-bold">{Math.floor(stats.themeImages * 0.6)}</div>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                View Theme Images
              </Button>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 space-y-4">
            <div className="text-center text-muted-foreground">
              Crawl your entire store to find all images, including product images, blog posts, pages, and theme assets.
            </div>
            <Button onClick={handleCrawl} disabled={isCrawling}>
              {isCrawling ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Crawling...
                </>
              ) : (
                <>Start Crawl</>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

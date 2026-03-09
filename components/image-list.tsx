"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { optimizeSelectedImages, optimizeImageAltText } from "@/lib/actions"
import { toast } from "@/components/ui/use-toast"
import { Wand2Icon, Loader2, Eye } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MultilingualAltText } from "@/components/multilingual-alt-text"
import { AccessibilityChecker } from "@/components/accessibility-checker"

interface ShopifyImage {
  id: string
  src: string
  productTitle: string
  altText: string
  hasOptimizedAlt: boolean
  productId: string
}

interface ImageListProps {
  images: ShopifyImage[]
}

export function ImageList({ images: initialImages }: ImageListProps) {
  const [images, setImages] = useState<ShopifyImage[]>(initialImages)
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [optimizing, setOptimizing] = useState(false)
  const [optimizingImage, setOptimizingImage] = useState<string | null>(null)

  const toggleSelectAll = () => {
    if (selectedImages.length === images.length) {
      setSelectedImages([])
    } else {
      setSelectedImages(images.map((img) => img.id))
    }
  }

  const toggleSelectImage = (id: string) => {
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter((imgId) => imgId !== id))
    } else {
      setSelectedImages([...selectedImages, id])
    }
  }

  const handleOptimize = async () => {
    if (selectedImages.length === 0) {
      toast({
        title: "No images selected",
        description: "Please select at least one image to optimize.",
        variant: "destructive",
      })
      return
    }

    try {
      setOptimizing(true)
      const result = await optimizeSelectedImages(selectedImages)

      if (result.success) {
        toast({
          title: "Optimization started",
          description: `Optimizing ${selectedImages.length} images. This may take a moment.`,
        })
        setSelectedImages([])
      } else {
        throw new Error(result.error || "Failed to start optimization")
      }
    } catch (error) {
      toast({
        title: "Optimization failed",
        description: "There was an error starting the optimization process.",
        variant: "destructive",
      })
    } finally {
      setOptimizing(false)
    }
  }

  const handleOptimizeSingle = async (image: ShopifyImage) => {
    try {
      setOptimizingImage(image.id)

      const result = await optimizeImageAltText(image.id, image.src, image.productTitle)

      if (result.success) {
        // Update the image in the local state
        setImages(
          images.map((img) => (img.id === image.id ? { ...img, altText: result.altText, hasOptimizedAlt: true } : img)),
        )

        toast({
          title: "Image optimized",
          description: "The alt text has been successfully optimized.",
        })
      } else {
        throw new Error(result.error || "Failed to optimize image")
      }
    } catch (error) {
      toast({
        title: "Optimization failed",
        description: "There was an error optimizing the image.",
        variant: "destructive",
      })
    } finally {
      setOptimizingImage(null)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Store Images</CardTitle>
            <CardDescription>{images.length} images found in your store</CardDescription>
          </div>
          <Button onClick={handleOptimize} disabled={selectedImages.length === 0 || optimizing}>
            {optimizing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Optimizing...
              </>
            ) : (
              <>
                <Wand2Icon className="mr-2 h-4 w-4" />
                Optimize Selected
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {images.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">No images found. Try scanning your store first.</div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="select-all"
                  checked={selectedImages.length === images.length && images.length > 0}
                  onCheckedChange={toggleSelectAll}
                />
                <label htmlFor="select-all" className="text-sm font-medium">
                  Select All
                </label>
              </div>
              <div className="text-sm text-muted-foreground">
                {selectedImages.length} of {images.length} selected
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Current Alt Text</TableHead>
                  <TableHead className="w-[100px]">Status</TableHead>
                  <TableHead className="w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {images.map((image) => (
                  <TableRow key={image.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedImages.includes(image.id)}
                        onCheckedChange={() => toggleSelectImage(image.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="h-10 w-10 relative rounded overflow-hidden">
                        <Image src={image.src || "/placeholder.svg"} alt="" fill className="object-cover" />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{image.productTitle}</TableCell>
                    <TableCell className="max-w-[300px] truncate">
                      {image.altText || <span className="text-muted-foreground italic">No alt text</span>}
                    </TableCell>
                    <TableCell>
                      <Badge variant={image.hasOptimizedAlt ? "default" : "outline"}>
                        {image.hasOptimizedAlt ? "Optimized" : "Not Optimized"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="icon" title="View Details">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>Image Details</DialogTitle>
                              <DialogDescription>View and edit alt text for this image</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-6 py-4">
                              <div className="flex items-start gap-6">
                                <div className="relative h-40 w-40 rounded-md overflow-hidden">
                                  <Image src={image.src || "/placeholder.svg"} alt="" fill className="object-cover" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="text-lg font-medium">{image.productTitle}</h3>
                                  <p className="text-sm text-muted-foreground mt-1">ID: {image.id}</p>
                                  <div className="mt-4">
                                    <h4 className="text-sm font-medium">Current Alt Text:</h4>
                                    <p className="mt-1 p-2 bg-muted rounded-md text-sm">
                                      {image.altText || (
                                        <span className="italic text-muted-foreground">No alt text</span>
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="grid gap-6 lg:grid-cols-2">
                                <MultilingualAltText
                                  imageId={image.id}
                                  productTitle={image.productTitle}
                                  currentAltText={image.altText}
                                  storeLanguages={[{ code: "en", name: "English" }]}
                                />

                                <AccessibilityChecker
                                  imageId={image.id}
                                  altText={image.altText}
                                  imageSrc={image.src}
                                  productTitle={image.productTitle}
                                />
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Button
                          variant="outline"
                          size="icon"
                          title="Optimize Now"
                          onClick={() => handleOptimizeSingle(image)}
                          disabled={optimizingImage === image.id}
                        >
                          {optimizingImage === image.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Wand2Icon className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </CardContent>
    </Card>
  )
}

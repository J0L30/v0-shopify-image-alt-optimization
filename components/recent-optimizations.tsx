"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, RefreshCw } from "lucide-react"
import { getRecentOptimizations } from "@/lib/actions"

interface Optimization {
  id: string
  imageSrc: string
  productTitle: string
  originalAlt: string
  optimizedAlt: string
  status: "completed" | "pending" | "failed"
  timestamp: string
}

export function RecentOptimizations() {
  const [optimizations, setOptimizations] = useState<Optimization[]>([])
  const [loading, setLoading] = useState(true)

  const loadOptimizations = async () => {
    try {
      setLoading(true)
      const data = await getRecentOptimizations()
      setOptimizations(data)
    } catch (error) {
      console.error("Failed to load optimizations:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOptimizations()
  }, [])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Optimizations</CardTitle>
          <CardDescription>Latest image alt text optimizations</CardDescription>
        </div>
        <Button variant="outline" size="icon" onClick={loadOptimizations} disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
        </Button>
      </CardHeader>
      <CardContent>
        {loading && optimizations.length === 0 ? (
          <div className="flex justify-center py-6">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : optimizations.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">No optimizations performed yet</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Before</TableHead>
                <TableHead>After</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {optimizations.map((opt) => (
                <TableRow key={opt.id}>
                  <TableCell className="font-medium">{opt.productTitle}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {opt.originalAlt || <span className="text-muted-foreground italic">No alt text</span>}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {opt.status === "completed" ? opt.optimizedAlt : "Pending..."}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        opt.status === "completed" ? "default" : opt.status === "pending" ? "outline" : "destructive"
                      }
                    >
                      {opt.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

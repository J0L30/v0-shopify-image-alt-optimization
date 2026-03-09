import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface StatsProps {
  stats: {
    totalImages: number
    optimizedImages: number
    pendingImages: number
    optimizationRate: number
    lastScanDate?: string
  }
}

export function ImageStats({ stats }: StatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Image Optimization Stats</CardTitle>
        <CardDescription>
          {stats.lastScanDate
            ? `Last scan: ${new Date(stats.lastScanDate).toLocaleDateString()}`
            : "No scans performed yet"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div>Optimization Rate</div>
            <div className="font-medium">{stats.optimizationRate}%</div>
          </div>
          <Progress value={stats.optimizationRate} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Total Images</div>
            <div className="text-2xl font-bold">{stats.totalImages}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Optimized</div>
            <div className="text-2xl font-bold">{stats.optimizedImages}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Pending</div>
            <div className="text-2xl font-bold">{stats.pendingImages}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Potential SEO Boost</div>
            <div className="text-2xl font-bold text-green-600">
              {stats.optimizationRate < 50 ? "High" : stats.optimizationRate < 80 ? "Medium" : "Low"}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

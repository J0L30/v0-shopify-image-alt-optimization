"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface PerformanceMetric {
  date: string
  avgResponseTime: number
  successRate: number
  optimizationCount: number
}

export function AiPerformanceMetrics() {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([])
  const [currentMetrics, setCurrentMetrics] = useState({
    avgResponseTime: 0,
    successRate: 0,
    optimizationCount: 0,
    aiUsage: 0,
    templateFallback: 0,
  })

  useEffect(() => {
    // Simulate fetching metrics
    const mockMetrics: PerformanceMetric[] = Array.from({ length: 14 }).map((_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (13 - i))

      return {
        date: date.toLocaleDateString(),
        avgResponseTime: Math.floor(Math.random() * 500) + 300,
        successRate: Math.floor(Math.random() * 10) + 90,
        optimizationCount: Math.floor(Math.random() * 50) + 10,
      }
    })

    setMetrics(mockMetrics)

    // Set current metrics
    setCurrentMetrics({
      avgResponseTime: 420,
      successRate: 98.5,
      optimizationCount: 1250,
      aiUsage: 92,
      templateFallback: 8,
    })
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Performance Metrics</CardTitle>
        <CardDescription>Monitor AI optimization performance and reliability</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="overview">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="response-time">Response Time</TabsTrigger>
            <TabsTrigger value="success-rate">Success Rate</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">Average Response Time</div>
                <div className="text-2xl font-bold">{currentMetrics.avgResponseTime}ms</div>
                <Progress value={Math.min(100, (1000 - currentMetrics.avgResponseTime) / 10)} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Success Rate</div>
                <div className="text-2xl font-bold">{currentMetrics.successRate}%</div>
                <Progress value={currentMetrics.successRate} className="h-2" />
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h4 className="text-sm font-medium mb-3">Generation Method</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div>AI-Generated</div>
                  <div>{currentMetrics.aiUsage}%</div>
                </div>
                <Progress value={currentMetrics.aiUsage} className="h-2" />

                <div className="flex items-center justify-between text-sm">
                  <div>Template Fallback</div>
                  <div>{currentMetrics.templateFallback}%</div>
                </div>
                <Progress value={currentMetrics.templateFallback} className="h-2" />
              </div>
            </div>

            <div className="text-sm text-muted-foreground">Total optimizations: {currentMetrics.optimizationCount}</div>
          </TabsContent>

          <TabsContent value="response-time">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={metrics} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" label={{ value: "Date", position: "insideBottomRight", offset: -10 }} />
                  <YAxis label={{ value: "Response Time (ms)", angle: -90, position: "insideLeft" }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="avgResponseTime" stroke="#8884d8" name="Avg Response Time (ms)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="success-rate">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={metrics} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" label={{ value: "Date", position: "insideBottomRight", offset: -10 }} />
                  <YAxis domain={[80, 100]} label={{ value: "Success Rate (%)", angle: -90, position: "insideLeft" }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="successRate" stroke="#82ca9d" name="Success Rate (%)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

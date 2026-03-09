"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { toast } from "@/components/ui/use-toast"
import { updateSettings } from "@/lib/actions"

const formSchema = z.object({
  autoOptimize: z.boolean().default(true),
  keywordDensity: z.number().min(30).max(100),
  customKeywords: z.string().optional(),
  excludedTerms: z.string().optional(),
  notifyOnCompletion: z.boolean().default(true),
  emailNotifications: z.string().email().optional().or(z.literal("")),
})

interface SettingsFormProps {
  settings: z.infer<typeof formSchema>
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: settings,
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true)
      await updateSettings(values)

      toast({
        title: "Settings updated",
        description: "Your settings have been saved successfully.",
      })
    } catch (error) {
      toast({
        title: "Failed to update settings",
        description: "There was an error saving your settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="autoOptimize"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Auto-Optimize New Images</FormLabel>
                    <FormDescription>Automatically optimize alt text for new images</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notifyOnCompletion"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Completion Notifications</FormLabel>
                    <FormDescription>Receive notifications when optimizations complete</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emailNotifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email for Notifications</FormLabel>
                  <FormControl>
                    <Input placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormDescription>Where to send optimization reports (optional)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="keywordDensity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keyword Density</FormLabel>
                  <div className="flex items-center space-x-4">
                    <FormControl>
                      <Slider
                        min={30}
                        max={100}
                        step={5}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                    <span className="w-12 text-center">{field.value}%</span>
                  </div>
                  <FormDescription>
                    Higher values prioritize exact keywords, lower values favor natural language
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customKeywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom Keywords</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter keywords separated by commas" {...field} />
                  </FormControl>
                  <FormDescription>Additional keywords to prioritize in alt text (optional)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="excludedTerms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excluded Terms</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter terms to exclude, separated by commas" {...field} />
                  </FormControl>
                  <FormDescription>Terms to avoid in generated alt text (optional)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" disabled={isSubmitting}>
          Save Settings
        </Button>
      </form>
    </Form>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, X, Send, Clock } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export function SupportChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [messages, setMessages] = useState<
    {
      id: string
      content: string
      sender: "user" | "support"
      timestamp: Date
    }[]
  >([
    {
      id: "welcome",
      content: "👋 Hi there! How can we help you today?",
      sender: "support",
      timestamp: new Date(),
    },
  ])

  const handleSendMessage = async () => {
    if (!message.trim()) return

    try {
      setIsSending(true)

      // Add user message
      const userMessage = {
        id: `user-${Date.now()}`,
        content: message,
        sender: "user" as const,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage])
      setMessage("")

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Add support acknowledgment
      const supportMessage = {
        id: `support-${Date.now()}`,
        content:
          "Thanks for reaching out! Our team will respond within 24 hours. Your ticket ID is #" +
          Math.floor(10000 + Math.random() * 90000),
        sender: "support" as const,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, supportMessage])

      toast({
        title: "Message sent",
        description: "We've received your message and will respond shortly.",
      })
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSending(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage()
  }

  return (
    <>
      {/* Chat button */}
      <Button className="fixed bottom-4 right-4 rounded-full h-12 w-12 p-0 shadow-lg" onClick={() => setIsOpen(true)}>
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Open support chat</span>
      </Button>

      {/* Chat window */}
      {isOpen && (
        <Card className="fixed bottom-4 right-4 w-80 sm:w-96 shadow-xl z-50 flex flex-col max-h-[500px]">
          <CardHeader className="p-4 border-b flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base font-medium">Support Chat</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </CardHeader>

          <CardContent className="p-4 overflow-y-auto flex-1 max-h-[300px]">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <div className="text-sm">{msg.content}</div>
                    <div className="text-xs mt-1 flex items-center opacity-70">
                      <Clock className="h-3 w-3 mr-1" />
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>

          <CardFooter className="p-4 border-t">
            {messages.length === 1 ? (
              <form className="w-full space-y-2" onSubmit={handleSubmit}>
                <Input placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
                <Textarea
                  placeholder="How can we help you?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[80px]"
                  required
                />
                <Button type="submit" className="w-full" disabled={isSending}>
                  {isSending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            ) : (
              <form className="w-full flex items-center space-x-2" onSubmit={handleSubmit}>
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon" disabled={isSending}>
                  {isSending ? <Clock className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </form>
            )}
          </CardFooter>
        </Card>
      )}
    </>
  )
}

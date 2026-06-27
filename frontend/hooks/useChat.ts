'use client'

import { useCallback, useState } from 'react'
import { sendChatMessage } from '@/services/api'
import type { ChatMessage } from '@/types/chat'

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim()
      if (!trimmed || isLoading) return

      setError(null)
      const userMessage: ChatMessage = {
        id: uid(),
        role: 'user',
        content: trimmed,
        createdAt: Date.now(),
      }

      setMessages((prev) => [...prev, userMessage])
      setIsLoading(true)

      try {
        const response = await sendChatMessage(trimmed)
        const assistantMessage: ChatMessage = {
          id: uid(),
          role: 'assistant',
          content: response.reply,
          createdAt: Date.now(),
        }
        setMessages((prev) => [...prev, assistantMessage])
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        console.error('[useChat] Error:', errorMessage)
        setError(errorMessage)
        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            role: 'assistant',
            content: `Error: ${errorMessage}. Please check that the backend is running.`,
            createdAt: Date.now(),
          },
        ])
      } finally {
        setIsLoading(false)
      }
    },
    [isLoading],
  )

  const clearMessages = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  return { messages, isLoading, error, sendMessage, clearMessages }
}

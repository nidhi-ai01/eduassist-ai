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

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim()
      if (!trimmed || isLoading) return

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
          college: response.college,
          createdAt: Date.now(),
        }
        setMessages((prev) => [...prev, assistantMessage])
      } catch (error) {
        console.log('[v0] useChat sendMessage error:', error)
        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            role: 'assistant',
            content:
              'Sorry, something went wrong while reaching the assistant. Please try again.',
            createdAt: Date.now(),
          },
        ])
      } finally {
        setIsLoading(false)
      }
    },
    [isLoading],
  )

  const clearMessages = useCallback(() => setMessages([]), [])

  return { messages, isLoading, sendMessage, clearMessages }
}

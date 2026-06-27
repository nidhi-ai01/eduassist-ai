import axios from 'axios'
import type { ChatRequest, ChatResponse } from '@/types/chat'

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
})

/**
 * Sends a chat message to the FastAPI backend.
 *
 * POST {NEXT_PUBLIC_API_URL}/chat
 * body:     { "message": "..." }
 * response: { "reply": "..." }
 */
export async function sendChatMessage(message: string): Promise<ChatResponse> {
  const { data } = await apiClient.post<ChatResponse>('/chat', {
    message,
  } satisfies ChatRequest)
  return data
}

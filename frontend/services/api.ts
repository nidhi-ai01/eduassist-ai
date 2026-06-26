import axios from 'axios'
import type { ChatRequest, ChatResponse } from '@/types/chat'
import { generateMockReply } from '@/lib/mock-data'

const baseURL = process.env.NEXT_PUBLIC_API_URL

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
 * response: { "reply": "...", "college"?: {...} }
 *
 * When no backend URL is configured (e.g. local preview) or the request
 * fails, a local demo response is returned so the UI stays functional.
 */
export async function sendChatMessage(message: string): Promise<ChatResponse> {
  if (!baseURL) {
    return generateMockReply(message)
  }

  try {
    const { data } = await apiClient.post<ChatResponse>('/chat', {
      message,
    } satisfies ChatRequest)
    return data
  } catch (error) {
    console.log('[v0] Chat API request failed, using demo response:', error)
    return generateMockReply(message)
  }
}

export type Role = 'user' | 'assistant'

export interface ChatMessage {
  id: string
  role: Role
  content: string
  createdAt: number
}

export interface ChatRequest {
  message: string
}

export interface ChatResponse {
  reply: string
}

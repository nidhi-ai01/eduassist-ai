export type Role = 'user' | 'assistant'

export interface CollegeInfo {
  name: string
  location: string
  type: string
  averageFees: string
  rating: number
  established: number
  courses: string[]
  placement: {
    averagePackage: string
    highestPackage: string
    placementRate: string
    topRecruiters: string[]
  }
}

export interface ChatMessage {
  id: string
  role: Role
  content: string
  college?: CollegeInfo
  createdAt: number
}

export interface ChatRequest {
  message: string
}

export interface ChatResponse {
  reply: string
  college?: CollegeInfo
}

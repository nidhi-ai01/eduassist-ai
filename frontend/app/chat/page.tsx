import type { Metadata } from 'next'
import { ChatBox } from '@/components/chat/chat-box'

export const metadata: Metadata = {
  title: 'Chat — EduAssist AI',
  description:
    'Chat with EduAssist AI about engineering colleges in India: admissions, placements, fees, cutoffs and comparisons.',
}

export default function ChatPage() {
  return <ChatBox />
}

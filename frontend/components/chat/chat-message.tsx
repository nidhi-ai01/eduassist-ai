'use client'

import { motion } from 'framer-motion'
import { Bot, User } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'
import type { ChatMessage as ChatMessageType } from '@/types/chat'
import { CollegeCard } from './college-card'

export function ChatMessage({ message }: { message: ChatMessageType }) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={cn(
        'flex items-start gap-3',
        isUser && 'flex-row-reverse',
      )}
    >
      <span
        className={cn(
          'flex size-8 shrink-0 items-center justify-center rounded-lg',
          isUser
            ? 'bg-secondary text-secondary-foreground'
            : 'bg-primary text-primary-foreground',
        )}
      >
        {isUser ? (
          <User className="size-4" aria-hidden="true" />
        ) : (
          <Bot className="size-4" aria-hidden="true" />
        )}
      </span>

      <div className={cn('min-w-0 max-w-[85%]', isUser && 'flex flex-col items-end')}>
        <div
          className={cn(
            'rounded-2xl px-4 py-3 text-sm',
            isUser
              ? 'rounded-tr-sm bg-primary text-primary-foreground'
              : 'glass rounded-tl-sm',
          )}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap leading-relaxed">
              {message.content}
            </p>
          ) : (
            <div className="markdown-body">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {message.college && <CollegeCard college={message.college} />}
      </div>
    </motion.div>
  )
}

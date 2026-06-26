'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, GraduationCap, RotateCcw, Sparkles } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useChat } from '@/hooks/useChat'
import { suggestedPrompts } from '@/lib/mock-data'
import { ChatMessage } from './chat-message'
import { ChatInput } from './chat-input'
import { TypingIndicator } from './typing-indicator'

export function ChatBox() {
  const { messages, isLoading, sendMessage, clearMessages } = useChat()
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const isEmpty = messages.length === 0

  return (
    <div className="flex h-dvh flex-col">
      {/* Header */}
      <header className="glass z-10 flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Back to home"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <GraduationCap className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold leading-tight">
              EduAssist <span className="text-primary">AI</span>
            </p>
            <p className="text-xs text-muted-foreground">
              AI College Counsellor
            </p>
          </div>
        </div>

        {!isEmpty && (
          <button
            type="button"
            onClick={clearMessages}
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">New chat</span>
          </button>
        )}
      </header>

      {/* Conversation */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-3xl px-4 py-6">
          {isEmpty ? (
            <EmptyState onPick={sendMessage} />
          ) : (
            <div className="flex flex-col gap-6">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && <TypingIndicator />}
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <ChatInput
        onSend={sendMessage}
        disabled={isLoading}
        suggestions={suggestedPrompts}
        showSuggestions={!isEmpty}
      />
    </div>
  )
}

function EmptyState({ onPick }: { onPick: (q: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center pt-10 text-center sm:pt-16"
    >
      <span className="glass mb-5 flex size-16 items-center justify-center rounded-2xl text-primary">
        <Sparkles className="size-8" aria-hidden="true" />
      </span>
      <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
        How can I help with your college search?
      </h1>
      <p className="mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground">
        Ask me about admissions, placements, rankings, fees, cutoffs, courses
        and comparisons of engineering colleges in India.
      </p>

      <div className="mt-8 grid w-full gap-3 sm:grid-cols-2">
        {suggestedPrompts.map((prompt, i) => (
          <motion.button
            key={prompt}
            type="button"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
            whileHover={{ y: -3 }}
            onClick={() => onPick(prompt)}
            className="glass rounded-xl px-4 py-3.5 text-left text-sm transition-shadow hover:shadow-lg hover:shadow-primary/10"
          >
            {prompt}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

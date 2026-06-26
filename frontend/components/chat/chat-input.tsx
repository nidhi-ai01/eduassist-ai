'use client'

import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
  suggestions?: string[]
  showSuggestions?: boolean
}

export function ChatInput({
  onSend,
  disabled,
  suggestions = [],
  showSuggestions,
}: ChatInputProps) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function submit() {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(e.target.value)
    const el = e.target
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`
  }

  return (
    <div className="sticky bottom-0 z-10 bg-gradient-to-t from-background via-background to-transparent px-4 pb-4 pt-6">
      <div className="mx-auto w-full max-w-3xl">
        {showSuggestions && suggestions.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {suggestions.map((s, i) => (
              <motion.button
                key={s}
                type="button"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => onSend(s)}
                disabled={disabled}
                className="glass rounded-full px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
              >
                {s}
              </motion.button>
            ))}
          </div>
        )}

        <div className="glass flex items-end gap-2 rounded-2xl p-2 shadow-lg shadow-black/20">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Ask about any engineering college in India..."
            className="max-h-40 flex-1 resize-none bg-transparent px-3 py-2.5 text-sm leading-relaxed outline-none placeholder:text-muted-foreground"
          />
          <button
            type="button"
            onClick={submit}
            disabled={disabled || !value.trim()}
            aria-label="Send message"
            className={cn(
              'flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all',
              'hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40',
            )}
          >
            <ArrowUp className="size-5" aria-hidden="true" />
          </button>
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          EduAssist AI can make mistakes. Verify important details with official
          sources.
        </p>
      </div>
    </div>
  )
}

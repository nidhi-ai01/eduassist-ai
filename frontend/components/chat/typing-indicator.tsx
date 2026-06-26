'use client'

import { motion } from 'framer-motion'
import { Bot } from 'lucide-react'

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-3"
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Bot className="size-4" aria-hidden="true" />
      </span>
      <div className="glass flex items-center gap-1.5 rounded-2xl rounded-tl-sm px-4 py-3.5">
        <span className="sr-only">EduAssist AI is typing</span>
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="size-2 rounded-full bg-muted-foreground"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.18,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { GraduationCap, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { GithubIcon } from '@/components/icons/github-icon'
import { cn } from '@/lib/utils'

const GITHUB_URL = 'https://github.com'

const navLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'Features', href: '/#features' },
  { label: 'Chat', href: '/chat' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-50 w-full"
    >
      <div className="glass mx-auto mt-3 flex w-[min(1100px,calc(100%-1.5rem))] items-center justify-between rounded-2xl px-4 py-3 shadow-lg shadow-black/20">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
            <GraduationCap className="size-5" aria-hidden="true" />
          </span>
          <span className="text-base font-semibold tracking-tight">
            EduAssist <span className="text-primary">AI</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              className="gap-2 border-border bg-transparent"
            >
              <GithubIcon className="size-4" />
              GitHub
            </Button>
          </a>
          <Link href="/chat">
            <Button className="bg-primary text-primary-foreground">
              Start Chatting
            </Button>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex size-9 items-center justify-center rounded-lg text-foreground md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        className={cn(
          'mx-auto grid w-[min(1100px,calc(100%-1.5rem))] overflow-hidden transition-all duration-300 md:hidden',
          open ? 'mt-2 grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="min-h-0">
          <div className="glass flex flex-col gap-1 rounded-2xl p-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <GithubIcon className="size-4" /> GitHub
            </a>
            <Link href="/chat" onClick={() => setOpen(false)}>
              <Button className="mt-1 bg-primary text-primary-foreground">
                Start Chatting
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

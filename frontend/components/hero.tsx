'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GithubIcon } from '@/components/icons/github-icon'

const GITHUB_URL = 'https://github.com'

export function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden px-4 pb-20 pt-24 sm:pt-32"
    >
      {/* Animated gradient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="aurora-blob absolute -top-40 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-primary/30 blur-[120px]" />
        <div className="aurora-blob absolute -right-32 top-20 size-[28rem] rounded-full bg-accent/25 blur-[120px] [animation-delay:-4s]" />
        <div className="aurora-blob absolute -left-32 top-40 size-[26rem] rounded-full bg-chart-4/25 blur-[120px] [animation-delay:-8s]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_75%)]" />
      </div>

      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-muted-foreground"
        >
          <Sparkles className="size-3.5 text-accent" aria-hidden="true" />
          Your Personal AI College Counsellor
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-6xl"
        >
          Find Your Perfect Engineering College with{' '}
          <span className="text-gradient">AI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground"
        >
          Powered by AI, engineering college datasets and real-time knowledge.
          Ask about admissions, placements, rankings, fees, cutoffs, courses and
          comparisons.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Link href="/chat">
            <Button
              size="lg"
              className="group gap-2 bg-primary text-primary-foreground shadow-lg shadow-primary/30"
            >
              Start Chatting
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-border bg-transparent"
            >
              <GithubIcon className="size-4" />
              GitHub
            </Button>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground"
        >
          {['500+ Colleges', 'Live Placement Data', 'JEE Cutoff Insights'].map(
            (item) => (
              <span key={item} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-accent" />
                {item}
              </span>
            ),
          )}
        </motion.div>
      </div>
    </section>
  )
}

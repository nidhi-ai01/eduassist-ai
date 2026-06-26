'use client'

import { motion } from 'framer-motion'
import {
  GraduationCap,
  BarChart3,
  Briefcase,
  Bot,
  type LucideIcon,
} from 'lucide-react'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: GraduationCap,
    title: 'College Information',
    description:
      'Get detailed insights on any engineering college — courses, fees, ratings, location and campus life.',
  },
  {
    icon: BarChart3,
    title: 'College Comparison',
    description:
      'Compare two or more colleges side by side on placements, fees, rankings and academics.',
  },
  {
    icon: Briefcase,
    title: 'Placements & Fees',
    description:
      'Explore average and highest packages, placement rates, top recruiters and fee structures.',
  },
  {
    icon: Bot,
    title: 'AI Career Guidance',
    description:
      'Personalised guidance on branches, cutoffs and choices based on your rank and interests.',
  },
]

export function FeatureCards() {
  return (
    <section id="features" className="relative px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything you need to choose right
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            EduAssist AI brings together data and intelligence to make college
            decisions effortless.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="glass group relative flex flex-col gap-4 rounded-2xl p-6 transition-shadow hover:shadow-xl hover:shadow-primary/10"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/20 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

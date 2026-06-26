'use client'

import { motion } from 'framer-motion'
import {
  MapPin,
  Building2,
  Wallet,
  Star,
  CalendarDays,
  BookOpen,
  Briefcase,
} from 'lucide-react'
import type { CollegeInfo } from '@/types/chat'

export function CollegeCard({ college }: { college: CollegeInfo }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="glass mt-3 overflow-hidden rounded-2xl"
    >
      {/* Header */}
      <div className="relative border-b border-border bg-primary/10 p-5">
        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-background/60 px-2.5 py-1 text-sm font-medium">
          <Star className="size-3.5 fill-accent text-accent" aria-hidden="true" />
          {college.rating.toFixed(1)}
        </div>
        <h3 className="pr-16 text-lg font-semibold tracking-tight">
          {college.name}
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-3.5" aria-hidden="true" />
          {college.location}
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-3">
        <Stat
          icon={<Building2 className="size-4" />}
          label="Type"
          value={college.type.split('•')[0].trim()}
        />
        <Stat
          icon={<Wallet className="size-4" />}
          label="Avg Fees"
          value={college.averageFees}
        />
        <Stat
          icon={<CalendarDays className="size-4" />}
          label="Established"
          value={String(college.established)}
        />
      </div>

      <div className="space-y-4 p-5">
        {/* Courses */}
        <div>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <BookOpen className="size-3.5" aria-hidden="true" /> Courses
          </p>
          <div className="flex flex-wrap gap-1.5">
            {college.courses.map((course) => (
              <span
                key={course}
                className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
              >
                {course}
              </span>
            ))}
          </div>
        </div>

        {/* Placement */}
        <div>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <Briefcase className="size-3.5" aria-hidden="true" /> Placements
          </p>
          <div className="grid grid-cols-3 gap-2">
            <Pill label="Average" value={college.placement.averagePackage} />
            <Pill label="Highest" value={college.placement.highestPackage} />
            <Pill label="Placed" value={college.placement.placementRate} />
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">Top recruiters:</span>{' '}
            {college.placement.topRecruiters.join(', ')}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="bg-card p-4">
      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {icon}
        {label}
      </span>
      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  )
}

function Pill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-secondary p-3 text-center">
      <p className="text-sm font-semibold text-primary">{value}</p>
      <p className="mt-0.5 text-[11px] text-muted-foreground">{label}</p>
    </div>
  )
}

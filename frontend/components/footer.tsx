import Link from 'next/link'
import { GraduationCap, Heart } from 'lucide-react'

const stack = ['Next.js', 'FastAPI', 'Gemini', 'Tailwind']

export function Footer() {
  return (
    <footer className="border-t border-border px-4 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <GraduationCap className="size-5" aria-hidden="true" />
          </span>
          <span className="text-base font-semibold tracking-tight">
            EduAssist <span className="text-primary">AI</span>
          </span>
        </Link>

        <p className="flex flex-wrap items-center justify-center gap-1.5 text-sm text-muted-foreground">
          Made with
          <Heart
            className="size-4 fill-destructive text-destructive"
            aria-hidden="true"
          />
          using
          {stack.map((tech, i) => (
            <span key={tech} className="font-medium text-foreground">
              {tech}
              {i < stack.length - 1 ? ',' : ''}
            </span>
          ))}
        </p>

        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} EduAssist AI. For informational
          purposes only.
        </p>
      </div>
    </footer>
  )
}

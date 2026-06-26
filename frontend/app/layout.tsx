import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'EduAssist AI — Your Personal AI College Counsellor',
  description:
    'Ask questions about engineering colleges in India including admissions, placements, rankings, fees, cutoff, courses, campus life and comparisons.',
  generator: 'v0.app',
  keywords: [
    'engineering colleges India',
    'IIT',
    'NIT',
    'IIIT',
    'college admissions',
    'placements',
    'AI college counsellor',
    'JEE cutoff',
  ],
  openGraph: {
    title: 'EduAssist AI — Your Personal AI College Counsellor',
    description:
      'Find your perfect engineering college with AI. Admissions, placements, rankings, fees, cutoffs and comparisons.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0b1020',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-background font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

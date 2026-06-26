import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { FeatureCards } from '@/components/feature-cards'
import { Footer } from '@/components/footer'

export default function Page() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <FeatureCards />
      <Footer />
    </main>
  )
}

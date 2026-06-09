import { Hero } from '@/components/hero'
import { StatsBar } from '@/components/stats-bar'
import { JoinSection } from '@/components/join-section'
import { AdminSection } from '@/components/admin-section'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <StatsBar />
      <JoinSection />
      <AdminSection />
    </main>
  )
}

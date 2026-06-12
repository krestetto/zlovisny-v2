import { Hero } from '@/components/hero'
import { StatsBar } from '@/components/stats-bar'
import { JoinSection } from '@/components/join-section'
import { AdminSection } from '@/components/admin-section'
import { ExpandingCard } from '@/components/expanding-card'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <StatsBar />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          <ExpandingCard
            eyebrow="Лор світу"
            title="Глибини світу"
            intro="Під поверхнею планети пульсує жива, кривава пітьма, що стежить за кожним кроком."
            details="Спустіться у древні підземелля, де переплетені вени світу ховають забуті артефакти та сплячих босів. Кожен крок углиб винагороджує сміливих рідкісним лутом — та карає необачних вічною темрявою."
            primaryHref="/features"
            primaryLabel="Детальніше"
            secondaryHref="/"
            secondaryLabel="Почати гру"
          />
          <ExpandingCard
            eyebrow="Пробуджені сили"
            title="Шлях пітьми"
            intro="Обери свій клас і пробуди приховану силу, що дрімає у твоїй крові."
            details="Сім унікальних шляхів сили чекають на тебе — від тіньових убивць до повелителів стихій. Розвивай дерево навичок, комбінуй здібності та стань легендою, чиє ім’я шепочуть у темряві."
            primaryHref="/classes"
            primaryLabel="Класи"
            secondaryHref="/"
            secondaryLabel="Почати гру"
          />
        </div>
      </section>
      <JoinSection />
      <AdminSection />
    </main>
  )
}

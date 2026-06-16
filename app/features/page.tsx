'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import {
  Landmark,
  Building2,
  CookingPot,
  Palette,
  Swords,
  Sparkles,
  Map,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Feature = {
  id: string
  icon: LucideIcon
  label: string
  title: string
  description: string
  points: string[]
}

const FEATURES: Feature[] = [
  {
    id: 'politics',
    icon: Landmark,
    label: 'Політика',
    title: 'Жива політична система',
    description:
      'На Зловісному гравці самі формують владу. Створюйте фракції, укладайте союзи, оголошуйте війни та боріться за вплив на планеті.',
    points: [
      'Вибори лідерів та рад міст',
      'Дипломатія, союзи та зради',
      'Податки й спільна скарбниця фракції',
      'Війни за території та ресурси',
    ],
  },
  {
    id: 'cities',
    icon: Building2,
    label: 'Міста',
    title: 'Будівництво власних міст',
    description:
      'Засновуйте поселення, розширюйте їх до велетенських мегаполісів та захищайте свої землі від загарбників і темних створінь.',
    points: [
      'Приватизація та захист територій',
      'Ролі мешканців і права доступу',
      'Спільні склади та інфраструктура',
      'Унікальні бафи для розвинених міст',
    ],
  },
  {
    id: 'cooking',
    icon: CookingPot,
    label: 'Куховарство',
    title: 'Глибока система куховарства',
    description:
      'Збирайте інгредієнти, відкривайте рецепти та готуйте страви, що дарують потужні тимчасові ефекти для пригод і боїв.',
    points: [
      'Сотні рецептів різної складності',
      'Страви з бойовими та утиліті-ефектами',
      'Рідкісні інгредієнти з підземель',
      'Прокачування навички кухаря',
    ],
  },
  {
    id: 'painting',
    icon: Palette,
    label: 'Малювання',
    title: 'Малювання та кастомізація',
    description:
      'Перетворюйте свій світ на витвір мистецтва — створюйте власні картини, прапори фракцій та унікальний декор.',
    points: [
      'Кастомні картини й банери',
      'Особисті герби та емблеми фракцій',
      'Декоративні блоки та меблі',
      'Галереї у містах гравців',
    ],
  },
  {
    id: 'classes',
    icon: Swords,
    label: 'Прокачування класів',
    title: 'Розвиток пробуджених класів',
    description:
      'Оберіть один із пробуджених шляхів сили та розвивайте його — відкривайте здібності, комбінуйте навички та станьте легендою.',
    points: [
      '7 унікальних класів зі своїм стилем',
      'Дерева навичок та активні вміння',
      'Спорядження під кожен клас',
      'Пробудження прихованих сил',
    ],
  },
  {
    id: 'pve',
    icon: Sparkles,
    label: 'Боси та лут',
    title: 'Древні боси й легендарний лут',
    description:
      'Кидайте виклик колосальним босам планети та здобувайте найрідкісніші артефакти, кожен з власним темним благословенням.',
    points: [
      'Десятки унікальних босів',
      'Рейди для команд та фракцій',
      'Легендарні сети спорядження',
      'Артефакти з особливими ефектами',
    ],
  },
  {
    id: 'world',
    icon: Map,
    label: 'Світи',
    title: 'Кілька вимірів для дослідження',
    description:
      'Окремі біоми та виміри зі своєю атмосферою, мешканцями й небезпеками чекають на найхоробріших дослідників.',
    points: [
      'Унікальні біоми та локації',
      'Жива інтерактивна мапа сервера',
      'Приховані підземелля та секрети',
      'Динамічні події у світі',
    ],
  },
  {
    id: 'community',
    icon: Users,
    label: 'Спільнота',
    title: 'Активна спільнота гравців',
    description:
      'Долучайтеся до дружньої спільноти, беріть участь в івентах та знаходьте союзників для нових звершень.',
    points: [
      'Регулярні івенти з нагородами',
      'Активний Discord-сервер',
      'Підтримка від адміністрації',
      'Конкурси будівництва та арту',
    ],
  },
]

export default function FeaturesPage() {
  const [active, setActive] = useState(FEATURES[0].id)
  const current = FEATURES.find((f) => f.id === active) ?? FEATURES[0]
  const Icon = current.icon

  return (
    <main className="flex-1">
      <PageHeader
        eyebrow="Особливості"
        title="Міні-вікі сервера"
        description="Зловісний — це цілий всесвіт можливостей. Обери розділ, щоб дізнатися більше про ключові механіки гри."
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Tab strip */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {FEATURES.map((f) => {
            const TabIcon = f.icon
            const isActive = f.id === active
            return (
              <button
                key={f.id}
                onClick={() => setActive(f.id)}
                aria-pressed={isActive}
                className={`shine flex min-h-[44px] items-center gap-2 rounded-md border px-4 py-2.5 text-sm font-semibold uppercase tracking-wide transition-all ${
                  isActive
                    ? 'border-primary bg-primary text-primary-foreground shadow-[0_0_24px_oklch(0.62_0.24_320_/_45%)]'
                    : 'border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground'
                }`}
              >
                <TabIcon className="h-4 w-4 shrink-0" />
                {f.label}
              </button>
            )
          })}
        </div>

        {/* Active panel */}
        <div
          key={current.id}
          className="art-frame art-frame-features mt-10 grid gap-8 rounded-lg border border-primary/40 bg-card/70 p-6 backdrop-blur-sm duration-500 animate-in fade-in slide-in-from-bottom-4 sm:p-10 md:grid-cols-[auto_1fr]"
        >
          <div className="flex md:flex-col md:items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 text-primary shadow-[0_0_30px_oklch(0.62_0.24_320_/_35%)]">
              <Icon className="h-10 w-10" />
            </div>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-foreground sm:text-3xl">
              {current.title}
            </h2>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              {current.description}
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {current.points.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-2 rounded-md border border-border bg-secondary/40 px-3 py-2.5 text-sm text-foreground"
                >
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}

'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { PageHeader } from '@/components/page-header'
import { Crown, Check, ArrowUpCircle, Sparkles, Info } from 'lucide-react'

const ranks = [
  {
    name: 'Послушник',
    priceMonth: '49₴',
    priceOne: '149₴',
    color: 'border-border',
    accent: 'text-muted-foreground',
    glow: '',
    btn: 'border border-border bg-secondary text-foreground hover:bg-secondary/70',
    base: true,
    popular: true,
    shopBg: '/shop-1.png',
    tagline: 'Перший крок у темряву.',
    detail:
      'Базовий ранг для тих, хто щойно ступив на планету. Дає зручності новачку та виділяє вас у чаті.',
    gallery: ['/feature-quests.png', '/feature-builds.png', '/section-world.png'],
    perks: [
      'Префікс [Послушник]',
      '2 додаткові домівки',
      'Доступ до /kit weekly',
      'Кольоровий чат',
    ],
  },
  {
    name: 'Пакт',
    priceMonth: '99₴',
    priceOne: '349₴',
    color: 'border-accent/50',
    accent: 'text-accent',
    glow: 'hover:shadow-[0_0_60px_oklch(0.6_0.22_18_/_45%)]',
    btn: 'border border-accent/50 bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground',
    shopBg: '/shop-2.png',
    tagline: 'Уклади угоду заради сили.',
    detail:
      'Розширює можливості гри: політ у спавні, особистий фамільяр і щоденні нагороди. Найкраще співвідношення ціни та переваг.',
    gallery: ['/feature-loot.png', '/section-loot.png', '/class-spirit.png'],
    perks: [
      'Усе з рангу Послушник',
      '5 додаткових домівок',
      'Доступ до /fly у спавні',
      'Особистий пет-фамільяр',
      'Щоденні скрині',
    ],
  },
  {
    name: 'Адепт',
    priceMonth: '199₴',
    priceOne: '699₴',
    color: 'border-primary',
    accent: 'text-primary',
    featured: true,
    glow: 'hover:shadow-[0_0_70px_oklch(0.62_0.24_320_/_55%)]',
    btn: 'bg-primary text-primary-foreground hover:opacity-90',
    shopBg: '/shop-3.png',
    tagline: 'Володар прокляту планети.',
    detail:
      'Найвищий рівень сили: безліміт домівок, власна приватна територія та пріоритетний вхід навіть на повний сервер.',
    gallery: ['/feature-bosses.png', '/section-boss.png', '/class-dragon.png'],
    perks: [
      'Усе з рангу Пакт',
      'Необмежені домівки',
      'Унікальний світний префікс',
      'Ексклюзивні косметичні ефекти',
      'Пріоритетний вхід на сервер',
      'Власна приватна територія',
    ],
  },
]

const upgradeBenefits = [
  'Платите лише різницю в ціні — не повну вартість нового рангу',
  'Усі переваги попереднього рангу зберігаються та доповнюються',
  'Підвищення активується миттєво, без втрати прогресу',
  'Вигідніше, ніж купувати кожен ранг окремо',
]

export default function StorePage() {
  // Monthly is the default & first option.
  const [billing, setBilling] = useState<'month' | 'one'>('month')
  const [highlight, setHighlight] = useState(false)
  const upgradeRef = useRef<HTMLDivElement>(null)

  const scrollToUpgrade = () => {
    upgradeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setHighlight(true)
    window.setTimeout(() => setHighlight(false), 2200)
  }

  return (
    <main className="flex-1">
      <PageHeader
        eyebrow="Прохідка"
        title="Обери свою прохідку"
        description="Підтримай сервер та отримай ексклюзивні переваги. Усі покупки активуються миттєво після оплати."
      />

      <section>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          {/* Billing toggle — monthly first & active by default */}
          <div className="mb-12 flex justify-center">
            <div className="inline-flex rounded-md border border-border bg-card p-1">
              <button
                onClick={() => setBilling('month')}
                className={`min-h-[44px] rounded-sm px-5 text-sm font-semibold uppercase tracking-wide transition-colors ${
                  billing === 'month'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                На місяць
              </button>
              <button
                onClick={() => setBilling('one')}
                className={`min-h-[44px] rounded-sm px-5 text-sm font-semibold uppercase tracking-wide transition-colors ${
                  billing === 'one'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Назавжди
              </button>
            </div>
          </div>

          <div className="mx-auto grid max-w-4xl gap-8 pt-4 lg:grid-cols-3">
            {ranks.map((rank) => (
              <div key={rank.name} className="group relative">
                {/* Page-darkening overlay — dims everything around the hovered block */}
                <div className="pointer-events-none fixed inset-0 z-30 bg-background/85 opacity-0 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-100" />

                {/* Left side panel — descriptive text, slides out on hover */}
                <div className="pointer-events-none absolute right-full top-1/2 z-40 hidden w-56 -translate-y-1/2 translate-x-4 pr-4 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 2xl:block">
                  <div className="art-frame rounded-md border border-primary/40 bg-card p-5 shadow-[0_0_50px_oklch(0_0_0_/_65%)]">
                    <h4 className={`font-heading text-base font-bold uppercase tracking-wide ${rank.accent}`}>
                      {rank.name}
                    </h4>
                    <p className="mt-1 text-xs font-medium text-accent">{rank.tagline}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {rank.detail}
                    </p>
                  </div>
                </div>

                {/* Right side panel — gallery photos on a block-style background, slides out on hover */}
                <div className="pointer-events-none absolute left-full top-1/2 z-40 hidden w-48 -translate-y-1/2 -translate-x-4 pl-4 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 2xl:block">
                  <div className="art-frame flex flex-col gap-3 rounded-md border border-primary/40 bg-card p-3 shadow-[0_0_50px_oklch(0_0_0_/_65%)]">
                    {rank.gallery.map((src, i) => (
                      <div
                        key={src}
                        className="overflow-hidden rounded-sm border border-border/70 bg-secondary"
                        style={{ transitionDelay: `${i * 80}ms` }}
                      >
                        <img
                          src={src || '/placeholder.svg'}
                          alt={`${rank.name} — ілюстрація ${i + 1}`}
                          className="h-32 w-full object-cover"
                          style={{ imageRendering: 'pixelated' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {rank.popular && (
                  <span className="pointer-events-none absolute -top-3 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-sm bg-primary px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-[0_4px_18px_oklch(0.62_0.24_320_/_55%)]">
                    Популярний
                  </span>
                )}

                <div
                  className={`art-frame relative flex h-full flex-col overflow-hidden rounded-md border p-8 transition-all duration-300 group-hover:z-40 group-hover:-translate-y-2 group-hover:scale-105 ${rank.color} ${rank.glow} ${
                    rank.featured ? 'shadow-[0_0_40px_oklch(0.62_0.24_320_/_25%)]' : ''
                  }`}
                  style={rank.shopBg ? { backgroundImage: `url('${rank.shopBg}')`, backgroundSize: 'cover', backgroundPosition: 'center' } : { background: 'var(--card)' }}
                >
                  {/* Rank artwork — now fully visible, zooms on hover */}
                  <div className="pointer-events-none absolute inset-0">
                    <img
                      src={rank.img || '/placeholder.svg'}
                      alt=""
                      aria-hidden="true"
                      className="h-full w-full object-cover opacity-40 transition-all duration-500 group-hover:scale-110 group-hover:opacity-60"
                      style={{ imageRendering: 'pixelated' }}
                    />
                    {/* Only a bottom gradient to keep text readable — top stays fully clear */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  </div>

                  <div className="relative flex flex-1 flex-col">
                    <Crown className={`h-8 w-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] ${rank.accent}`} />
                    <h3 className="mt-4 font-heading text-2xl font-bold uppercase tracking-wide text-foreground drop-shadow-[0_2px_12px_rgba(0,0,0,1)]">
                      {rank.name}
                    </h3>
                    <p className={`mt-1 text-sm font-medium drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)] ${rank.accent}`}>{rank.tagline}</p>
                    <div className="mt-4 flex items-end gap-1">
                      <span className={`font-heading text-4xl font-black drop-shadow-[0_2px_12px_rgba(0,0,0,1)] ${rank.accent}`}>
                        {billing === 'month' ? rank.priceMonth : rank.priceOne}
                      </span>
                      <span className="mb-1 text-sm text-muted-foreground drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
                        {billing === 'month' ? '/міс' : ' разово'}
                      </span>
                    </div>

                    {/* Extra info revealed on hover (mobile / smaller screens) */}
                    <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 group-hover:mt-4 group-hover:grid-rows-[1fr] group-hover:opacity-100 2xl:hidden">
                      <p className="overflow-hidden rounded-sm border border-border/60 bg-secondary/40 p-3 text-sm leading-relaxed text-muted-foreground">
                        {rank.detail}
                      </p>
                    </div>

                    {/* Gallery for smaller screens (no room for side panels) */}
                    <div className="grid grid-cols-3 gap-2 opacity-0 transition-all duration-500 group-hover:mt-4 group-hover:opacity-100 2xl:hidden">
                      {rank.gallery.map((src, i) => (
                        <div
                          key={src}
                          className="overflow-hidden rounded-sm border border-border/60 bg-secondary"
                        >
                          <img
                            src={src || '/placeholder.svg'}
                            alt={`${rank.name} — ілюстрація ${i + 1}`}
                            className="h-20 w-full object-cover"
                            style={{ imageRendering: 'pixelated' }}
                          />
                        </div>
                      ))}
                    </div>

                    <ul className="mt-6 flex flex-1 flex-col gap-3">
                      {rank.perks.map((perk) => (
                        <li key={perk} className="flex items-start gap-2 rounded-sm bg-black/40 px-2 py-1 text-sm text-foreground backdrop-blur-[2px]">
                          <Check className={`mt-0.5 h-4 w-4 shrink-0 ${rank.accent}`} />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      className={`shine mt-8 min-h-[44px] rounded-sm px-6 text-sm font-bold uppercase tracking-wide transition-all ${rank.btn}`}
                    >
                      Придбати
                    </button>
                    {/* Prominent glowing upgrade button inside Пакт & Адепт */}
                    {!rank.base && (
                      <button
                        onClick={scrollToUpgrade}
                        className="shine mt-3 flex min-h-[44px] items-center justify-center gap-2 rounded-sm border border-primary bg-primary/15 px-6 text-sm font-bold uppercase tracking-wide text-primary shadow-[0_0_22px_oklch(0.62_0.24_320_/_45%)] transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_40px_oklch(0.62_0.24_320_/_70%)]"
                      >
                        <ArrowUpCircle className="h-4 w-4" />
                        Покращити прохідку
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Big prominent upgrade banner — target of "Покращити прохідку" */}
          <div
            ref={upgradeRef}
            className={`group art-frame mt-14 scroll-mt-28 overflow-hidden rounded-lg border bg-gradient-to-r from-primary/15 via-card to-accent/15 p-8 transition-all duration-500 ${
              highlight
                ? 'border-primary shadow-[0_0_80px_oklch(0.62_0.24_320_/_70%)] ring-2 ring-primary scale-[1.02]'
                : 'border-primary/60 shadow-[0_0_50px_oklch(0.62_0.24_320_/_30%)]'
            }`}
          >
            <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:text-left">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-primary/50 bg-primary/20 text-primary shadow-[0_0_30px_oklch(0.62_0.24_320_/_50%)]">
                <ArrowUpCircle className="h-9 w-9" />
              </div>
              <div className="flex-1">
                <h3 className="flex items-center justify-center gap-2 font-heading text-2xl font-bold uppercase tracking-tight text-foreground md:justify-start">
                  <Sparkles className="h-5 w-5 text-accent" />
                  Уже маєте прохідку?
                </h3>
                <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
                  Не платіть повну ціну! Щоб покращити прохідку, напишіть у{' '}
                  <Link
                    href="/support"
                    className="font-semibold text-primary underline-offset-2 hover:underline"
                  >
                    підтримку
                  </Link>{' '}
                  та доплатіть лише різницю між вашим поточним рангом і новим — і
                  миттєво підніміться на вищий рівень сили. Ось чому покращення
                  вигідніше:
                </p>

                {/* Clear explanation of how & why to upgrade */}
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {upgradeBenefits.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 rounded-sm border border-border/60 bg-secondary/40 p-3 text-sm text-foreground"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>
                    Як покращити: оберіть бажаний ранг вище, перейдіть у{' '}
                    <Link
                      href="/support"
                      className="font-semibold text-primary underline-offset-2 hover:underline"
                    >
                      підтримку
                    </Link>{' '}
                    та оберіть пункт «Покращити прохідку», вкажіть свій нік і
                    поточний ранг — і ми перерахуємо доплату лише за різницю.
                  </span>
                </p>

                {/* 3 photos that appear after hovering the block */}
                <div className="mt-6 grid grid-cols-3 gap-3 opacity-0 transition-all duration-500 group-hover:opacity-100">
                  {['/rank-poslushnik.png', '/rank-pakt.png', '/rank-adept.png'].map((src, i) => (
                    <div
                      key={src}
                      className="art-frame overflow-hidden rounded-md border border-primary/40 shadow-[0_0_24px_oklch(0.62_0.24_320_/_30%)]"
                      style={{ transitionDelay: `${i * 100}ms` }}
                    >
                      <img
                        src={src || '/placeholder.svg'}
                        alt={`Ілюстрація рангу ${i + 1}`}
                        className="h-28 w-full object-cover"
                        style={{ imageRendering: 'pixelated' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <Link
                href="/support"
                className="shine flex min-h-[52px] shrink-0 items-center justify-center rounded-md bg-primary px-8 text-base font-bold uppercase tracking-wide text-primary-foreground shadow-[0_0_30px_oklch(0.62_0.24_320_/_55%)] transition-all hover:scale-105 hover:shadow-[0_0_50px_oklch(0.62_0.24_320_/_75%)]"
              >
                Покращити прохідку
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { Crown, Check, ArrowUpCircle, Sparkles } from 'lucide-react'

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

export default function StorePage() {
  // Monthly is the default & first option.
  const [billing, setBilling] = useState<'month' | 'one'>('month')

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

          <div className="grid gap-8 pt-4 lg:grid-cols-3">
            {ranks.map((rank) => (
              <div
                key={rank.name}
                className={`art-frame relative flex flex-col rounded-md border bg-card p-8 transition-all duration-300 hover:z-10 hover:-translate-y-2 hover:scale-105 ${rank.color} ${rank.glow} ${
                  rank.featured ? 'shadow-[0_0_40px_oklch(0.62_0.24_320_/_25%)]' : ''
                }`}
              >
                {rank.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-sm bg-primary px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary-foreground">
                    Популярний
                  </span>
                )}
                <Crown className={`h-8 w-8 ${rank.accent}`} />
                <h3 className="mt-4 font-heading text-2xl font-bold uppercase tracking-wide text-foreground">
                  {rank.name}
                </h3>
                <div className="mt-4 flex items-end gap-1">
                  <span className={`font-heading text-4xl font-black ${rank.accent}`}>
                    {billing === 'month' ? rank.priceMonth : rank.priceOne}
                  </span>
                  <span className="mb-1 text-sm text-muted-foreground">
                    {billing === 'month' ? '/міс' : ' разово'}
                  </span>
                </div>
                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {rank.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-sm text-muted-foreground">
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
                  <button className="shine mt-3 flex min-h-[44px] items-center justify-center gap-2 rounded-sm border border-primary bg-primary/15 px-6 text-sm font-bold uppercase tracking-wide text-primary shadow-[0_0_22px_oklch(0.62_0.24_320_/_45%)] transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_40px_oklch(0.62_0.24_320_/_70%)]">
                    <ArrowUpCircle className="h-4 w-4" />
                    Покращити прохідку
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Big prominent upgrade banner */}
          <div className="art-frame mt-14 overflow-hidden rounded-lg border border-primary/60 bg-gradient-to-r from-primary/15 via-card to-accent/15 p-8 shadow-[0_0_50px_oklch(0.62_0.24_320_/_30%)]">
            <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-primary/50 bg-primary/20 text-primary shadow-[0_0_30px_oklch(0.62_0.24_320_/_50%)]">
                <ArrowUpCircle className="h-9 w-9" />
              </div>
              <div className="flex-1">
                <h3 className="flex items-center justify-center gap-2 font-heading text-2xl font-bold uppercase tracking-tight text-foreground md:justify-start">
                  <Sparkles className="h-5 w-5 text-accent" />
                  Уже маєте прохідку?
                </h3>
                <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
                  Не платіть повну ціну! Доплатіть лише різницю між вашим поточним
                  рангом і новим — і миттєво підніміться на вищий рівень сили.
                </p>
              </div>
              <button className="shine min-h-[52px] shrink-0 rounded-md bg-primary px-8 text-base font-bold uppercase tracking-wide text-primary-foreground shadow-[0_0_30px_oklch(0.62_0.24_320_/_55%)] transition-all hover:scale-105 hover:shadow-[0_0_50px_oklch(0.62_0.24_320_/_75%)]">
                Покращити зараз
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

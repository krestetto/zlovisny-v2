'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { Crown, Check, Sparkles } from 'lucide-react'

const ranks = [
  {
    name: 'Послушник',
    price: '149₴',
    color: 'border-border',
    accent: 'text-muted-foreground',
    btn: 'border border-border bg-secondary text-foreground hover:bg-secondary/70',
    perks: [
      'Префікс [Послушник]',
      '2 додаткові домівки',
      'Доступ до /kit weekly',
      'Кольоровий чат',
    ],
  },
  {
    name: 'Адепт',
    price: '349₴',
    color: 'border-accent/50',
    accent: 'text-accent',
    featured: false,
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
    name: 'Темний Лорд',
    price: '699₴',
    color: 'border-primary',
    accent: 'text-primary',
    featured: true,
    btn: 'bg-primary text-primary-foreground hover:opacity-90',
    perks: [
      'Усе з рангу Адепт',
      'Необмежені домівки',
      'Унікальний світний префікс',
      'Ексклюзивні косметичні ефекти',
      'Пріоритетний вхід на сервер',
      'Власна приватна територія',
    ],
  },
]

const crates = [
  { name: 'Скриня Тіней', price: '49₴', items: '5 предметів' },
  { name: 'Проклята Скриня', price: '99₴', items: '10 предметів + рідкісний шанс' },
  { name: 'Скриня Ельдрітча', price: '199₴', items: '15 предметів + гарантований легендарний' },
]

export default function StorePage() {
  const [billing, setBilling] = useState<'one' | 'month'>('one')

  return (
    <main>
      <PageHeader
        eyebrow="Магазин"
        title="Уклади угоду з темрявою"
        description="Підтримай сервер та отримай ексклюзивні переваги. Усі покупки активуються миттєво після оплати."
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="mb-12 flex justify-center">
            <div className="inline-flex rounded-sm border border-border bg-card p-1">
              <button
                onClick={() => setBilling('one')}
                className={`rounded-sm px-5 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
                  billing === 'one'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Назавжди
              </button>
              <button
                onClick={() => setBilling('month')}
                className={`rounded-sm px-5 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
                  billing === 'month'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Щомісяця
              </button>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {ranks.map((rank) => (
              <div
                key={rank.name}
                className={`relative flex flex-col rounded-md border bg-card p-8 ${rank.color} ${
                  rank.featured ? 'shadow-[0_0_40px_oklch(0.52_0.22_20_/_25%)]' : ''
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
                    {rank.price}
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
                  className={`mt-8 rounded-sm px-6 py-3 text-sm font-bold uppercase tracking-wide transition-all ${rank.btn}`}
                >
                  Придбати
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-accent" />
            <h2 className="font-heading text-2xl font-bold uppercase tracking-wide text-foreground sm:text-3xl">
              Скрині та ключі
            </h2>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {crates.map((crate) => (
              <div
                key={crate.name}
                className="flex items-center justify-between rounded-md border border-border bg-card p-6 transition-colors hover:border-accent/40"
              >
                <div>
                  <h3 className="font-heading text-lg font-bold uppercase tracking-wide text-foreground">
                    {crate.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{crate.items}</p>
                </div>
                <button className="rounded-sm border border-accent/50 bg-accent/10 px-4 py-2 text-sm font-bold text-accent transition-colors hover:bg-accent hover:text-accent-foreground">
                  {crate.price}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

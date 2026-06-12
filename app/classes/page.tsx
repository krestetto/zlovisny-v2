'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { ClassDetail } from '@/components/class-detail'
import { CLASSES } from '@/lib/classes-data'
import { ChevronDown, Lock } from 'lucide-react'

export default function ClassesPage() {
  const [activeId, setActiveId] = useState(CLASSES[0].id)
  const [openMobile, setOpenMobile] = useState<string | null>(CLASSES[0].id)
  const active = CLASSES.find((c) => c.id === activeId) ?? CLASSES[0]

  return (
    <main className="flex-1">
      <PageHeader
        title="Класи"
        description="Шість пробуджених шляхів сили — та один, що досі спить. Оберіть свою долю на планеті Зловісний."
      />

      <section className="relative overflow-hidden">
        {/* Replaceable background photo — swap /classes-bg.png for your own */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/classes-bg.png)' }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-background/88" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        {/* ===== Desktop: sidebar + main content ===== */}
        <div className="hidden gap-8 lg:grid lg:grid-cols-[280px_1fr]">
          {/* Sidebar list */}
          <aside className="flex flex-col gap-2">
            {CLASSES.map((c) => {
              const Icon = c.icon
              const isActive = c.id === activeId
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveId(c.id)}
                  aria-pressed={isActive}
                  className={`shine flex min-h-[56px] items-center gap-3 rounded-md border px-4 text-left transition-all ${
                    isActive
                      ? 'border-primary bg-primary/15 text-foreground shadow-[0_0_24px_oklch(0.62_0.24_320_/_35%)]'
                      : 'border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground'
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border ${
                      isActive ? 'border-primary/50 bg-primary/20 text-primary' : 'border-border bg-secondary'
                    }`}
                  >
                    {c.locked ? <Lock className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-heading text-sm font-bold uppercase tracking-wide">
                      {c.name}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">{c.title}</span>
                  </span>
                </button>
              )
            })}
          </aside>

          {/* Main content */}
          <div
            key={active.id}
            className="art-frame rounded-lg border border-primary/40 bg-card/70 p-8 backdrop-blur-sm duration-500 animate-in fade-in slide-in-from-right-4"
          >
            <ClassDetail info={active} />
          </div>
        </div>

        {/* ===== Mobile/Tablet: accordion ===== */}
        <div className="flex flex-col gap-4 lg:hidden">
          {CLASSES.map((c) => {
            const Icon = c.icon
            const isOpen = openMobile === c.id
            return (
              <div
                key={c.id}
                className={`art-frame overflow-hidden rounded-lg border bg-card/70 backdrop-blur-sm transition-all ${
                  isOpen
                    ? 'border-primary/60 shadow-[0_0_30px_oklch(0.62_0.24_320_/_30%)]'
                    : 'border-border'
                }`}
              >
                <button
                  onClick={() => setOpenMobile(isOpen ? null : c.id)}
                  aria-expanded={isOpen}
                  className="flex min-h-[64px] w-full items-center gap-3 px-4 text-left"
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border ${
                      isOpen ? 'border-primary/50 bg-primary/20 text-primary' : 'border-border bg-secondary text-muted-foreground'
                    }`}
                  >
                    {c.locked ? <Lock className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-heading text-lg font-bold uppercase tracking-wide text-foreground">
                      {c.name}
                    </span>
                    <span className="block text-sm text-accent">{c.title}</span>
                  </span>
                  <ChevronDown
                    className={`h-6 w-6 shrink-0 text-primary transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-border/60 p-5">
                      <ClassDetail info={c} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        </div>
      </section>
    </main>
  )
}

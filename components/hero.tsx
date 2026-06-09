'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Copy, Check, ChevronDown } from 'lucide-react'

export function Hero() {
  const [copied, setCopied] = useState(false)

  const copyIp = () => {
    navigator.clipboard.writeText('play.zlovisnyi.net')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/hero-bg.png)' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background"
        aria-hidden="true"
      />
      <div className="bg-grain absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 py-20 text-center">
        <span className="mb-6 inline-block rounded-sm border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Сезон 4 · Прокляття пробуджено
        </span>
        <h1 className="font-heading text-5xl font-black uppercase leading-none tracking-tight text-foreground text-balance sm:text-7xl lg:text-8xl">
          <span className="text-glow-red text-primary">Зловісний</span>
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          Зануртеся у проклятий світ, де темрява має власну волю. Перемагайте
          моторошних босів, збирайте легендарний лут і виживайте серед тіней. Моди
          не потрібні — лише ваша хоробрість.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <button
            onClick={copyIp}
            className="group flex items-center gap-3 rounded-sm bg-primary px-8 py-4 text-base font-bold uppercase tracking-wide text-primary-foreground shadow-[0_0_30px_oklch(0.52_0.22_20_/_40%)] transition-all hover:scale-105 hover:shadow-[0_0_45px_oklch(0.52_0.22_20_/_60%)]"
          >
            <span className="font-mono">play.zlovisnyi.net</span>
            {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
          </button>
          <Link
            href="/features"
            className="rounded-sm border border-border bg-secondary/60 px-8 py-4 text-base font-bold uppercase tracking-wide text-foreground backdrop-blur-sm transition-colors hover:border-accent/50 hover:text-accent"
          >
            Дізнатися більше
          </Link>
        </div>

        <div className="mt-10 flex items-center gap-2 text-sm text-muted-foreground">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
          </span>
          <span>
            <span className="font-bold text-foreground">1 247</span> гравців онлайн
          </span>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-muted-foreground">
        <ChevronDown className="h-6 w-6" />
      </div>
    </section>
  )
}

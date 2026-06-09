'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Copy, Check, ChevronDown } from 'lucide-react'

export function Hero() {
  const [copied, setCopied] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const copyIp = () => {
    navigator.clipboard.writeText('play.zlovisnyi.net')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden">
      {/* Deep space gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, oklch(0.3 0.12 300) 0%, oklch(0.17 0.05 285) 55%, oklch(0.12 0.04 280) 100%)',
        }}
        aria-hidden="true"
      />
      {/* Drifting stars */}
      <div
        className="bg-stars animate-drift absolute inset-0 opacity-70"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        aria-hidden="true"
      />

      {/* Cosmic landscape with parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/bg-landscape.png)',
          transform: `translateY(${scrollY * 0.3}px) scale(${1.05 + scrollY * 0.0003})`,
          imageRendering: 'pixelated',
        }}
        aria-hidden="true"
      />

      {/* Vignette / readability overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background"
        aria-hidden="true"
      />

      <div
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 py-24 text-center"
        style={{ transform: `translateY(${scrollY * -0.12}px)`, opacity: Math.max(0, 1 - scrollY / 600) }}
      >
        <span className="mb-6 inline-block rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur-sm">
          Сезон 4 · Пробудження планети
        </span>
        <h1 className="font-heading text-6xl font-black uppercase leading-[0.9] tracking-tight text-balance sm:text-8xl lg:text-9xl">
          <span className="text-glow-violet text-foreground">Зловісний</span>
        </h1>
        <p className="mt-3 font-heading text-lg uppercase tracking-[0.35em] text-accent sm:text-2xl">
          Майнкрафт всесвіт
        </p>
        <p className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          Далеко за межами зірок обертається проклята планета. Дослідіть її
          світи, киньте виклик древнім босам та зберіть легендарний лут. Моди не
          потрібні — лише ваша відвага.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <button
            onClick={copyIp}
            className="group flex items-center gap-3 rounded-md bg-primary px-8 py-4 text-base font-bold uppercase tracking-wide text-primary-foreground shadow-[0_0_40px_oklch(0.62_0.24_320_/_50%)] transition-all hover:scale-105 hover:shadow-[0_0_60px_oklch(0.62_0.24_320_/_70%)]"
          >
            <span className="font-mono">play.zlovisnyi.net</span>
            {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
          </button>
          <Link
            href="/features"
            className="rounded-md border border-border bg-secondary/50 px-8 py-4 text-base font-bold uppercase tracking-wide text-foreground backdrop-blur-sm transition-colors hover:border-accent/60 hover:text-accent"
          >
            Дослідити світ
          </Link>
        </div>

        <div className="mt-10 flex items-center gap-2 text-sm text-muted-foreground">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
          </span>
          <span>
            <span className="font-bold text-foreground">1 247</span> мандрівників онлайн
          </span>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-muted-foreground">
        <ChevronDown className="h-6 w-6" />
      </div>
    </section>
  )
}

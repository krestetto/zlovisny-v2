'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Copy, Check, ChevronDown } from 'lucide-react'

const SERVER_IP = 'zlovisny.space'

export function Hero() {
  const [copied, setCopied] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const copyIp = async () => {
    try {
      await navigator.clipboard.writeText(SERVER_IP)
    } catch {
      const el = document.createElement('textarea')
      el.value = SERVER_IP
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden">
      {/* Deep space gradient base — dark so there is no white flash before the
          landscape photo loads */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, oklch(0.18 0.05 25) 0%, oklch(0.1 0.03 22) 55%, oklch(0.05 0.01 20) 100%)',
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

      {/* Vignette / readability overlay — fades to dark at the bottom so it
          flows into the cosmic sections below instead of a flat white bar */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/92"
        aria-hidden="true"
      />

      <div
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-4 py-12 text-center"
        style={{ transform: `translateY(${scrollY * -0.12}px)`, opacity: Math.max(0, 1 - scrollY / 600) }}
      >
        <span className="mb-4 inline-block rounded-full border border-primary/40 bg-primary/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-primary backdrop-blur-sm sm:text-sm">
          Бета-тест
        </span>

        {/* Centered server logo */}
        <img
          src="/logo.png"
          alt="Логотип сервера Зловісний"
          width={180}
          height={180}
          loading="eager"
          fetchPriority="high"
          className="animate-float-slow mb-3 h-20 w-20 object-contain sm:h-24 sm:w-24"
          style={{ imageRendering: 'pixelated' }}
        />

        <h1 className="w-full">
          <span className="sr-only">Зловісний</span>
          <img
            src="/wordmark.png"
            alt="Зловісний"
            width={2048}
            height={420}
            loading="eager"
            fetchPriority="high"
            className="mx-auto w-full max-w-md object-contain sm:max-w-xl"
            style={{ imageRendering: 'pixelated' }}
          />
        </h1>
        <p className="mt-2 font-heading text-sm uppercase tracking-[0.35em] text-accent sm:text-base">
          Майнкрафт сервер
        </p>
        <p className="mx-auto mt-4 max-w-2xl rounded-lg bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.75)_0%,_rgba(255,255,255,0.45)_60%,_transparent_85%)] p-4 text-pretty text-sm leading-relaxed text-black sm:text-base">
          Обирайте клас та розвивайте свої магічні здібності безпосередньо під час виживання. Засновуйте власні міста та захоплюйте стратегічні точки ресурсів на карті для отримання пасивного прибутку. Досліджуйте кастомні предмети з унікальною їжею та проявляйте креативність, малюючи справжні картини прямо в грі. Спілкуйтеся через локальний голосовий чат і насолоджуйтеся повною свободою дій завдяки мінімуму правил.
        </p>

        <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row">
          <button
            onClick={copyIp}
            className="btn-img shine group flex items-center gap-3 rounded-md bg-primary px-8 py-4 text-base font-bold uppercase tracking-wide text-primary-foreground shadow-[0_0_40px_oklch(0.55_0.23_27_/_50%)] transition-all hover:scale-105 hover:shadow-[0_0_60px_oklch(0.55_0.23_27_/_70%)]"
          >
            <span className="font-mono">{SERVER_IP}</span>
            {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
          </button>
          <Link
            href="/features"
            className="btn-img shine rounded-md border border-primary/30 bg-black/35 px-8 py-4 text-base font-bold uppercase tracking-wide text-white backdrop-blur-sm transition-colors [text-shadow:0_1px_3px_rgba(0,0,0,0.6)] hover:border-accent/60 hover:text-accent"
          >
            Дослідити світ
          </Link>
        </div>

        <div className="mt-6 flex items-center gap-2 text-sm text-white/70 [text-shadow:0_1px_3px_rgba(0,0,0,0.7)]">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
          </span>
          <span>
            <span className="font-bold text-white">1 248</span> мандрівників онлайн
          </span>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white/60 [text-shadow:0_1px_3px_rgba(0,0,0,0.7)]">
        <ChevronDown className="h-6 w-6" />
      </div>
    </section>
  )
}

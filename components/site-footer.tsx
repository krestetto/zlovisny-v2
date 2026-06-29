'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { MessageCircle, Globe, ChevronUp, Copy, Check } from 'lucide-react'

const DISCORD_URL = 'https://discord.gg/fwZQX55VCF'
const WIKI_URL = 'https://zlovisny.gitbook.io/wiki'
const SERVER_IP = 'zlovisny.space'

const footerNav = [
  {
    title: 'Гра',
    links: [
      { href: '/features', label: 'Особливості' },
      { href: '/classes', label: 'Класи' },
      { href: '/rules', label: 'Правила' },
      { href: '/vote', label: 'Голосувати' },
    ],
  },
  {
    title: 'Спільнота',
    links: [
      { href: '/recruitment', label: 'Набір в команду' },
      { href: '/support', label: 'Підтримка' },
      { href: DISCORD_URL, label: 'Discord', external: true },
      { href: WIKI_URL, label: 'Вікі', external: true },
    ],
  },
  {
    title: 'Магазин',
    links: [{ href: '/store', label: 'Прохідки' }],
  },
]

export function SiteFooter() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SERVER_IP)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable — ignore */
    }
  }

  return (
    <footer
      className="group fixed inset-x-0 bottom-0 z-40 w-full overflow-hidden border-t border-border bg-background"
      aria-label="Підвал сайту"
    >
      {/* Collapsed peek + expand upward on hover (anchored to bottom of viewport) */}
      <div className="relative h-[38px] transition-[height] duration-500 ease-in-out group-hover:h-[230px] sm:group-hover:h-[200px]">
        {/* Full-width image frame anchored to the bottom */}
        <div className="absolute inset-0">
          <Image
            src="/footer-frame.png"
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
          {/* Subtle dark overlay so the text stays readable (no white haze) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/45 to-black/20 transition-opacity duration-700 group-hover:from-black/85 group-hover:via-black/70 group-hover:to-black/40" />
        </div>

        {/* Hint shown only while collapsed */}
        <div className="absolute inset-x-0 top-0 flex h-[38px] flex-row items-center justify-center gap-2 text-center transition-opacity duration-300 group-hover:pointer-events-none group-hover:opacity-0">
          <ChevronUp className="h-4 w-4 animate-pulse text-primary" aria-hidden="true" />
          <span className="font-heading text-[0.65rem] font-bold uppercase tracking-[0.3em] text-white/80">
            Наведіть, щоб відкрити
          </span>
        </div>

        {/* Footer content revealed on hover */}
        <div className="pointer-events-none absolute inset-0 flex flex-col overflow-y-auto opacity-0 transition-opacity duration-500 delay-100 group-hover:pointer-events-auto group-hover:opacity-100">
          <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-5 px-4 pb-3 pt-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            {/* Brand + interactive server IP */}
            <div className="max-w-sm">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="Логотип Зловісний"
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain"
                />
                <span className="font-heading text-base font-bold uppercase tracking-widest text-white">
                  Зловісний
                </span>
              </Link>

              {/* Interactive: live status + copy server IP */}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-sm border border-white/20 bg-black/40 px-2.5 py-1.5 text-xs text-white backdrop-blur-sm">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </span>
                  Онлайн
                </span>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="shine group/ip inline-flex items-center gap-2 rounded-sm border border-white/20 bg-black/40 px-2.5 py-1.5 font-mono text-xs text-white backdrop-blur-sm transition-colors hover:border-primary/60 hover:text-primary"
                  aria-label={`Копіювати IP сервера: ${SERVER_IP}`}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                  ) : (
                    <Copy className="h-4 w-4" aria-hidden="true" />
                  )}
                  {copied ? 'Скопійовано!' : SERVER_IP}
                </button>

                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shine flex h-8 w-8 items-center justify-center rounded-sm border border-white/20 bg-black/40 text-white/70 backdrop-blur-sm transition-colors hover:border-primary/50 hover:text-primary"
                  aria-label="Discord"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
                <a
                  href={WIKI_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shine flex h-8 w-8 items-center justify-center rounded-sm border border-white/20 bg-black/40 text-white/70 backdrop-blur-sm transition-colors hover:border-primary/50 hover:text-primary"
                  aria-label="Вікі"
                >
                  <Globe className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Nav columns */}
            <div className="grid flex-1 grid-cols-3 gap-6 lg:max-w-xl">
              {footerNav.map((col) => (
                <div key={col.title}>
                  <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-white">
                    {col.title}
                  </h3>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        {'external' in link && link.external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-white/70 transition-colors hover:text-primary"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="text-sm text-white/70 transition-colors hover:text-primary"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/15 bg-black/50 backdrop-blur-sm">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-1 px-4 py-2 text-xs text-white/60 sm:flex-row sm:px-6">
              <p>© {new Date().getFullYear()} Зловісний. Усі права захищені.</p>
              <p>Не пов&apos;язано з Mojang AB чи Microsoft.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

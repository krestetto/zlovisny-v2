'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { Menu, X, Copy, Check, ChevronDown, ExternalLink } from 'lucide-react'

const SERVER_IP = 'zlovisny.space'
const DISCORD_URL = 'https://discord.gg/fwZQX55VCF'
const WIKI_URL = 'https://zlovisny.gitbook.io/wiki'

type NavChild = { href: string; label: string; external?: boolean }
type NavItem = { href?: string; label: string; children?: NavChild[]; btnBg?: string; minW?: string; btnH?: string }

const navItems: NavItem[] = [
  { href: '/', label: 'Головна', btnBg: '/button-bg-3.png', minW: '110px', btnH: '52px' },
  { href: '/features', label: 'Особливості', btnBg: '/button-bg-3.png', minW: '140px', btnH: '52px' },
  { href: '/classes', label: 'Класи', btnBg: '/button-bg-5.png', minW: '100px', btnH: '52px' },
  {
    label: 'Світ',
    btnBg: '/button-bg-3.png',
    minW: '90px',
    btnH: '52px',
    children: [
      { href: 'https://map.zlovisny.space', label: 'Жива Мапа', external: true },
      { href: WIKI_URL, label: 'Вікі / Лор', external: true },
    ],
  },
  { href: '/store', label: 'Прохідка', btnBg: '/button-bg-4.png', minW: '110px', btnH: '52px' },
  {
    label: 'Спільнота',
    btnBg: '/button-bg-3.png',
    minW: '130px',
    btnH: '52px',
    children: [
      { href: '/rules', label: 'Правила' },
      { href: '/vote', label: 'Голосувати' },
      { href: '/recruitment', label: 'Набір в команду' },
      { href: '/support', label: 'Підтримка' },
      { href: DISCORD_URL, label: 'Discord', external: true },
    ],
  },
]

/** Official-style Discord brand glyph. */
function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 127.14 96.36"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M107.7 8.07A105.15 105.15 0 0 0 81.47 0a72.06 72.06 0 0 0-3.36 6.83 97.68 97.68 0 0 0-29.11 0A72.37 72.37 0 0 0 45.64 0a105.89 105.89 0 0 0-26.25 8.09C2.79 32.65-1.71 56.6.54 80.21a105.73 105.73 0 0 0 32.17 16.15 77.7 77.7 0 0 0 6.89-11.11 68.42 68.42 0 0 1-10.85-5.18c.91-.66 1.8-1.34 2.66-2a75.57 75.57 0 0 0 64.32 0c.87.71 1.76 1.39 2.66 2a68.68 68.68 0 0 1-10.87 5.19 77 77 0 0 0 6.89 11.1 105.25 105.25 0 0 0 32.19-16.14c2.64-27.38-4.51-51.11-18.9-72.15ZM42.45 65.69C36.18 65.69 31 60 31 53s5-12.74 11.43-12.74S54 46 53.89 53s-5.05 12.69-11.44 12.69Zm42.24 0C78.41 65.69 73.25 60 73.25 53s5-12.74 11.44-12.74S96.23 46 96.12 53s-5.04 12.69-11.43 12.69Z" />
    </svg>
  )
}

function DesktopDropdown({ item, pathname, bgImg, btnBg }: { item: NavItem; pathname: string; bgImg?: string; btnBg?: string }) {
  const [open, setOpen] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isActive = item.children?.some((c) => !c.external && c.href === pathname)

  const show = () => {
    if (timer.current) clearTimeout(timer.current)
    setOpen(true)
  }
  const hide = () => {
    timer.current = setTimeout(() => setOpen(false), 120)
  }

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <button
        className={`shine flex items-center justify-center gap-1 px-5 py-3 text-sm font-medium uppercase tracking-widest rounded-sm transition-all duration-200 hover:text-accent [text-shadow:0_1px_3px_rgba(0,0,0,0.8)] whitespace-nowrap ${
          isActive ? 'nav-active text-accent' : 'text-white'
        }`}
        style={{
          backgroundImage: btnBg ? `url('${btnBg}')` : "url('/button-bg-1.png')",
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          minWidth: item.minW,
          height: item.btnH,
        }}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {item.label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className={`absolute left-1/2 top-full z-50 w-52 -translate-x-1/2 pt-2 transition-all duration-200 ${
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-1 opacity-0'
        }`}
      >
        <div
          className="art-frame overflow-hidden rounded-md border border-primary/60 p-1" // Додано p-1
          style={
            bgImg
              ? {
                  backgroundImage: `url('${bgImg}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)', // ТРОХИ ЗАТЕМНИЛИ КАРТУ
                  backgroundBlendMode: 'overlay', // Змішування затемнення з фоном
                }
              : { backgroundColor: 'rgba(0, 0, 0, 0.3)' } // Затемнення за замовчуванням
          }
        >
          {item.children?.map((child) => {
            const isActiveChild = pathname === child.href;

            const cls = `shine group flex items-center justify-between px-4 py-3 text-sm font-medium uppercase tracking-wide transition-all duration-200 [text-shadow:0_1px_2px_rgba(0,0,0,0.8)] ${
              isActiveChild
                ? 'nav-active text-accent' // Колір акценту, який має бути червоним
                : 'text-white'
            } hover:bg-red-500/30 hover:text-white` // ЧЕРВОНА ПЛАШКА ПРИ НАВЕДЕННІ
            const inner = (
              <>
                <span>{child.label}</span>
                {child.external && (
                  <ExternalLink className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                )}
              </>
            )
            return child.external ? (
              <a
                key={child.label}
                href={child.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cls}
              >
                {inner}
              </a>
            ) : (
              <Link key={child.label} href={child.href!} className={cls}>
                {inner}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [mobileSub, setMobileSub] = useState<string | null>(null)
  const pathname = usePathname()

  // Lock body scroll while the fullscreen menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

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
    <>
      <header
        className="header-img sticky top-0 z-50 bg-transparent backdrop-blur-md"
        style={{ ['--header-img' as string]: "url('/header-bg-cosmic.png')", ['--header-img-opacity' as string]: '1' }}
      >
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4 relative">

          {/* Ліва частина: Логотип + Discord */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center justify-center flex-shrink-0 z-10">
              <Image
                src="/logo.png"
                alt="Логотип Зловісний"
                width={104}
                height={104}
                className="h-[104px] w-[104px] object-contain drop-shadow-[0_0_16px_oklch(0.52_0.22_20_/_70%)]"
              />
            </Link>

            <div className="relative group/discord">
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Приєднатися до Discord"
                className="btn-img shine inline-flex h-16 w-16 items-center justify-center rounded-md border-2 border-primary/50 bg-primary/10 text-primary transition-all hover:scale-105 hover:bg-primary hover:text-primary-foreground"
              >
                <DiscordIcon className="h-8 w-8" />
              </a>
              {/* Discord Tooltip */}
              <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-3 w-52 -translate-x-1/2 opacity-0 translate-y-1 transition-all duration-200 group-hover/discord:opacity-100 group-hover/discord:translate-y-0">
                <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-primary/60" style={{ backgroundColor: 'rgba(10,5,5,0.92)' }} />
                <div
                  className="rounded-md border border-primary/60 p-3 text-center"
                  style={{ backgroundColor: 'rgba(10,5,5,0.92)', backgroundImage: "url('/button-bg-2.png')", backgroundSize: 'cover', backgroundBlendMode: 'overlay' }}
                >
                  <DiscordIcon className="mx-auto mb-1.5 h-5 w-5 text-primary" />
                  <p className="text-xs font-bold uppercase tracking-widest text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]">Discord сервер</p>
                  <p className="mt-1 text-[11px] text-primary/80 uppercase tracking-wide">Зловісний</p>
                  <p className="mt-1.5 text-[10px] text-white/50 normal-case tracking-normal">Приєднуйся до спільноти!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Центральна частина: Навігація */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) =>
              item.children ? (
                <DesktopDropdown key={item.label} item={item} pathname={pathname} bgImg={item.label === 'Світ' ? '/button-bg-1.png' : '/button-bg-2.png'} btnBg={item.btnBg} />
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className={`shine flex items-center justify-center px-5 py-3 text-sm font-medium uppercase tracking-widest rounded-sm transition-all duration-300 hover:text-accent hover:[text-shadow:0_0_15px_oklch(0.6_0.22_18_/_80%)] whitespace-nowrap ${
                    pathname === item.href
                      ? 'nav-active text-accent [text-shadow:0_0_10px_oklch(0.6_0.22_18_/_50%)]'
                      : 'text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.8)]'
                  }`}
                  style={{
                    backgroundImage: item.btnBg ? `url('${item.btnBg}')` : undefined,
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    minWidth: item.minW,
                    height: item.btnH,
                  }}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          {/* Права частина: IP та Бургер-меню */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex relative group/ip">
              <button
                onClick={copyIp}
                className="btn-img shine group flex items-center gap-2 rounded-sm border border-primary/50 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <span className="font-mono">{SERVER_IP}</span>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
              {/* IP Tooltip */}
              <div className="pointer-events-none absolute right-0 top-full z-50 mt-3 w-56 opacity-0 translate-y-1 transition-all duration-200 group-hover/ip:opacity-100 group-hover/ip:translate-y-0">
                <div className="absolute -top-1.5 right-5 h-3 w-3 rotate-45 border-l border-t border-primary/60" style={{ backgroundColor: 'rgba(10,5,5,0.92)' }} />
                <div
                  className="rounded-md border border-primary/60 p-3 text-center"
                  style={{ backgroundColor: 'rgba(10,5,5,0.92)', backgroundImage: "url('/button-bg-2.png')", backgroundSize: 'cover', backgroundBlendMode: 'overlay' }}
                >
                  <Copy className="mx-auto mb-1.5 h-5 w-5 text-primary" />
                  <p className="text-xs font-bold uppercase tracking-widest text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]">Скопіювати IP</p>
                  <p className="mt-1 font-mono text-[11px] text-primary/80">{SERVER_IP}</p>
                  <p className="mt-1.5 text-[10px] text-white/50 normal-case tracking-normal">
                    {copied ? '✓ Скопійовано!' : 'Натисни щоб скопіювати'}
                  </p>
                </div>
              </div>
            </div>

            {/* Burger trigger */}
            <button
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-secondary/50 text-foreground transition-colors hover:border-primary/50 hover:text-primary lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Відкрити меню"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

        </div>
      </header>

      {/* Fullscreen mobile menu */}
      <div className={`mobile-menu lg:hidden ${open ? 'is-open' : ''}`}>
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Логотип Зловісний"
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
            />
            <span className="font-heading text-lg font-bold uppercase tracking-widest text-foreground">
              Зловісний
            </span>
          </div>
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-secondary/50 text-foreground"
            onClick={() => setOpen(false)}
            aria-label="Закрити меню"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label} className="border-b border-border/40">
                <button
                  onClick={() => setMobileSub(mobileSub === item.label ? null : item.label)}
                  className="flex min-h-[52px] w-full items-center justify-between rounded-sm px-3 text-base font-semibold uppercase tracking-wide text-foreground"
                >
                  {item.label}
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      mobileSub === item.label ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {mobileSub === item.label && (
                  <div className="mb-2 ml-3 flex flex-col border-l border-primary/40 pl-3">
                    {item.children.map((child) =>
                      child.external ? (
                        <a
                          key={child.label}
                          href={child.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setOpen(false)}
                          className="flex min-h-[44px] items-center gap-1.5 rounded-sm px-3 text-base text-muted-foreground transition-colors hover:text-primary"
                        >
                          {child.label}
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      ) : (
                        <Link
                          key={child.label}
                          href={child.href!}
                          onClick={() => setOpen(false)}
                          className={`flex min-h-[44px] items-center rounded-sm px-3 text-base transition-colors hover:text-primary ${
                            pathname === child.href ? 'text-primary' : 'text-muted-foreground'
                          }`}
                        >
                          {child.label}
                        </Link>
                      ),
                    )}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                onClick={() => setOpen(false)}
                className={`flex min-h-[52px] items-center border-b border-border/40 px-3 text-base font-semibold uppercase tracking-wide transition-colors hover:text-primary ${
                  pathname === item.href ? 'text-primary' : 'text-foreground'
                }`}
              >
                {item.label}
              </Link>
            ),
          )}

          <button
            onClick={copyIp}
            className="mt-6 flex min-h-[52px] items-center justify-center gap-2 rounded-md border border-primary/50 bg-primary/10 px-4 text-base font-semibold text-primary"
          >
            <span className="font-mono">{SERVER_IP}</span>
            {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
          </button>

          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex min-h-[52px] items-center justify-center gap-2 rounded-md bg-primary px-4 text-base font-bold uppercase tracking-wide text-primary-foreground"
          >
            <DiscordIcon className="h-5 w-5" />
            Discord
          </a>
        </nav>
      </div>
    </>
  )
}

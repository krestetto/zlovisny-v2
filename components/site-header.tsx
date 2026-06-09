'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useRef } from 'react'
import { Menu, X, Copy, Check, ChevronDown, ExternalLink } from 'lucide-react'

const SERVER_IP = 'play.zlovisny.space'
const DISCORD_URL = 'https://discord.gg/fwZQX55VCF'
const WIKI_URL = 'https://zlovisny.gitbook.io/wiki'

type NavChild = { href: string; label: string; external?: boolean }
type NavItem = { href?: string; label: string; children?: NavChild[] }

const navItems: NavItem[] = [
  { href: '/', label: 'Головна' },
  { href: '/features', label: 'Особливості' },
  { href: '/classes', label: 'Класи' },
  {
    label: 'Світ',
    children: [
      { href: 'https://map.zlovisny.space', label: 'Жива Мапа', external: true },
      { href: WIKI_URL, label: 'Вікі / Лор', external: true },
    ],
  },
  { href: '/store', label: 'Магазин' },
  {
    label: 'Спільнота',
    children: [
      { href: '/rules', label: 'Правила' },
      { href: '/vote', label: 'Голосувати' },
      { href: DISCORD_URL, label: 'Discord', external: true },
    ],
  },
]

/** Discord glyph (lucide has no brand icon). */
function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.317 4.369A19.79 19.79 0 0 0 16.558 3c-.2.36-.43.84-.59 1.23a18.27 18.27 0 0 0-3.937 0A12.6 12.6 0 0 0 11.44 3a19.74 19.74 0 0 0-3.762 1.369C3.92 7.92 3.18 11.38 3.5 14.79a19.93 19.93 0 0 0 5.99 3.03c.48-.66.91-1.36 1.28-2.1-.7-.26-1.37-.59-2-.98.17-.12.33-.25.49-.38a14.2 14.2 0 0 0 12.08 0c.16.13.32.26.49.38-.63.39-1.3.72-2.01.98.37.74.8 1.44 1.28 2.1a19.9 19.9 0 0 0 6-3.03c.38-3.95-.65-7.38-2.78-10.42ZM9.68 12.71c-.97 0-1.77-.89-1.77-1.99 0-1.1.78-1.99 1.77-1.99.99 0 1.79.9 1.77 1.99 0 1.1-.78 1.99-1.77 1.99Zm4.64 0c-.97 0-1.77-.89-1.77-1.99 0-1.1.78-1.99 1.77-1.99.99 0 1.79.9 1.77 1.99 0 1.1-.78 1.99-1.77 1.99Z" />
    </svg>
  )
}

function DesktopDropdown({ item, pathname }: { item: NavItem; pathname: string }) {
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
        className={`shine flex items-center gap-1 rounded-sm px-3 py-2 text-sm font-medium uppercase tracking-wide transition-all duration-200 hover:bg-secondary hover:text-foreground ${
          isActive ? 'nav-active' : 'text-muted-foreground'
        }`}
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
        <div className="art-frame overflow-hidden rounded-md border border-primary/60 bg-background/95 shadow-[0_8px_40px_oklch(0_0_0_/_60%)] backdrop-blur-md">
          {item.children?.map((child) => {
            const cls =
              'shine group flex items-center justify-between px-4 py-3 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-primary hover:pl-6 hover:text-primary-foreground'
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
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          {/* Discord icon — top-left of the header */}
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Discord"
            className="shine flex h-9 w-9 items-center justify-center rounded-sm border border-primary/40 bg-primary/10 text-primary transition-all hover:scale-110 hover:bg-primary hover:text-primary-foreground"
          >
            <DiscordIcon className="h-5 w-5" />
          </a>
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Логотип Зловісний"
              width={40}
              height={40}
              className="h-10 w-10 object-contain drop-shadow-[0_0_12px_oklch(0.52_0.22_20_/_60%)]"
            />
            <span className="hidden font-heading text-lg font-bold uppercase tracking-widest text-foreground sm:inline">
              Зловісний
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) =>
            item.children ? (
              <DesktopDropdown key={item.label} item={item} pathname={pathname} />
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                className={`shine rounded-sm px-3 py-2 text-sm font-medium uppercase tracking-wide transition-all duration-200 hover:bg-secondary hover:text-foreground ${
                  pathname === item.href ? 'nav-active' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={copyIp}
            className="shine group flex items-center gap-2 rounded-sm border border-primary/50 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <span className="font-mono">{SERVER_IP}</span>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>

        <button
          className="text-foreground lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Меню"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="flex flex-col gap-1 px-4 py-4">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    onClick={() => setMobileSub(mobileSub === item.label ? null : item.label)}
                    className="flex w-full items-center justify-between rounded-sm px-3 py-3 text-sm font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        mobileSub === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {mobileSub === item.label && (
                    <div className="ml-3 flex flex-col border-l border-primary/40 pl-3">
                      {item.children.map((child) =>
                        child.external ? (
                          <a
                            key={child.label}
                            href={child.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-1.5 rounded-sm px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                          >
                            {child.label}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : (
                          <Link
                            key={child.label}
                            href={child.href!}
                            onClick={() => setOpen(false)}
                            className={`rounded-sm px-3 py-2.5 text-sm transition-colors hover:bg-primary hover:text-primary-foreground ${
                              pathname === child.href ? 'nav-active' : 'text-muted-foreground'
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
                  className={`rounded-sm px-3 py-3 text-sm font-medium uppercase tracking-wide transition-colors hover:bg-secondary hover:text-foreground ${
                    pathname === item.href ? 'nav-active' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}
            <button
              onClick={copyIp}
              className="mt-2 flex items-center justify-center gap-2 rounded-sm border border-primary/50 bg-primary/10 px-4 py-3 text-sm font-semibold text-primary"
            >
              <span className="font-mono">{SERVER_IP}</span>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}

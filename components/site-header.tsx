'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef } from 'react'
import { Menu, X, Copy, Check, ChevronDown, ExternalLink } from 'lucide-react'

type NavChild = { href: string; label: string; external?: boolean }
type NavItem = { href?: string; label: string; children?: NavChild[] }

const navItems: NavItem[] = [
  { href: '/', label: 'Головна' },
  { href: '/features', label: 'Особливості' },
  {
    label: 'Світ',
    children: [
      { href: 'https://map.zlovisnyi.net', label: 'Жива Мапа', external: true },
      { href: 'https://wiki.zlovisnyi.net', label: 'Вікі / Лор', external: true },
    ],
  },
  { href: '/store', label: 'Магазин' },
  {
    label: 'Спільнота',
    children: [
      { href: '/rules', label: 'Правила' },
      { href: '/vote', label: 'Голосувати' },
      { href: 'https://discord.gg/zlovisnyi', label: 'Discord', external: true },
    ],
  },
]

function DesktopDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

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
        className="flex items-center gap-1 rounded-sm px-3 py-2 text-sm font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
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
        <div className="overflow-hidden rounded-md border border-primary/60 bg-background/95 shadow-[0_8px_40px_oklch(0_0_0_/_60%)] backdrop-blur-md">
          {item.children?.map((child) => {
            const cls =
              'group flex items-center justify-between px-4 py-3 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-primary hover:pl-6 hover:text-primary-foreground'
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

  const copyIp = () => {
    navigator.clipboard.writeText('play.zlovisnyi.net')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Логотип Зловісний"
            width={40}
            height={40}
            className="h-10 w-10 object-contain drop-shadow-[0_0_12px_oklch(0.52_0.22_20_/_60%)]"
          />
          <span className="font-heading text-lg font-bold uppercase tracking-widest text-foreground">
            Зловісний
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) =>
            item.children ? (
              <DesktopDropdown key={item.label} item={item} />
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                className="rounded-sm px-3 py-2 text-sm font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={copyIp}
            className="group flex items-center gap-2 rounded-sm border border-primary/50 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <span className="font-mono">play.zlovisnyi.net</span>
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
                            className="rounded-sm px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
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
                  className="rounded-sm px-3 py-3 text-sm font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {item.label}
                </Link>
              ),
            )}
            <button
              onClick={copyIp}
              className="mt-2 flex items-center justify-center gap-2 rounded-sm border border-primary/50 bg-primary/10 px-4 py-3 text-sm font-semibold text-primary"
            >
              <span className="font-mono">play.zlovisnyi.net</span>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}

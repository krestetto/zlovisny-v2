'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X, Copy, Check } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Головна' },
  { href: '/features', label: 'Особливості' },
  { href: '/store', label: 'Магазин' },
  { href: '/rules', label: 'Правила' },
  { href: '/vote', label: 'Голосувати' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

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
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-sm px-3 py-2 text-sm font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
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
          className="lg:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Меню"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-sm px-3 py-3 text-sm font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
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

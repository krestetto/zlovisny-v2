import Link from 'next/link'
import Image from 'next/image'
import { MessageCircle, Send, Globe } from 'lucide-react'

const footerNav = [
  {
    title: 'Гра',
    links: [
      { href: '/features', label: 'Особливості' },
      { href: '/rules', label: 'Правила' },
      { href: '/vote', label: 'Голосувати' },
    ],
  },
  {
    title: 'Спільнота',
    links: [
      { href: '#', label: 'Discord' },
      { href: '#', label: 'Форум' },
      { href: '#', label: 'Вікі' },
    ],
  },
  {
    title: 'Магазин',
    links: [
      { href: '/store', label: 'Ранги' },
      { href: '/store', label: 'Скрині' },
      { href: '/store', label: 'Бустери' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Логотип Зловісний"
              width={44}
              height={44}
              className="h-11 w-11 object-contain"
            />
            <span className="font-heading text-xl font-bold uppercase tracking-widest text-foreground">
              Зловісний
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Найтемніший Minecraft сервер. Зануртеся у проклятий світ, де кожна
            тінь приховує загрозу, а кожна перемога має свою ціну.
          </p>
          <div className="mt-6 flex gap-3">
            {[MessageCircle, Send, Globe].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-sm border border-border bg-secondary text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                aria-label="Соцмережа"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {footerNav.map((col) => (
          <div key={col.title}>
            <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-foreground">
              {col.title}
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} Зловісний. Усі права захищені.</p>
          <p>Не пов&apos;язано з Mojang AB чи Microsoft.</p>
        </div>
      </div>
    </footer>
  )
}

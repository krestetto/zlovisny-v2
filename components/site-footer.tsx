import Link from 'next/link'
import Image from 'next/image'
import { MessageCircle, Globe, ChevronUp } from 'lucide-react'

const DISCORD_URL = 'https://discord.gg/fwZQX55VCF'
const WIKI_URL = 'https://zlovisny.gitbook.io/wiki'

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
  return (
    <footer
      className="group relative w-full overflow-hidden border-t border-border bg-background"
      aria-label="Підвал сайту"
    >
      {/* Collapsed peek + expand on hover */}
      <div className="relative h-[140px] transition-[height] duration-700 ease-in-out group-hover:h-[620px] sm:h-[150px] sm:group-hover:h-[560px]">
        {/* Full-width image frame anchored to the bottom */}
        <div className="absolute inset-x-0 bottom-0 top-0">
          <Image
            src="/footer-frame.png"
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
          {/* Dark overlay deepens on hover so the text stays readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/10 opacity-90 transition-opacity duration-700 group-hover:from-background group-hover:via-background/90 group-hover:to-background/40" />
        </div>

        {/* Hint shown only while collapsed */}
        <div className="absolute inset-x-0 top-0 flex h-[140px] flex-col items-center justify-center gap-1 text-center transition-opacity duration-300 group-hover:pointer-events-none group-hover:opacity-0 sm:h-[150px]">
          <ChevronUp className="h-5 w-5 animate-pulse text-primary" aria-hidden="true" />
          <span className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-foreground/80">
            Наведіть, щоб відкрити
          </span>
        </div>

        {/* Footer content revealed on hover */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-end opacity-0 transition-opacity duration-500 delay-100 group-hover:pointer-events-auto group-hover:opacity-100">
          <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 pb-8 pt-10 sm:px-6 md:grid-cols-2 lg:grid-cols-5">
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
                Зловісний — Minecraft всесвіт на далекій планеті. Зануртеся у
                світ, де краса космосу межує зі стародавнім злом, а кожна
                перемога має свою ціну.
              </p>
              <div className="mt-6 flex gap-3">
                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shine flex h-10 w-10 items-center justify-center rounded-sm border border-border bg-secondary/80 text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/50 hover:text-primary"
                  aria-label="Discord"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
                <a
                  href={WIKI_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shine flex h-10 w-10 items-center justify-center rounded-sm border border-border bg-secondary/80 text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/50 hover:text-primary"
                  aria-label="Вікі"
                >
                  <Globe className="h-5 w-5" />
                </a>
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
                      {'external' in link && link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground transition-colors hover:text-primary"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground transition-colors hover:text-primary"
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

          <div className="border-t border-border/60 bg-background/60 backdrop-blur-sm">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
              <p>© {new Date().getFullYear()} Зловісний. Усі права захищені.</p>
              <p>Не пов&apos;язано з Mojang AB чи Microsoft.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

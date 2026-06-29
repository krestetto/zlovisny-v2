'use client'

import { Lock } from 'lucide-react'

const admins = [
  {
    name: 'krestetto',
    role: 'Засновник',
    bio: 'Творець серверу Зловісний. Керує розвитком сервера та архітектурою світу.',
    img: '/krest_1.gif',
    imgHover: '/krest.gif',
  },
  {
    name: 'milenk',
    role: 'Модератор',
    bio: 'Слідкує за порядком, відповідає на запитання гравців та блокує порушників.',
    img: '/milenk_1.gif',
    imgHover: '/milenk.gif',
  },
]

const openSlots = 2

export function AdminSection() {
  return (
    <section className="relative overflow-hidden border-t border-primary/15 bg-black">
      {/* Replaceable background photo — swap /home-section-bg.png for your own */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/home-section-bg.png)' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black"
        aria-hidden="true"
      />
      <div className="bg-grain absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Хто стоїть за лаштунками
          </span>
          <h2 className="mt-4 font-heading text-4xl font-black uppercase tracking-tight text-white text-balance sm:text-5xl">
            Адміністрація <span className="text-glow-crimson text-accent">проєкту</span>
          </h2>
          <p className="mt-5 text-pretty text-white/65">
            Наведіть на картку, щоб дізнатися більше про тих, хто оберігає світ
            Зловісного.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {admins.map((admin) => (
            <div
              key={admin.name}
              className="group art-frame relative aspect-[3/4] overflow-hidden rounded-md border border-primary/20 bg-white/[0.03]"
            >
              {/* Default portrait */}
              <img
                src={admin.img || '/placeholder.svg'}
                alt={`Аватар — ${admin.name}`}
                className="absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:opacity-0"
                style={{ imageRendering: 'pixelated' }}
              />
              {/* Hover portrait — fades in on hover */}
              <img
                src={admin.imgHover || '/placeholder.svg'}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full scale-110 object-cover opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100"
                style={{ imageRendering: 'pixelated' }}
              />
              {/* Permanent darkening so the hidden content reads on hover */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"
                aria-hidden="true"
              />

              {/* Hidden content — slides up + fades in on hover */}
              <div className="absolute inset-x-0 bottom-0 translate-y-6 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="inline-block rounded-sm bg-primary px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-widest text-primary-foreground">
                  {admin.role}
                </span>
                <h3 className="mt-2 font-heading text-xl font-bold uppercase tracking-wide text-white">
                  {admin.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                  {admin.bio}
                </p>
              </div>

              {/* Name shown by default (hidden on hover to make room) */}
              <div className="absolute inset-x-0 bottom-0 p-5 transition-opacity duration-300 group-hover:opacity-0">
                <h3 className="font-heading text-xl font-bold uppercase tracking-wide text-white">
                  {admin.name}
                </h3>
              </div>
            </div>
          ))}

          {/* Open slots — styled as a deliberate "to be revealed" card instead of a broken image */}
          {Array.from({ length: openSlots }).map((_, i) => (
            <div
              key={`open-slot-${i}`}
              className="art-frame relative flex aspect-[3/4] flex-col items-center justify-center gap-3 overflow-hidden rounded-md border border-dashed border-primary/25 bg-white/[0.02] text-center"
            >
              <Lock className="h-8 w-8 text-primary/50" aria-hidden="true" />
              <div>
                <h3 className="font-heading text-base font-bold uppercase tracking-wide text-white/60">
                  Вакантне місце
                </h3>
                <p className="mt-1 px-4 text-xs text-white/35">
                  Скоро тут з&apos;явиться новий член команди
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

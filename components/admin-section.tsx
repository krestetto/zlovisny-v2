'use client'

const admins = [
  {
    name: 'krestetto',
    role: 'Засновник',
    bio: 'Творець серверу Зловісний. Керує розвитком сервера та архітектурою світу.',
    img: '/admin-1.png',
    imgHover: '/admin-1-alt.png',
  },
  {
    name: '?',
    role: '?',
    bio: '?',
    img: '/admin-2.png',
    imgHover: '/admin-2-alt.png',
  },
  {
    name: '?',
    role: '?',
    bio: '?',
    img: '/admin-3.png',
    imgHover: '/admin-3-alt.png',
  },
  {
    name: '?',
    role: '?',
    bio: '?',
    img: '/admin-4.png',
    imgHover: '/admin-4-alt.png',
  },
]

export function AdminSection() {
  return (
    <section className="relative overflow-hidden border-t border-border">
      {/* Replaceable background photo — swap /home-section-bg.png for your own */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/home-section-bg.png)' }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-background/85" aria-hidden="true" />
      <div className="bg-grain absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Хто стоїть за лаштунками
          </span>
          <h2 className="mt-4 font-heading text-4xl font-black uppercase tracking-tight text-foreground text-balance sm:text-5xl">
            Адміністрація <span className="text-glow-crimson text-accent">проєкту</span>
          </h2>
          <p className="mt-5 text-pretty text-muted-foreground">
            Наведіть на картку, щоб дізнатися більше про тих, хто оберігає світ
            Зловісного.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {admins.map((admin) => (
            <div
              key={admin.name}
              className="group art-frame relative aspect-[3/4] overflow-hidden rounded-md border border-border bg-card"
            >
              {/* Default portrait */}
              <img
                src={admin.img || "/placeholder.svg"}
                alt={`Аватар — ${admin.name}`}
                className="absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:opacity-0"
                style={{ imageRendering: 'pixelated' }}
              />
              {/* Hover portrait — fades in on hover */}
              <img
                src={admin.imgHover || "/placeholder.svg"}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full scale-110 object-cover opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100"
                style={{ imageRendering: 'pixelated' }}
              />
              {/* Permanent darkening so the hidden content reads on hover */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"
                aria-hidden="true"
              />

              {/* Hidden content — slides up + fades in on hover */}
              <div className="absolute inset-x-0 bottom-0 translate-y-6 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="inline-block rounded-sm bg-primary px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-widest text-primary-foreground">
                  {admin.role}
                </span>
                <h3 className="mt-2 font-heading text-xl font-bold uppercase tracking-wide text-foreground">
                  {admin.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {admin.bio}
                </p>
              </div>

              {/* Name shown by default (hidden on hover to make room) */}
              <div className="absolute inset-x-0 bottom-0 p-5 transition-opacity duration-300 group-hover:opacity-0">
                <h3 className="font-heading text-xl font-bold uppercase tracking-wide text-foreground">
                  {admin.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

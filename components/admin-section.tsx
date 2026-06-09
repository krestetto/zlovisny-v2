'use client'

const admins = [
  {
    name: 'Морок',
    role: 'Засновник',
    bio: 'Творець всесвіту Зловісний. Керує розвитком сервера та архітектурою світу.',
  },
  {
    name: 'Вісниця',
    role: 'Головний адміністратор',
    bio: 'Стежить за порядком, балансом та справедливістю на просторах планети.',
  },
  {
    name: 'Тінь',
    role: 'Розробник',
    bio: 'Створює унікальні механіки, плагіни та класи, якими живе сервер.',
  },
  {
    name: 'Сяйво',
    role: 'Хелпер',
    bio: 'Завжди готовий допомогти новачкам зробити перші кроки у темряві.',
  },
]

export function AdminSection() {
  return (
    <section className="relative overflow-hidden border-t border-border">
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
              {/* Placeholder portrait */}
              <img
                src="/admin-avatar.png"
                alt={`Аватар — ${admin.name}`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
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

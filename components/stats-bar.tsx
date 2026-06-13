const stats = [
  { value: '50K+', label: 'Гравців' },
  { value: '120+', label: 'Унікальних босів' },
  { value: '4', label: 'Проклятих світи' },
  { value: '99.9%', label: 'Аптайм' },
]

export function StatsBar() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Cosmic background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/stats-bg.png)' }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-background/70" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 py-12 sm:px-6 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center text-center">
            <span className="font-heading text-4xl font-black text-glow-violet text-primary sm:text-5xl">
              {stat.value}
            </span>
            <span className="mt-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

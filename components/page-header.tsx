interface PageHeaderProps {
  eyebrow?: string
  title: string
  description?: string
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: 'url(/hero-bg.png)' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-background/60 to-background"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:py-28">
        {eyebrow && (
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 font-heading text-4xl font-black uppercase tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </section>
  )
}

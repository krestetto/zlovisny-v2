import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'

interface ExpandingCardProps {
  image?: string
  eyebrow?: string
  title: string
  intro: string
  details: string
  primaryHref?: string
  primaryLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
}

export function ExpandingCard({
  image = '/depths-bg.png',
  eyebrow = 'Лор світу',
  title = 'Глибини світу',
  intro,
  details,
  primaryHref = '/features',
  primaryLabel = 'Детальніше',
  secondaryHref = '/',
  secondaryLabel = 'Почати гру',
}: ExpandingCardProps) {
  return (
    <article className="group relative h-[220px] cursor-default overflow-hidden rounded-md border border-border transition-[height,box-shadow] duration-500 ease-in-out hover:h-[440px] hover:border-primary/50 hover:shadow-[0_0_40px_oklch(0.62_0.24_320_/_30%)]">
      {/* Background image with zoom-on-hover */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden="true"
      />

      {/* Dark gradient overlay for readability */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/30"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          {eyebrow}
        </span>
        <h3 className="mt-2 font-heading text-2xl font-black uppercase tracking-tight text-foreground text-balance sm:text-3xl">
          {title}
        </h3>
        <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
          {intro}
        </p>

        {/* Hidden until hover: details + buttons */}
        <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-in-out group-hover:grid-rows-[1fr] group-hover:opacity-100">
          <div className="overflow-hidden">
            <p className="mt-4 text-pretty text-sm leading-relaxed text-foreground/90">
              {details}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={primaryHref}
                className="inline-flex items-center gap-2 rounded-md border border-primary/50 bg-primary/10 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-primary transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_18px_oklch(0.62_0.24_320_/_55%)]"
              >
                {primaryLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={secondaryHref}
                className="inline-flex items-center gap-2 rounded-md border border-accent/50 bg-accent/10 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-accent transition-all hover:border-accent hover:bg-accent hover:text-accent-foreground hover:shadow-[0_0_18px_oklch(0.6_0.22_18_/_55%)]"
              >
                <Play className="h-4 w-4" />
                {secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

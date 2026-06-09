import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface FeatureSectionProps {
  eyebrow: string
  title: string
  description: string
  image: string
  href: string
  linkLabel: string
  reverse?: boolean
}

export function FeatureSection({
  eyebrow,
  title,
  description,
  image,
  href,
  linkLabel,
  reverse,
}: FeatureSectionProps) {
  return (
    <section className="border-b border-border">
      <div
        className={`mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 py-20 sm:px-6 lg:gap-16 lg:py-28 ${
          reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
        }`}
      >
        <div className="w-full lg:w-1/2">
          <div className="group relative overflow-hidden rounded-md border border-border">
            <Image
              src={image || '/placeholder.svg'}
              alt={title}
              width={800}
              height={600}
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            <div className="absolute inset-0 ring-1 ring-inset ring-primary/20" />
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {eyebrow}
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold uppercase leading-tight tracking-tight text-foreground text-balance sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
          <Link
            href={href}
            className="group mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-primary transition-colors hover:text-foreground"
          >
            {linkLabel}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}

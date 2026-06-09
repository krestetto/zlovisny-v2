'use client'

import { useEffect, useRef, useState } from 'react'
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
  const ref = useRef<HTMLDivElement | null>(null)
  const [offset, setOffset] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.2 },
    )
    io.observe(el)

    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
      setOffset((progress - 0.5) * 60)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section
      ref={ref}
      className="relative flex min-h-[85svh] items-center overflow-hidden border-b border-border"
    >
      {/* Parallax background */}
      <div
        className="absolute inset-0 scale-110 bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
          transform: `translateY(${offset}px) scale(1.15)`,
        }}
        aria-hidden="true"
      />
      {/* Directional gradient for text readability */}
      <div
        className={`absolute inset-0 ${
          reverse
            ? 'bg-gradient-to-l from-background via-background/80 to-background/10'
            : 'bg-gradient-to-r from-background via-background/80 to-background/10'
        }`}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <div
          className={`max-w-xl transition-all duration-1000 ease-out ${
            reverse ? 'ml-auto text-right' : ''
          } ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            {eyebrow}
          </span>
          <h2 className="mt-4 font-heading text-4xl font-black uppercase leading-[0.95] tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl">
            {title}
          </h2>
          <p className="mt-6 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
          <Link
            href={href}
            className={`group mt-8 inline-flex items-center gap-2 rounded-md border border-primary/50 bg-primary/10 px-6 py-3 text-sm font-bold uppercase tracking-wide text-primary backdrop-blur-sm transition-all hover:bg-primary hover:text-primary-foreground ${
              reverse ? 'flex-row-reverse' : ''
            }`}
          >
            {linkLabel}
            <ArrowRight
              className={`h-4 w-4 transition-transform ${
                reverse ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'
              }`}
            />
          </Link>
        </div>
      </div>
    </section>
  )
}

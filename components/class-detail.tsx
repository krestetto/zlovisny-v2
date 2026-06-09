'use client'

import { Play, Lock } from 'lucide-react'
import type { ClassInfo } from '@/lib/classes-data'

export function ClassDetail({ info }: { info: ClassInfo }) {
  return (
    <div className="flex flex-col gap-6 md:flex-row">
      {/* Class art */}
      <div className="relative mx-auto aspect-square w-full max-w-xs shrink-0 overflow-hidden rounded-lg border border-border md:w-64">
        <img
          src={info.image || '/placeholder.svg'}
          alt={info.locked ? 'Прихований клас' : `Арт класу ${info.name}`}
          className="h-full w-full object-cover"
          style={{ imageRendering: 'pixelated' }}
        />
        {info.locked && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70">
            <Lock className="h-10 w-10 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Lore + stats */}
      <div className="flex-1">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
          {info.title}
        </p>
        <h2 className="mt-1 font-heading text-3xl font-bold uppercase tracking-tight text-foreground">
          {info.name}
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          {info.description}
        </p>

        {/* Stats */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {info.stats.map((s) => (
            <div key={s.label}>
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <span>{s.label}</span>
                <span className="text-foreground">{s.value}</span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary shadow-[0_0_12px_oklch(0.62_0.24_320_/_60%)] transition-all duration-700"
                  style={{ width: `${s.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {!info.locked && (
          <a
            href={info.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shine mt-7 inline-flex min-h-[44px] items-center gap-2 rounded-md bg-primary px-6 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-all hover:scale-105 hover:shadow-[0_0_30px_oklch(0.62_0.24_320_/_55%)]"
          >
            <Play className="h-4 w-4" />
            Дивитися відео-огляд
          </a>
        )}
      </div>
    </div>
  )
}

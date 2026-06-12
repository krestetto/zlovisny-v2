import { NextResponse } from 'next/server'
import {
  checkCooldown,
  setCooldown,
  getClientIp,
  formatRemaining,
} from '@/lib/cooldown'

export const runtime = 'nodejs'

const FORM = 'recruitment'

const POSITIONS = ['Дизайнер', 'Тех Розробник', 'Модератор', 'Хелпер'] as const

type Body = {
  nickname?: string
  discord?: string
  age?: number | string
  position?: string
  experience?: string
  portfolio?: string
  motivation?: string
}

function clean(value: unknown, max = 1024): string {
  return String(value ?? '')
    .trim()
    .slice(0, max)
}

export async function POST(request: Request) {
  const webhook = process.env.DISCORD_RECRUITMENT_WEBHOOK_URL

  if (!webhook) {
    return NextResponse.json(
      { error: 'Вебхук не налаштовано на сервері.' },
      { status: 500 },
    )
  }

  let body: Body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Некоректні дані.' }, { status: 400 })
  }

  const nickname = clean(body.nickname, 64)
  const discord = clean(body.discord, 64)
  const ageNum = Number(body.age)
  const position = clean(body.position, 64)
  const experience = clean(body.experience)
  const portfolio = clean(body.portfolio, 512)
  const motivation = clean(body.motivation)

  // Server-side validation — mirrors the client rules.
  const errors: string[] = []
  if (!nickname) errors.push('nickname')
  if (!discord) errors.push('discord')
  if (!Number.isFinite(ageNum) || ageNum < 13) errors.push('age')
  if (!POSITIONS.includes(position as (typeof POSITIONS)[number])) errors.push('position')
  if (!experience) errors.push('experience')
  if (!motivation) errors.push('motivation')

  if (errors.length > 0) {
    return NextResponse.json(
      { error: 'Перевірте правильність заповнення полів.', fields: errors },
      { status: 422 },
    )
  }

  // Server-side 10h cooldown (IP + Discord tag) — cannot be bypassed client-side.
  const ip = getClientIp(request)
  try {
    const cd = await checkCooldown(FORM, ip, discord)
    if (cd.limited) {
      return NextResponse.json(
        {
          error: `Ви вже подавали заявку нещодавно. Спробуйте знову через ${formatRemaining(cd.retryAfterSeconds)}.`,
          retryAfterSeconds: cd.retryAfterSeconds,
        },
        { status: 429 },
      )
    }
  } catch {
    // If Redis is unreachable, fail closed-ish: allow the request but log.
    console.log('[v0] cooldown check failed for recruitment')
  }

  const embed = {
    title: '📥 Нова заявка в команду',
    description: `Кандидат подав заявку на посаду **${position}**.`,
    color: 0x2ecc71, // green — distinct from red support tickets
    fields: [
      { name: '🎮 Ігровий нікнейм', value: nickname, inline: true },
      { name: '💬 Discord', value: discord, inline: true },
      { name: '🎂 Вік', value: String(ageNum), inline: true },
      { name: '🎯 Бажана посада', value: position, inline: false },
      { name: '🛠️ Досвід', value: experience.slice(0, 1024), inline: false },
      { name: '⭐ Чому саме він/вона?', value: motivation.slice(0, 1024), inline: false },
      ...(portfolio
        ? [{ name: '🔗 Портфоліо', value: portfolio, inline: false }]
        : []),
    ],
    timestamp: new Date().toISOString(),
    footer: { text: 'Зловісний • Набір в команду' },
  }

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'Набір в команду',
        embeds: [embed],
      }),
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Discord відхилив запит. Спробуйте пізніше.' },
        { status: 502 },
      )
    }
  } catch {
    return NextResponse.json(
      { error: "Не вдалося зв'язатися з Discord." },
      { status: 502 },
    )
  }

  // Submission succeeded — start the cooldown.
  try {
    await setCooldown(FORM, ip, discord)
  } catch {
    console.log('[v0] failed to set recruitment cooldown')
  }

  return NextResponse.json({ ok: true })
}

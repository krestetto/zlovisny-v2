import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const CATEGORIES = [
  'Проблема з донатом',
  'Знайдено баг',
  'Скарга на гравця',
  'Інше',
] as const

type Body = {
  nickname?: string
  discord?: string
  category?: string
  description?: string
  evidence?: string
}

function clean(value: unknown, max = 1024): string {
  return String(value ?? '')
    .trim()
    .slice(0, max)
}

export async function POST(request: Request) {
  const webhook = process.env.DISCORD_SUPPORT_WEBHOOK_URL

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
  const category = clean(body.category, 64)
  const description = clean(body.description)
  const evidence = clean(body.evidence, 512)

  const errors: string[] = []
  if (!nickname) errors.push('nickname')
  if (!discord) errors.push('discord')
  if (!CATEGORIES.includes(category as (typeof CATEGORIES)[number])) errors.push('category')
  if (!description) errors.push('description')

  if (errors.length > 0) {
    return NextResponse.json(
      { error: 'Перевірте правильність заповнення полів.', fields: errors },
      { status: 422 },
    )
  }

  const embed = {
    title: '🎫 Новий тікет підтримки',
    description: `🚨 Категорія: **${category}**`,
    color: 0xe74c3c, // red — alarm/ticket styling
    fields: [
      { name: '🎮 Ігровий нікнейм', value: nickname, inline: true },
      { name: '💬 Discord', value: discord, inline: true },
      { name: '📂 Категорія', value: category, inline: false },
      { name: '📝 Опис проблеми', value: description.slice(0, 1024), inline: false },
      ...(evidence
        ? [{ name: '📎 Докази', value: evidence, inline: false }]
        : []),
    ],
    timestamp: new Date().toISOString(),
    footer: { text: 'Зловісний • Система підтримки' },
  }

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'Підтримка',
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

  return NextResponse.json({ ok: true })
}

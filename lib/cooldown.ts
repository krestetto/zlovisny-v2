import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
})

// 10 hours, in seconds.
export const COOLDOWN_SECONDS = 10 * 60 * 60

/**
 * Best-effort client IP from the incoming request headers.
 * On Vercel, `x-forwarded-for` is set by the platform and cannot be spoofed
 * by the client in a way that bypasses rate limiting (the platform appends
 * the real edge IP).
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    // First entry is the original client.
    return forwarded.split(',')[0].trim()
  }
  return (
    request.headers.get('x-real-ip') ??
    request.headers.get('cf-connecting-ip') ??
    'unknown'
  )
}

/** Normalize a Discord tag so trivial variations map to the same key. */
function normalizeDiscord(discord: string): string {
  return discord.trim().toLowerCase().replace(/\s+/g, '')
}

type CooldownResult =
  | { limited: false }
  | { limited: true; retryAfterSeconds: number }

/**
 * Checks whether either the IP or the Discord tag is currently on cooldown
 * for the given form. Does NOT set the cooldown — call `setCooldown` only
 * after a successful submission.
 */
export async function checkCooldown(
  form: string,
  ip: string,
  discord: string,
): Promise<CooldownResult> {
  const keys = [
    `cooldown:${form}:ip:${ip}`,
    `cooldown:${form}:discord:${normalizeDiscord(discord)}`,
  ]

  // Find the longest remaining TTL across both keys.
  const ttls = await Promise.all(keys.map((key) => redis.ttl(key)))
  const maxTtl = Math.max(...ttls.map((t) => (typeof t === 'number' ? t : -2)))

  if (maxTtl > 0) {
    return { limited: true, retryAfterSeconds: maxTtl }
  }
  return { limited: false }
}

/**
 * Records a successful submission, putting both the IP and the Discord tag
 * on cooldown for COOLDOWN_SECONDS.
 */
export async function setCooldown(
  form: string,
  ip: string,
  discord: string,
): Promise<void> {
  const stamp = Date.now().toString()
  const keys = [
    `cooldown:${form}:ip:${ip}`,
    `cooldown:${form}:discord:${normalizeDiscord(discord)}`,
  ]
  await Promise.all(
    keys.map((key) => redis.set(key, stamp, { ex: COOLDOWN_SECONDS })),
  )
}

/** Human-readable Ukrainian "X год Y хв" string from seconds. */
export function formatRemaining(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.ceil((seconds % 3600) / 60)
  const parts: string[] = []
  if (hours > 0) parts.push(`${hours} год`)
  if (minutes > 0) parts.push(`${minutes} хв`)
  return parts.length > 0 ? parts.join(' ') : 'менше хвилини'
}

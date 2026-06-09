'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

/**
 * Plays a short, quiet, eerie ambience (wind + whisper-like noise) using the
 * Web Audio API — no external audio file required. Returns a trigger function.
 */
function useEerieSound() {
  const ctxRef = useRef<AudioContext | null>(null)

  const play = () => {
    try {
      const AudioCtx =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!ctxRef.current) ctxRef.current = new AudioCtx()
      const ctx = ctxRef.current
      if (ctx.state === 'suspended') ctx.resume()

      const now = ctx.currentTime
      const duration = 2.6

      // --- Noise buffer (wind / whisper bed) ---
      const bufferSize = ctx.sampleRate * duration
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        // brownian-ish noise for a softer "wind" texture
        data[i] = (Math.random() * 2 - 1) * 0.5
      }
      const noise = ctx.createBufferSource()
      noise.buffer = buffer

      const bandpass = ctx.createBiquadFilter()
      bandpass.type = 'bandpass'
      bandpass.frequency.value = 600
      bandpass.Q.value = 0.8
      // sweep the filter to imitate a passing whisper of wind
      bandpass.frequency.linearRampToValueAtTime(1400, now + duration * 0.6)
      bandpass.frequency.linearRampToValueAtTime(300, now + duration)

      const noiseGain = ctx.createGain()
      noiseGain.gain.setValueAtTime(0, now)
      noiseGain.gain.linearRampToValueAtTime(0.05, now + 0.5) // quiet
      noiseGain.gain.linearRampToValueAtTime(0.07, now + 1.4)
      noiseGain.gain.linearRampToValueAtTime(0, now + duration)

      noise.connect(bandpass)
      bandpass.connect(noiseGain)
      noiseGain.connect(ctx.destination)

      // --- Low ominous drone ---
      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(70, now)
      osc.frequency.linearRampToValueAtTime(48, now + duration)
      const oscGain = ctx.createGain()
      oscGain.gain.setValueAtTime(0, now)
      oscGain.gain.linearRampToValueAtTime(0.06, now + 0.8)
      oscGain.gain.linearRampToValueAtTime(0, now + duration)
      osc.connect(oscGain)
      oscGain.connect(ctx.destination)

      noise.start(now)
      noise.stop(now + duration)
      osc.start(now)
      osc.stop(now + duration)
    } catch {
      /* audio not supported — fail silently */
    }
  }

  return play
}

/**
 * Global page transition.
 * On internal link clicks we show a black overlay with faintly blinking
 * "eyes in the dark" + a quiet eerie sound for ~3s, then navigate.
 */
export function PageTransition() {
  const [active, setActive] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const pendingHref = useRef<string | null>(null)
  const playEerie = useEerieSound()

  // Fade out the overlay once the new route has mounted.
  useEffect(() => {
    if (pendingHref.current) {
      const t = setTimeout(() => {
        setActive(false)
        pendingHref.current = null
      }, 150)
      return () => clearTimeout(t)
    }
  }, [pathname])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return
      }
      const anchor = (e.target as HTMLElement).closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      const target = anchor.getAttribute('target')
      if (!href || target === '_blank') return
      // Only intercept internal navigations
      if (!href.startsWith('/') || href.startsWith('//')) return
      // Ignore same-page anchors and current route
      const [path] = href.split('#')
      if (path === pathname || href.startsWith('#')) return

      // Stop Next.js <Link> from navigating immediately. We listen in the
      // capture phase so this runs BEFORE the Link's own click handler.
      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()

      // Avoid re-triggering while a transition is already running.
      if (pendingHref.current) return

      pendingHref.current = href
      setActive(true)
      playEerie()

      // Hold the dark "eyes" screen briefly before navigating.
      window.setTimeout(() => {
        router.push(href)
      }, 100)
    }

    // `true` = capture phase, so we intercept before React/Next Link handlers.
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [pathname, router, playEerie])

  return (
    <div className={`page-fade ${active ? 'is-active' : ''}`} aria-hidden={!active}>
      <div className="eyes-in-dark eyes-faint" role="presentation" />
    </div>
  )
}

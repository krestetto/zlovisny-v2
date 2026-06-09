'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'

/**
 * Global page transition.
 * On internal link clicks we show a black overlay with faintly blinking
 * "eyes in the dark" for ~3s, then navigate and fade the new page in.
 */
export function PageTransition() {
  const [active, setActive] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const pendingHref = useRef<string | null>(null)

  // Fade out the overlay once the new route has mounted.
  useEffect(() => {
    if (pendingHref.current) {
      const t = setTimeout(() => {
        setActive(false)
        pendingHref.current = null
      }, 400)
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

      e.preventDefault()
      pendingHref.current = href
      setActive(true)

      // Hold the dark "eyes" screen ~3s before navigating.
      setTimeout(() => {
        router.push(href)
      }, 3000)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [pathname, router])

  return (
    <div className={`page-fade ${active ? 'is-active' : ''}`} aria-hidden={!active}>
      <div className="eyes-faint relative h-[60vmin] w-[60vmin] max-w-2xl opacity-0">
        <Image
          src="/transition-eyes.png"
          alt=""
          fill
          sizes="60vmin"
          className="object-contain"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
    </div>
  )
}

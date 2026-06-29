'use client'

import { useEffect, useState } from 'react'

export function EdgeFrames() {
  // Span the full document height so the frames scroll WITH the page
  // (absolute positioning) instead of staying pinned to the viewport (fixed).
  const [height, setHeight] = useState<number>(0)

  useEffect(() => {
    const update = () => setHeight(document.documentElement.scrollHeight)
    update()

    window.addEventListener('resize', update)
    // The page height changes as images/fonts load and on route changes.
    const observer = new ResizeObserver(update)
    observer.observe(document.body)
    const interval = setInterval(update, 1000)

    return () => {
      window.removeEventListener('resize', update)
      observer.disconnect()
      clearInterval(interval)
    }
  }, [])

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-30 hidden md:block"
      style={{ height: height || '100%' }}
      aria-hidden="true"
    >
      {/* Left edge — a single image stretched across the FULL page height */}
      <div
        className="absolute inset-y-0 left-0 w-[90px] opacity-70 lg:w-[170px]"
        style={{
          backgroundImage: 'url(/edge-frame.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          backgroundPosition: 'left top',
        }}
      />
      {/* Right edge (mirrored) */}
      <div
        className="absolute inset-y-0 right-0 w-[90px] opacity-70 lg:w-[170px]"
        style={{
          backgroundImage: 'url(/edge-frame.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          backgroundPosition: 'left top',
          transform: 'scaleX(-1)',
        }}
      />
    </div>
  )
}

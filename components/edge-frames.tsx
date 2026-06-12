/**
 * Decorative vertical frames pinned to the far left and right edges of every
 * page. Purely cosmetic — sits behind content and never blocks interaction.
 * Width roughly matches the collapsed footer peek so it reads as a thin border.
 */
export function EdgeFrames() {
  return (
    <div className="pointer-events-none fixed inset-y-0 z-30 hidden md:block" aria-hidden="true">
      {/* Left edge */}
      <div
        className="fixed inset-y-0 left-0 w-[44px] bg-cover bg-left bg-no-repeat opacity-60 lg:w-[56px]"
        style={{ backgroundImage: 'url(/edge-frame.png)' }}
      />
      {/* Right edge (mirrored) */}
      <div
        className="fixed inset-y-0 right-0 w-[44px] bg-cover bg-right bg-no-repeat opacity-60 lg:w-[56px]"
        style={{ backgroundImage: 'url(/edge-frame.png)', transform: 'scaleX(-1)' }}
      />
    </div>
  )
}

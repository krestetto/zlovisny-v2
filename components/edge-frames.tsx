export function EdgeFrames() {
  return (
    <div className="pointer-events-none fixed inset-y-0 z-30 hidden md:block" aria-hidden="true">
      {/* Left edge */}
      <div
        className="fixed inset-y-0 left-0 w-[80px] bg-cover bg-no-repeat opacity-50 lg:w-[150px]"
        style={{
          backgroundImage: 'url(/edge-frame.png)',
          backgroundPosition: 'right center', 
        }}
      />
      {/* Right edge (mirrored) */}
      <div
        className="fixed inset-y-0 right-0 w-[80px] bg-cover bg-no-repeat opacity-50 lg:w-[150px]"
        style={{
          backgroundImage: 'url(/edge-frame.png)',
          backgroundPosition: 'right center',
          transform: 'scaleX(-1)',
        }}
      />
    </div>
  )
}
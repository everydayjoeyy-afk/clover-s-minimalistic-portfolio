import { useEffect, useRef, useState } from 'react'

// Each eye socket: 13×14. Gap of 5 between them.
const SW = 13   // socket width
const SH = 14   // socket height
const G  = 5    // gap
const R  = 3    // pupil radius
const TRAVEL = 2.5

// Absolute pupil center positions at rest
const L = { cx: SW / 2,           cy: SH / 2 }
const RT = { cx: SW + G + SW / 2, cy: SH / 2 }
const VW = SW * 2 + G

function clamp(v: number, lo: number, hi: number) {
  return Math.min(Math.max(v, lo), hi)
}

export default function PixelEyes() {
  const ref = useRef<SVGSVGElement>(null)
  const [off, setOff] = useState({ x: 0, y: 0 })
  const [blinking, setBlinking] = useState(false)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const cx = rect.left + rect.width  / 2
      const cy = rect.top  + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy) || 1
      const t = Math.min(dist / 100, 1)
      setOff({
        x: (dx / dist) * TRAVEL * t,
        y: (dy / dist) * TRAVEL * t,
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const handleClick = () => {
    if (blinking) return
    setBlinking(true)
    setTimeout(() => setBlinking(false), 350)
  }

  // Clamp each pupil within its own socket bounds
  const lx  = clamp(L.cx  + off.x, R + 1,        SW - R - 1)
  const rx2 = clamp(RT.cx + off.x, SW + G + R + 1, VW - R - 1)
  const py  = clamp(L.cy  + off.y, R + 1,        SH - R - 1)

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={handleClick}
        aria-label="i see you"
        className="flex h-[32px] w-[42px] items-center justify-center rounded-[12px] border border-line bg-gradient-to-t from-pill-from to-pill-to shadow-[0px_1px_1px_rgba(0,0,0,0.1),inset_0px_1px_2px_0px_var(--pill-highlight)] transition-transform active:scale-95"
      >
        <svg
          ref={ref}
          viewBox={`0 0 ${VW} ${SH}`}
          className="h-[13px] w-auto overflow-visible"
        >
          {/* Left socket */}
          <rect x={0} y={0} width={SW} height={SH} rx={2} fill="white" stroke="#d0d0d0" strokeWidth={0.5} />
          {/* Left pupil */}
          {blinking
            ? <rect x={1} y={SH / 2 - 1} width={SW - 2} height={2} rx={1} fill="#1a1a1a" />
            : <circle cx={lx} cy={py} r={R} fill="#1a1a1a" />
          }
          {/* Left highlight */}
          {!blinking && <circle cx={lx + 1} cy={py - 1} r={0.8} fill="white" opacity={0.7} />}

          {/* Right socket */}
          <rect x={SW + G} y={0} width={SW} height={SH} rx={2} fill="white" stroke="#d0d0d0" strokeWidth={0.5} />
          {/* Right pupil */}
          {blinking
            ? <rect x={SW + G + 1} y={SH / 2 - 1} width={SW - 2} height={2} rx={1} fill="#1a1a1a" />
            : <circle cx={rx2} cy={py} r={R} fill="#1a1a1a" />
          }
          {/* Right highlight */}
          {!blinking && <circle cx={rx2 + 1} cy={py - 1} r={0.8} fill="white" opacity={0.7} />}
        </svg>
      </button>

      <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-[8px] border border-line bg-surface-raised px-2.5 py-1 text-[11px] font-medium text-muted opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100">
        i see you
      </div>
    </div>
  )
}

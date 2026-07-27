/**
 * The hexagon tile the game itself uses to frame an icon (its `HexIconTile`
 * primitive). Here it holds the real game artwork — the same SVGs shipped in
 * the app — rather than a generic line icon, so the site and the product read
 * as one thing.
 *
 * The tile is a *tonal wax surface*, not a saturated gradient: the artwork is
 * already full-colour, so a loud tile behind it just fights for attention.
 */

/** Rounded-corner hexagon, matching the game's HUD hex. */
export function smoothHexagonPath(cx: number, cy: number, radius: number, cornerRadius: number): string {
  const angles = [270, 330, 30, 90, 150, 210].map((a) => (a * Math.PI) / 180)
  const points = angles.map((angle) => ({
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  }))

  let path = ''
  for (let i = 0; i < points.length; i++) {
    const curr = points[i]
    const next = points[(i + 1) % points.length]
    const prev = points[(i - 1 + points.length) % points.length]

    const toPrev = { x: prev.x - curr.x, y: prev.y - curr.y }
    const toNext = { x: next.x - curr.x, y: next.y - curr.y }
    const lenPrev = Math.hypot(toPrev.x, toPrev.y)
    const lenNext = Math.hypot(toNext.x, toNext.y)

    const startX = curr.x + (toPrev.x / lenPrev) * cornerRadius
    const startY = curr.y + (toPrev.y / lenPrev) * cornerRadius
    const endX = curr.x + (toNext.x / lenNext) * cornerRadius
    const endY = curr.y + (toNext.y / lenNext) * cornerRadius

    path += i === 0 ? `M ${startX} ${startY}` : ` L ${startX} ${startY}`
    path += ` Q ${curr.x} ${curr.y} ${endX} ${endY}`
  }
  return path + ' Z'
}

export type HexVariant = 'wax' | 'honey' | 'epic'

const VARIANTS: Record<HexVariant, { from: string; to: string; stroke: string }> = {
  // Warm flat wax — the default surface behind game art.
  wax: { from: '#fef3c7', to: '#fde8b0', stroke: '#f5c860' },
  // A touch richer, for the steps that carry the loop.
  honey: { from: '#fde68a', to: '#fbbf24', stroke: '#f0a715' },
  // Purple, matching the game's epic/premium variant.
  epic: { from: '#f3e8ff', to: '#e9d5ff', stroke: '#c084fc' },
}

interface HexTileProps {
  /** Rendered size in px. */
  size?: number
  variant?: HexVariant
  className?: string
  children: React.ReactNode
}

let tileSeq = 0

export function HexTile({ size = 112, variant = 'wax', className = '', children }: HexTileProps) {
  // Gradient ids must be unique per instance or the first one on the page wins.
  const uid = `hex${(tileSeq = (tileSeq + 1) % 100000)}`
  const v = VARIANTS[variant]
  const path = smoothHexagonPath(56, 56, 48, 8)

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 112 112" className="absolute inset-0 w-full h-full" aria-hidden="true">
        <defs>
          <linearGradient id={uid} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={v.from} />
            <stop offset="100%" stopColor={v.to} />
          </linearGradient>
        </defs>
        <path
          d={path}
          fill={`url(#${uid})`}
          stroke={v.stroke}
          strokeWidth="2"
          strokeLinejoin="round"
          filter="drop-shadow(0 3px 6px rgba(120, 53, 15, 0.18))"
        />
      </svg>
      <div className="relative z-10 flex items-center justify-center w-full h-full">{children}</div>
    </div>
  )
}

interface GameIconProps {
  /** File name inside `public/game/`, e.g. `hive.svg`. */
  art: string
  alt: string
  size?: number
  variant?: HexVariant
  className?: string
  /** Fraction of the tile the artwork fills. */
  inset?: number
}

export function GameIcon({ art, alt, size = 112, variant = 'wax', className = '', inset = 0.6 }: GameIconProps) {
  return (
    <HexTile size={size} variant={variant} className={className}>
      <img
        src={`${import.meta.env.BASE_URL}game/${art}`}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="object-contain drop-shadow-sm"
        style={{ width: size * inset, height: size * inset }}
      />
    </HexTile>
  )
}

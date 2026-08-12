import { APP_STORE_URL, PLAY_STORE_URL } from '../links'
import { AppleGlyph, GooglePlayGlyph } from './BrandIcons'

/**
 * Store buttons drawn as inline SVG rather than bitmap badges.
 *
 * The old `GooglePlay.webp` / `AppStore.webp` artwork had "Available soon on"
 * baked into the image, which stopped being true once Android shipped. Drawing
 * them means the label always matches reality, and they stay crisp at any size.
 *
 * Both routes are now real store listings, so the pair is symmetrical: same
 * treatment, same "Live now" status. The earlier iOS/TestFlight asymmetry is
 * gone along with the beta.
 */

interface BadgeProps {
  href: string
  glyph: React.ReactNode
  kicker: string
  label: string
}

function LiveStatus() {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700">
      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
      Live now
    </span>
  )
}

function Badge({ href, glyph, kicker, label }: BadgeProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-3 bg-black text-white rounded-xl px-5 py-3 shadow-lg
                   hover:shadow-xl hover:scale-105 active:scale-100 transition-all duration-300
                   border border-white/10"
      >
        {glyph}
        <span className="text-left leading-tight">
          <span className="block text-[10px] uppercase tracking-wide text-white/75">{kicker}</span>
          <span className="block text-lg font-semibold -mt-0.5">{label}</span>
        </span>
      </a>
      <LiveStatus />
    </div>
  )
}

export function StoreBadges() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-4 sm:gap-5">
      <Badge
        href={APP_STORE_URL}
        glyph={<AppleGlyph />}
        kicker="Download on the"
        label="App Store"
      />
      <Badge
        href={PLAY_STORE_URL}
        glyph={<GooglePlayGlyph />}
        kicker="Get it on"
        label="Google Play"
      />
    </div>
  )
}

import { PLAY_STORE_URL, TESTFLIGHT_URL } from '../links'

/**
 * Store buttons drawn as inline SVG rather than bitmap badges.
 *
 * The old `GooglePlay.webp` / `AppStore.webp` artwork had "Available soon on"
 * baked into the image, which is now wrong on both counts: Android has shipped,
 * and iOS is an open TestFlight beta rather than an App Store listing. Drawing
 * them means the label always matches reality, and they stay crisp at any size.
 *
 * The iOS route is deliberately a TestFlight button, not an App Store badge —
 * the app is not on the App Store yet, so an App Store badge would be a lie.
 */

function GooglePlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7 flex-none" aria-hidden="true">
      <path fill="#00D2FF" d="M3.6 1.8a1 1 0 0 0-.5.9v18.6a1 1 0 0 0 .5.9l.1.1L14 12.1v-.2L3.7 1.8h-.1z" />
      <path fill="#FFCE00" d="M17.4 15.5 14 12.1v-.2l3.4-3.4.1.1 4.1 2.3c1.2.7 1.2 1.8 0 2.4l-4.1 2.3z" />
      <path fill="#FF3A44" d="m17.5 15.4-3.5-3.4L3.6 22.4c.4.4 1 .5 1.8.1l12.1-6.9" />
      <path fill="#00F076" d="M17.5 8.6 5.4 1.7C4.6 1.3 4 1.3 3.6 1.8L14 12.1l3.5-3.5z" />
    </svg>
  )
}

function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7 flex-none fill-white" aria-hidden="true">
      <path d="M16.4 12.7c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.3.8-.7 0-1.7-.8-2.8-.8-1.5 0-2.8.8-3.6 2.2-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.8-.7s1.7.7 2.8.7c1.2 0 1.9-1 2.6-2.1.8-1.2 1.2-2.4 1.2-2.5-.1 0-2.2-.9-2.2-3.2ZM14.2 5.9c.6-.7 1-1.8.9-2.8-.9 0-2 .6-2.6 1.4-.6.6-1.1 1.7-.9 2.7 1 0 2-.5 2.6-1.3Z" />
    </svg>
  )
}

interface BadgeProps {
  href: string
  glyph: React.ReactNode
  kicker: string
  label: string
  status?: React.ReactNode
}

function Badge({ href, glyph, kicker, label, status }: BadgeProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-3 bg-black text-white rounded-xl px-4 py-2.5 shadow-lg
                   hover:shadow-xl hover:scale-105 active:scale-100 transition-all duration-300
                   border border-white/10"
      >
        {glyph}
        <span className="text-left leading-tight">
          <span className="block text-[10px] uppercase tracking-wide text-white/75">{kicker}</span>
          <span className="block text-lg font-semibold -mt-0.5">{label}</span>
        </span>
      </a>
      {status}
    </div>
  )
}

export function StoreBadges() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-4 sm:gap-5">
      <Badge
        href={PLAY_STORE_URL}
        glyph={<GooglePlayGlyph />}
        kicker="Get it on"
        label="Google Play"
        status={
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Live now
          </span>
        }
      />
      <Badge
        href={TESTFLIGHT_URL}
        glyph={<AppleGlyph />}
        kicker="Join the beta"
        label="TestFlight"
        status={
          // Not uppercased: `text-transform` would render "iOS" as "IOS".
          <span className="text-xs font-bold tracking-wider text-amber-600">iOS — open beta</span>
        }
      />
    </div>
  )
}

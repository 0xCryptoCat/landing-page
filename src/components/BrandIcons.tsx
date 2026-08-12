/**
 * Brand marks drawn as inline SVG.
 *
 * lucide's `Send` / `Twitter` / `Youtube` are generic UI glyphs — a paper plane
 * and the retired bird — not the platforms' actual marks, so links using them
 * read as approximations. These are the real logo shapes.
 *
 * Every path uses `fill="currentColor"`, so colour comes from the surrounding
 * `text-*` class. That is what lets the same Telegram mark sit black on the
 * light CTA and white on the dark footer without a second copy of the asset.
 */

interface IconProps {
  className?: string
}

export function TelegramIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.5 1.201-.82 1.23-.697.065-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

/** The Telegram plane alone, for placement on an existing coloured chip. */
export function TelegramPlaneIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M23.91 3.79 20.3 20.84c-.25 1.21-.98 1.5-2 .94l-5.5-4.07-2.66 2.57c-.3.3-.55.56-1.1.56-.72 0-.6-.27-.84-.95L6.3 13.7l-5.45-1.7c-1.18-.35-1.19-1.16.26-1.75l21.26-8.2c.97-.43 1.9.24 1.53 1.73z" />
    </svg>
  )
}

export function XIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export function GooglePlayGlyph({ className = 'w-7 h-7' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} flex-none`} aria-hidden="true">
      <path fill="#00D2FF" d="M3.6 1.8a1 1 0 0 0-.5.9v18.6a1 1 0 0 0 .5.9l.1.1L14 12.1v-.2L3.7 1.8h-.1z" />
      <path fill="#FFCE00" d="M17.4 15.5 14 12.1v-.2l3.4-3.4.1.1 4.1 2.3c1.2.7 1.2 1.8 0 2.4l-4.1 2.3z" />
      <path fill="#FF3A44" d="m17.5 15.4-3.5-3.4L3.6 22.4c.4.4 1 .5 1.8.1l12.1-6.9" />
      <path fill="#00F076" d="M17.5 8.6 5.4 1.7C4.6 1.3 4 1.3 3.6 1.8L14 12.1l3.5-3.5z" />
    </svg>
  )
}

export function AppleGlyph({ className = 'w-7 h-7' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} flex-none fill-white`} aria-hidden="true">
      <path d="M16.4 12.7c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.3.8-.7 0-1.7-.8-2.8-.8-1.5 0-2.8.8-3.6 2.2-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.8-.7s1.7.7 2.8.7c1.2 0 1.9-1 2.6-2.1.8-1.2 1.2-2.4 1.2-2.5-.1 0-2.2-.9-2.2-3.2ZM14.2 5.9c.6-.7 1-1.8.9-2.8-.9 0-2 .6-2.6 1.4-.6.6-1.1 1.7-.9 2.7 1 0 2-.5 2.6-1.3Z" />
    </svg>
  )
}

export function YouTubeIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12z" />
    </svg>
  )
}

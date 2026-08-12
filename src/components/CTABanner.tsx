import { useEffect, useRef, useState } from 'react'
import { APP_STORE_URL, PLAY_STORE_URL, TELEGRAM_PLAY_URL } from '../links'
import { AppleGlyph, GooglePlayGlyph, TelegramPlaneIcon } from './BrandIcons'

export function CTABanner() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 25%, #fcd34d 50%, #fbbf24 75%, #f59e0b 100%)'
      }}
    >
      {/* Hexagon pattern overlay */}
      <div className="absolute inset-0 hexagon-pattern-strong" />
      {/* Floating elements */}
      <div className="absolute top-10 left-[10%] w-4 h-4 bg-white/30 rounded-full animate-float" />
      <div className="absolute bottom-16 right-[15%] w-3 h-3 bg-white/20 rounded-full animate-float-delayed" />
      <div className="absolute top-1/3 right-[10%] w-5 h-5 bg-white/25 rounded-full animate-float" />
      <div className="absolute bottom-1/4 left-[8%] w-4 h-4 bg-white/20 rounded-full animate-float-delayed" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Headline */}
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 font-honey text-gradient-title drop-shadow-lg ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Ready to Start Your Honey Farm?
        </h2>
        
        {/* Subtext */}
        <p
          className={`text-xl text-amber-900/80 mb-8 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Free to play on iOS and Android — or right inside Telegram.
        </p>

        {/* CTA Button */}
        <div
          className={`transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* The two stores are the ask. Telegram sits alongside as a third,
              lighter-weight route rather than the headline button it used to
              be — it is the no-download fallback, not the destination. */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 bg-black text-white font-bold text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-100 transition-all duration-300"
            >
              <AppleGlyph />
              <span className="text-left leading-tight">
                <span className="block text-[10px] uppercase tracking-wide text-white/70 font-semibold">Download on the</span>
                <span className="block text-lg font-bold -mt-0.5">App Store</span>
              </span>
            </a>

            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 bg-black text-white font-bold text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-100 transition-all duration-300"
            >
              <GooglePlayGlyph />
              <span className="text-left leading-tight">
                <span className="block text-[10px] uppercase tracking-wide text-white/70 font-semibold">Get it on</span>
                <span className="block text-lg font-bold -mt-0.5">Google Play</span>
              </span>
            </a>
          </div>

          {/* Third route — Telegram, no download. */}
          <div className="mt-5">
            <a
              href={TELEGRAM_PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-telegram text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-100 transition-all duration-300"
            >
              <TelegramPlaneIcon className="w-5 h-5" />
              Play on Telegram
            </a>
            <p className="mt-2 text-sm text-amber-900/70">No download needed.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

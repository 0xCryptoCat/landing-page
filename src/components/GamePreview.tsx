import { useEffect, useRef, useState } from 'react'
import { GameIcon, type HexVariant } from './GameIcon'

type Beat = { art: string; variant: HexVariant; label: string }

const beats: Beat[] = [
  { art: 'hive.svg', variant: 'honey', label: 'Spawn bees from your Hives' },
  { art: 'colony.svg', variant: 'honey', label: 'Produce honey in the Colony' },
  { art: 'honey-manuka.svg', variant: 'wax', label: 'Unlock 10 honey types' },
  { art: 'research.svg', variant: 'wax', label: 'Research 75 farm upgrades' },
  { art: 'tanker.svg', variant: 'wax', label: 'Ship with 12 vehicle tiers' },
  { art: 'boost.svg', variant: 'honey', label: 'Stack boosts for huge output' },
  { art: 'royal-jelly.svg', variant: 'epic', label: 'Reincarnate for permanent bonuses' },
]

export function GamePreview() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [visibleBeats, setVisibleBeats] = useState<number[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          beats.forEach((_, index) => {
            setTimeout(() => {
              setVisibleBeats((prev) => [...prev, index])
            }, 160 * (index + 1))
          })
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="game-preview" ref={sectionRef} className="py-20 sm:py-28 px-4 sm:px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-5xl sm:text-5xl md:text-5xl font-bold text-center font-honey text-gradient-title mb-12 sm:mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Watch Your Farm Evolve!
        </h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Gameplay capture */}
          <div
            className={`relative flex justify-center transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center max-w-full">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                poster="/screenshots/gameplay-poster.webp"
                className="h-auto max-h-[500px] sm:max-h-[600px] max-w-full object-contain"
              >
                <source src="/screenshots/gameplay.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* The loop, in the game's own iconography */}
          <div
            className={`space-y-3 transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            {beats.map((beat, index) => (
              <div
                key={beat.label}
                className={`flex items-center gap-4 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50 transition-all duration-500 ${
                  visibleBeats.includes(index) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                }`}
              >
                <GameIcon
                  art={beat.art}
                  alt=""
                  variant={beat.variant}
                  size={48}
                  inset={0.62}
                  className="flex-shrink-0"
                />
                <span className="text-base sm:text-lg text-amber-900 font-medium min-w-0">{beat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

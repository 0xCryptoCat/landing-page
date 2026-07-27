import { useEffect, useRef, useState } from 'react'
import { Smartphone } from 'lucide-react'
import { SectionBee } from './FlyingBees'
import { GameIcon, HexTile, type HexVariant } from './GameIcon'

/**
 * Counts here come from the game's own data files (`gameBalance.json`,
 * `costs.json`) rather than from estimates: 10 honey types, 75 research items
 * (57 regular + 18 epic), 12 vehicle tiers, 5 building types.
 */
type Feature = {
  art?: string
  variant: HexVariant
  title: string
  description: string
  isSpecial?: boolean
}

const features: Feature[] = [
  {
    art: 'colony.svg',
    variant: 'honey',
    title: '5 Buildings',
    description: 'A Colony, up to 4 Hives, Storage, a Depot and a Lab — each with its own upgrade path and its own trade-offs.',
  },
  {
    art: 'honey-manuka.svg',
    variant: 'wax',
    title: '10 Honey Types',
    description: 'From Wildflower and Clover all the way to Quantum and Temporal honey. Every unlock is worth more than the last.',
  },
  {
    art: 'research.svg',
    variant: 'wax',
    title: '75 Research Upgrades',
    description: '57 regular upgrades across 13 tiers, plus 18 permanent Epic ones that survive reincarnation.',
  },
  {
    art: 'boost.svg',
    variant: 'honey',
    title: 'Stackable Boosts',
    description: 'Frenzy your hives, double your cash, auto-spawn your bees. Stack boosts to send output through the roof.',
  },
  {
    art: 'tanker.svg',
    variant: 'wax',
    title: '12 Vehicle Tiers',
    description: 'From a humble base cart to the Hexaloop tanker. Grow the fleet so shipping never becomes the bottleneck.',
  },
  {
    art: 'royal-jelly.svg',
    variant: 'epic',
    title: 'Reincarnation',
    description: 'When growth stalls, reset for Royal Jelly and permanent multipliers — then climb far faster the next time around.',
  },
  {
    variant: 'wax',
    title: 'Play Anywhere',
    description: 'Android, the iOS beta, or straight inside Telegram with no download. Your farm keeps producing while you are away.',
  },
  {
    art: 'honeycomb.svg',
    variant: 'epic',
    title: 'Play to Earn',
    description: 'A feature coming soon to Royal Jelly collectors.',
    isSpecial: true,
  },
]

export function Features() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 px-4 sm:px-6 white-section-drip relative overflow-hidden">
      <SectionBee delay={2} />

      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 mt-6 transition-all duration-700 font-honey text-gradient-title ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Everything You Need to Succeed
        </h2>
        <p
          className={`text-center text-amber-600 text-lg mb-12 sm:mb-16 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Packed with features to keep you buzzing for hours
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const isSpecial = feature.isSpecial
            return (
              <div
                key={feature.title}
                className={`group relative p-6 rounded-2xl transition-all duration-500 card-hover
                  ${
                    isSpecial
                      ? 'bg-gradient-to-br from-purple-50 to-amber-50 border-2 border-purple-300/70 hover:border-purple-400'
                      : 'bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/50 hover:border-amber-300'
                  }
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400/0 to-orange-400/0 group-hover:from-amber-400/10 group-hover:to-orange-400/10 transition-all duration-300 pointer-events-none" />

                {/* Real game artwork, framed in the game's own hexagon tile. */}
                <div className="relative mb-4 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-2">
                  {feature.art ? (
                    <GameIcon art={feature.art} alt="" variant={feature.variant} size={72} inset={0.62} />
                  ) : (
                    <HexTile size={72} variant={feature.variant}>
                      <Smartphone className="w-8 h-8 text-amber-700" strokeWidth={1.75} />
                    </HexTile>
                  )}
                </div>

                <h3 className={`relative text-xl font-bold mb-2 ${isSpecial ? 'text-purple-800' : 'text-amber-800'}`}>
                  {feature.title}
                </h3>
                <p className={`relative text-sm leading-relaxed ${isSpecial ? 'text-purple-700/80' : 'text-amber-600'}`}>
                  {feature.description}
                </p>

                {isSpecial && (
                  <div className="absolute top-3 right-3 bg-purple-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    Soon
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

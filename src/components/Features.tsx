import { useEffect, useRef, useState } from 'react'
import { 
  Building2, 
  Droplets, 
  FlaskConical, 
  Sparkles, 
  Truck, 
  RefreshCw, 
  Smartphone,
  Gem
} from 'lucide-react'
import { SectionBee } from './FlyingBees'

const features = [
  {
    icon: Building2,
    title: '5 Buildings',
    description: 'A Colony, up to 4 Hives, Storage, a Depot, and a Lab. Each with unique upgrade paths and strategy!',
    gradient: 'from-amber-400 to-yellow-400',
  },
  {
    icon: Droplets,
    title: '10+ Honey Types',
    description: 'From Clover to Manuka. Each more valuable than the last!',
    gradient: 'from-yellow-400 to-orange-400',
  },
  {
    icon: FlaskConical,
    title: '100+ Research Items',
    description: 'Common and permanent Epic research upgrades. Unlock automation, larger capacity, faster progress!',
    gradient: 'from-orange-400 to-amber-500',
  },
  {
    icon: Sparkles,
    title: 'Extra Boosts',
    description: 'A list of fancy boosts to buzz you up! Purchase a variety to increase your farm\'s output!',
    gradient: 'from-amber-500 to-yellow-500',
  },
  {
    icon: Truck,
    title: '17 Vehicle Tiers',
    description: 'From trucks to quantum transporters, manage a fleet of endless growth! Scale your shipping capacity!',
    gradient: 'from-yellow-500 to-amber-400',
  },
  {
    icon: RefreshCw,
    title: 'Reincarnation',
    description: 'Reincarnate to earn Royal Jelly. Gain permanent progress multipliers forever, and earn more cash!',
    gradient: 'from-amber-400 to-orange-400',
  },
  {
    icon: Smartphone,
    title: 'Play Anywhere',
    description: 'A Telegram Mini App, just load and farm! No download required, just tap and play.',
    gradient: 'from-orange-400 to-yellow-400',
  },
  {
    icon: Gem,
    title: 'Play to Earn',
    description: 'A feature coming soon to Royal Jelly collectors!',
    gradient: 'from-purple-400 to-pink-400',
    isSpecial: true,
  },
]

export function Features() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 px-4 sm:px-6 white-section-drip relative overflow-hidden">
      {/* Single flying bee */}
      <SectionBee delay={2} />
      
      <div className="max-w-6xl mx-auto">
        {/* Section title */}
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

        {/* Feature cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isSpecial = 'isSpecial' in feature && feature.isSpecial
            
            return (
              <div
                key={index}
                className={`group relative p-6 rounded-2xl transition-all duration-500 card-hover
                  ${isSpecial 
                    ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 hover:bg-gradient-to-br hover:from-amber-400 hover:to-orange-400 hover:border-white' 
                    : 'bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/50 hover:border-amber-300'
                  }
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Gradient overlay on hover for non-special cards */}
                {!isSpecial && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400/0 to-orange-400/0 group-hover:from-amber-400/10 group-hover:to-orange-400/10 transition-all duration-300" />
                )}
                
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-md transition-all duration-300
                    ${isSpecial 
                      ? `bg-gradient-to-br ${feature.gradient} group-hover:bg-white` 
                      : `bg-gradient-to-br ${feature.gradient} group-hover:scale-110`
                    }
                  `}
                >
                  <Icon 
                    className={`w-7 h-7 transition-all duration-300
                      ${isSpecial 
                        ? 'text-white group-hover:text-transparent group-hover:bg-gradient-to-br group-hover:from-amber-400 group-hover:to-orange-400 group-hover:bg-clip-text' 
                        : 'text-white'
                      }
                    `} 
                    strokeWidth={1.5} 
                    style={isSpecial ? { 
                      WebkitBackgroundClip: 'text',
                    } : undefined}
                  />
                </div>
                
                {/* Content */}
                <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${isSpecial ? 'text-amber-800 group-hover:text-white' : 'text-amber-800'}`}>
                  {feature.title}
                </h3>
                <p className={`text-sm leading-relaxed transition-colors duration-300 ${isSpecial ? 'text-amber-600 group-hover:text-white/90' : 'text-amber-600'}`}>
                  {feature.description}
                </p>
                
                {/* Coming soon badge for special card */}
                {isSpecial && (
                  <div className="absolute p-1 top-3 right-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full group-hover:bg-white group-hover:text-amber-500 transition-colors duration-300">
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

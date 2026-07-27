import { useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react' // add `play` if needed

const features = [
  'Spawn bees from the Hives',
  'Produce honey in the Colony',
  'Upgrade 5 unique buildings',
  'Unlock 10+ honey types',
  'Research farm upgrades',
  'Build a fleet of vehicles',
  'Earn for massive bonuses',
]

export function GamePreview() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Animate features one by one
          features.forEach((_, index) => {
            setTimeout(() => {
              setVisibleFeatures(prev => [...prev, index])
            }, 200 * (index + 1))
          })
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="game-preview"
      ref={sectionRef}
      className="py-20 sm:py-28 px-4 sm:px-6 bg-white"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section title */}
        <h2
          className={`text-5xl sm:text-5xl md:text-5xl font-bold text-center font-honey text-gradient-title mb-12 sm:mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Watch Your Farm Evolve!
        </h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Video placeholder */}
          <div
            className={`relative transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            } justify-center flex`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center w-fit">
              {/* Video element - portrait/mobile recording */}
              <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="h-auto max-h-[500px] sm:max-h-[600px] w-fit object-contain"
              >
              <source src="./screenshots/gameplay.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Feature bullets */}
          <div
            className={`space-y-4 transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50 transition-all duration-500 ${
                  visibleFeatures.includes(index)
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-4'
                }`}
              >
                <div className="flex-shrink-0 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" strokeWidth={3} />
                </div>
                <span className="text-lg text-amber-900 font-medium">{feature}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

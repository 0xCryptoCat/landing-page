import { useEffect, useRef, useState } from 'react'
import { GameIcon, type HexVariant } from './GameIcon'

type Step = {
  art: string
  variant: HexVariant
  title: string
  description: string
}

const steps: Step[] = [
  {
    art: 'hive.svg',
    variant: 'honey',
    title: 'SPAWN BEES',
    description: 'Tap a Hive to send out swarms of worker bees. Upgrade through 9 hive tiers, up to 4 at once.',
  },
  {
    art: 'colony.svg',
    variant: 'honey',
    title: 'PRODUCE HONEY',
    description: 'Bees return to the Colony and turn nectar into honey around the clock — even while you are away.',
  },
  {
    art: 'tanker.svg',
    variant: 'wax',
    title: 'SHIP & SELL',
    description: 'Load the Depot and let your fleet run the road. Every delivery turns honey into cash.',
  },
  {
    art: 'research.svg',
    variant: 'wax',
    title: 'UPGRADE & GROW',
    description: 'Reinvest in the Lab: 75 research upgrades unlock automation, capacity and speed.',
  },
  {
    art: 'royal-jelly.svg',
    variant: 'epic',
    title: 'REINCARNATE',
    description: 'When growth stalls, reincarnate for Royal Jelly and permanent multipliers that carry over forever.',
  },
]

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeStep, setActiveStep] = useState(-1)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          steps.forEach((_, index) => {
            setTimeout(() => setActiveStep(index), 400 * (index + 1))
          })
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-5xl sm:text-5xl md:text-5xl font-bold text-center mb-4 transition-all duration-700 font-honey text-gradient-title ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Simple to Play, <br /> Hard to Put Down
        </h2>
        <p
          className={`text-center text-amber-600 text-lg mb-12 sm:mb-16 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Master the honey production loop in 5 easy steps
        </p>

        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connector sits at the vertical centre of the hex tiles (56px). */}
            <div className="absolute top-14 left-0 right-0 h-1 bg-amber-200/70 rounded-full">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full transition-all duration-1000"
                style={{ width: `${Math.max(0, (activeStep + 1) / steps.length) * 100}%` }}
              />
            </div>

            <div className="grid grid-cols-5 gap-4">
              {steps.map((step, index) => {
                const isActive = index <= activeStep
                return (
                  <div
                    key={step.title}
                    className={`flex flex-col items-center text-center transition-all duration-500 ${
                      isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                  >
                    <div
                      className={`relative z-10 mb-4 transition-transform duration-500 ${
                        isActive ? 'scale-100' : 'scale-90'
                      }`}
                    >
                      <GameIcon art={step.art} alt="" variant={step.variant} size={112} />
                    </div>
                    <h3 className="text-lg font-bold text-amber-800 mb-2">{step.title}</h3>
                    <p className="text-amber-600 text-sm leading-relaxed">{step.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Mobile / tablet: vertical timeline */}
        <div className="lg:hidden">
          <div className="relative">
            <div className="absolute left-14 top-0 bottom-0 w-1 bg-amber-200/70 rounded-full">
              <div
                className="w-full bg-gradient-to-b from-amber-400 to-orange-400 rounded-full transition-all duration-1000"
                style={{ height: `${Math.max(0, (activeStep + 1) / steps.length) * 100}%` }}
              />
            </div>

            <div className="space-y-8">
              {steps.map((step, index) => {
                const isActive = index <= activeStep
                return (
                  <div
                    key={step.title}
                    className={`flex items-start gap-5 transition-all duration-500 ${
                      isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                    }`}
                  >
                    <div className="relative z-10 flex-shrink-0">
                      <GameIcon art={step.art} alt="" variant={step.variant} size={112} />
                    </div>
                    <div className="pt-4 min-w-0">
                      <h3 className="text-xl font-bold text-amber-800 mb-1">{step.title}</h3>
                      <p className="text-amber-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Entry point into the wiki. Also the homepage's only crawl path to
            /wiki/ — without an in-content link the guides would be reachable
            solely via the sitemap, which is a far weaker discovery signal. */}
        <p className="mt-14 text-center text-amber-700">
          Want the detail?{' '}
          <a
            href="/wiki/how-to-play.html"
            className="font-bold text-amber-800 underline decoration-2 underline-offset-4 hover:text-amber-900 transition-colors"
          >
            Read the full how-to-play guide
          </a>{' '}
          or browse the{' '}
          <a
            href="/wiki/"
            className="font-bold text-amber-800 underline decoration-2 underline-offset-4 hover:text-amber-900 transition-colors"
          >
            game wiki
          </a>
          .
        </p>
      </div>
    </section>
  )
}

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Image } from 'lucide-react'

const screenshots = [
  {
    src: '/screenshots/gameplay.png',
    caption: 'Watch your bee army grow',
    alt: 'Main gameplay view with bees flying',
  },
  {
    src: '/screenshots/research.png',
    caption: '100+ upgrades to unlock',
    alt: 'Research modal with upgrades',
  },
  {
    src: '/screenshots/hives.png',
    caption: 'Level up your farm',
    alt: 'Upgrade modal for hives',
  },
  {
    src: '/screenshots/vehicles.png',
    caption: 'Scale your shipping fleet',
    alt: 'Vehicle fleet at depot',
  },
  {
    src: '/screenshots/reincarnation.png',
    caption: 'Reincarnate for massive bonuses',
    alt: 'Reincarnation modal',
  },
]

export function Screenshots() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % screenshots.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex(prev => (prev - 1 + screenshots.length) % screenshots.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex(prev => (prev + 1) % screenshots.length)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
  }

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section title */}
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-bold text-center text-amber-800 mb-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          See It In Action
        </h2>
        <p
          className={`text-center text-amber-600 text-lg mb-12 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Screenshots from the game
        </p>

        {/* Phone frame carousel */}
        <div
          className={`relative transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Phone mockup */}
          <div className="max-w-sm mx-auto">
            <div className="phone-frame">
              <div className="phone-screen relative aspect-[9/16] bg-gray-900">
                {/* Screenshot placeholder */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-100 to-orange-100">
                  <div className="text-center p-4">
                    <Image className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                    <p className="text-amber-700 font-medium text-sm">
                      Add screenshot:<br />
                      <code className="text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded">
                        {screenshots[currentIndex].src}
                      </code>
                    </p>
                  </div>
                </div>
                
                {/* Actual screenshot - uncomment when images are available */}
                {/* <img 
                  src={screenshots[currentIndex].src}
                  alt={screenshots[currentIndex].alt}
                  className="w-full h-full object-cover transition-opacity duration-500"
                /> */}
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:translate-x-0 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-amber-600 hover:text-amber-800 transition-all"
            aria-label="Previous screenshot"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-0 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-amber-600 hover:text-amber-800 transition-all"
            aria-label="Next screenshot"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Caption */}
        <p className="text-center text-amber-800 font-medium text-lg mt-6">
          "{screenshots[currentIndex].caption}"
        </p>

        {/* Dots indicator */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {screenshots.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-amber-500 w-8'
                  : 'bg-amber-300 hover:bg-amber-400'
              }`}
              aria-label={`Go to screenshot ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

import { useEffect, useRef, useState } from 'react'

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
          className={`text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 transition-all duration-700 font-honey drop-shadow-lg ${
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
          Free to play. No download needed. Just tap and go.
        </p>

        {/* CTA Button */}
        <div
          className={`transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <a
            href="https://t.me/honeyincbot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-bl from-blue-300 to-telegram text-white font-bold text-xl px-10 py-5 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cta-pulse"
          >
            <div className="w-7 h-7">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
                <path fillRule="evenodd" clipRule="evenodd" fill="#FFFFFF" d="M54.3,118.8c35-15.2,58.3-25.3,70-30.2 c33.3-13.9,40.3-16.3,44.8-16.4c1,0,3.2,0.2,4.7,1.4c1.2,1,1.5,2.3,1.7,3.3s0.4,3.1,0.2,4.7c-1.8,19-9.6,65.1-13.6,86.3 c-1.7,9-5,12-8.2,12.3c-7,0.6-12.3-4.6-19-9c-10.6-6.9-16.5-11.2-26.8-18c-11.9-7.8-4.2-12.1,2.6-19.1c1.8-1.8,32.5-29.8,33.1-32.3 c0.1-0.3,0.1-1.5-0.6-2.1c-0.7-0.6-1.7-0.4-2.5-0.2c-1.1,0.2-17.9,11.4-50.6,33.5c-4.8,3.3-9.1,4.9-13,4.8 c-4.3-0.1-12.5-2.4-18.7-4.4c-7.5-2.4-13.5-3.7-13-7.9C45.7,123.3,48.7,121.1,54.3,118.8z"/>
              </svg>
            </div>
            Play Now
          </a>
        </div>

        {/* Coming soon text */}
        <p
          className={`text-amber-900/60 text-sm mt-8 mb-4 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Soon on iOS & Android
        </p>
        
        {/* App store badges */}
        <div
          className={`flex items-center justify-center gap-4 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <a 
            href="#" 
            className="cursor-not-allowed"
            onClick={(e) => e.preventDefault()}
          >
            <img 
              src="/AppStore.webp" 
              alt="Download on the App Store" 
              className="h-12 w-auto"
            />
          </a>
          <a 
            href="#" 
            className="cursor-not-allowed"
            onClick={(e) => e.preventDefault()}
          >
            <img 
              src="/GooglePlay.webp" 
              alt="Get it on Google Play" 
              className="h-12 w-auto"
            />
          </a>
        </div>
      </div>
    </section>
  )
}

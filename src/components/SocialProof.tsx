import { useEffect, useRef, useState } from 'react'
import { Users } from 'lucide-react'
import { SectionBee } from './FlyingBees'

const testimonials = [
  {
    quote: "Can't stop playing. My bee farm is insane! 👀",
    author: '@Mr4lph4',
    time: '2:34 PM',
  },
  {
    quote: 'Finally an idle game that works in Telegram',
    author: '@StaceyQueen',
    time: '3:15 AM',
  },
  {
    quote: 'The reincarnation system is so satisfying, I keep coming back for more 🍯',
    author: '@TheLover99',
    time: '4:02 PM',
  },
]

// Telegram-style message bubble with send animation
function TelegramBubble({ quote, author, time, isActive, index }: { 
  quote: string; 
  author: string; 
  time: string;
  isActive: boolean;
  index: number;
}) {
  const [isShown, setIsShown] = useState(false)
  
  useEffect(() => {
    if (isActive) {
      // Stagger each bubble appearing like they're being sent
      const timer = setTimeout(() => {
        setIsShown(true)
      }, index * 800) // 800ms between each message
      return () => clearTimeout(timer)
    }
  }, [isActive, index])
  
  return (
    <div 
      className={`transition-all duration-500 ease-out ${
        isShown ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
      }`}
    >
      <div className="relative max-w-md mx-auto">
        {/* Message bubble */}
        <div className="bg-[#E3F2FD] rounded-2xl rounded-tl-sm px-4 py-3 shadow-md border border-[#90CAF9]">
          {/* Author name */}
          <div className="text-telegram font-semibold text-sm mb-1 text-start">{author}</div>
          {/* Message text */}
          <p className="text-gray-800 text-lg text-start pl-5">{quote}</p>
          {/* Timestamp */}
          <div className="flex justify-end mt-1">
            <span className="text-gray-500 text-xs">{time}</span>
          </div>
        </div>
        {/* Bubble tail */}
        <div 
          className="absolute -left-2 top-0 w-4 h-4 bg-[#E3F2FD] border-t border-[#90CAF9]"
          style={{
            clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
          }}
        />
      </div>
    </div>
  )
}

export function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [playerCount, setPlayerCount] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Animate player count. 20k+ is the onboarded-player figure the
          // company reports; keep the two in step if that number moves.
          const target = 20000
          const duration = 1500
          const steps = 6
          const increment = target / steps
          let current = 0
          
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              setPlayerCount(target)
              clearInterval(timer)
            } else {
              setPlayerCount(Math.floor(current))
            }
          }, duration / steps)
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
    <section ref={sectionRef} className="py-20 sm:py-28 px-4 sm:px-6 white-section-drip relative overflow-hidden">
      {/* Single flying bee - positioned in fixed-height container to prevent layout shifts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ contain: 'layout' }}>
        <SectionBee delay={5} />
      </div>
      
      <div className="max-w-4xl mx-auto text-center">
        {/* Section title */}
        <h2
          className={`text-5xl sm:text-5xl sm:mt-5 md:text-5xl font-bold mb-12 mt-8 transition-all duration-700 font-honey text-gradient-title ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          What Players Say
        </h2>

        {/* Telegram-style message bubbles */}
        <div
          className={`space-y-4 mb-12 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {testimonials.map((testimonial, index) => (
            <TelegramBubble
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              time={testimonial.time}
              isActive={isVisible}
              index={index}
            />
          ))}
        </div>

        {/* Player count badge */}
        <div
          className={`inline-flex items-center gap-3 bg-gradient-to-r from-amber-100 to-orange-100 px-8 py-4 rounded-full border border-amber-200 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <Users className="w-6 h-6 text-amber-600" />
          <span className="text-xl font-bold text-amber-800">
            {playerCount.toLocaleString()}+ players onboarded
          </span>
        </div>
      </div>
    </section>
  )
}

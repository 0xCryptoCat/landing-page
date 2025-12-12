import { ChevronDown } from 'lucide-react'
import { FlyingBees } from './FlyingBees'
import { CountdownTimer } from './CountdownTimer'

export function Hero() {
  const scrollToContent = () => {
    document.getElementById('game-preview')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hexagon-pattern-strong">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-100/70 via-yellow-50/50 to-orange-100/70" />
      
      {/* Floating honey drops */}
      <div className="absolute top-20 left-[10%] w-3 h-3 bg-amber-400 rounded-full animate-float opacity-60" />
      <div className="absolute top-40 right-[15%] w-2 h-2 bg-yellow-400 rounded-full animate-float-delayed opacity-50" />
      <div className="absolute bottom-32 left-[20%] w-4 h-4 bg-orange-400 rounded-full animate-float opacity-40" />
      <div className="absolute top-1/3 right-[8%] w-2 h-2 bg-amber-500 rounded-full animate-float-delayed opacity-50" />
      <div className="absolute bottom-1/4 right-[25%] w-3 h-3 bg-yellow-500 rounded-full animate-float opacity-45" />
      
      {/* Multiple flying bees across screen */}
      <FlyingBees count={5} minSize={28} maxSize={44} minDuration={10} maxDuration={18} />

      {/* Main content */}
      <div className="relative z-20 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-7xl sm:text-7xl md:text-8xl font-bold tracking-wide font-honey text-gradient-title">
            Honey, Inc.
          </h1>
        </div>
        
        {/* Subheadline */}
        <p className="text-base sm:text-lg md:text-xl text-amber-700 mb-6 max-w-2xl mx-auto animate-fade-in animation-delay-200 font-display">
          An idle game where bees make you rich.
        </p>

        {/* Countdown Timer */}
        <div className="mb-6 sm:mb-8 animate-fade-in animation-delay-300">
          <CountdownTimer />
        </div>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 sm:mb-12 animate-fade-in animation-delay-400">
          <a
            href="https://t.me/honeyincbot/play"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-bl from-blue-300 to-telegram text-white font-bold text-lg sm:text-xl px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cta-pulse"
          >
            <div className="w-8 h-8">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
                <path fillRule="evenodd" clipRule="evenodd" fill="#FFFFFF" d="M54.3,118.8c35-15.2,58.3-25.3,70-30.2 c33.3-13.9,40.3-16.3,44.8-16.4c1,0,3.2,0.2,4.7,1.4c1.2,1,1.5,2.3,1.7,3.3s0.4,3.1,0.2,4.7c-1.8,19-9.6,65.1-13.6,86.3 c-1.7,9-5,12-8.2,12.3c-7,0.6-12.3-4.6-19-9c-10.6-6.9-16.5-11.2-26.8-18c-11.9-7.8-4.2-12.1,2.6-19.1c1.8-1.8,32.5-29.8,33.1-32.3 c0.1-0.3,0.1-1.5-0.6-2.1c-0.7-0.6-1.7-0.4-2.5-0.2c-1.1,0.2-17.9,11.4-50.6,33.5c-4.8,3.3-9.1,4.9-13,4.8 c-4.3-0.1-12.5-2.4-18.7-4.4c-7.5-2.4-13.5-3.7-13-7.9C45.7,123.3,48.7,121.1,54.3,118.8z"/>
              </svg>
            </div>
            Play Now on Telegram
          </a>
        </div>

        {/* Learn more scroll indicator */}
        <button
          onClick={scrollToContent}
          className="inline-flex flex-col items-center text-amber-600 hover:text-amber-800 transition-colors animate-bounce cursor-pointer"
        >
          <span className="text-sm font-medium mb-1">Learn More</span>
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}

import { ChevronDown } from 'lucide-react'
import { FlyingBees } from './FlyingBees'
import { TELEGRAM_PLAY_URL } from '../links'
import { StoreBadges } from './StoreBadges'

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

        {/* Store availability. Android has shipped, iOS is in open beta — each
            badge carries its own status so neither overstates the other. */}
        <div className="mb-10 sm:mb-12 animate-fade-in animation-delay-300">
          <p className="text-amber-700 text-lg sm:text-xl mb-5 font-display font-semibold">
            Out now on Android. iOS in open beta.
          </p>
          <StoreBadges />
          <p className="mt-6 text-amber-600 text-sm sm:text-base">
            Or{' '}
            <a
              href={TELEGRAM_PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-telegram underline decoration-2 underline-offset-2 hover:text-amber-800 transition-colors"
            >
              play instantly on Telegram
            </a>{' '}
            — no download needed.
          </p>
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

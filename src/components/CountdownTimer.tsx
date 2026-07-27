import { useState, useEffect } from 'react'

interface TimeLeft {
  weeks: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

// March 1st, 2026 at midnight UTC
const TARGET_DATE = new Date('2026-03-01T00:00:00Z').getTime()

function calculateTimeLeft(): TimeLeft {
  const now = Date.now()
  const difference = TARGET_DATE - now

  if (difference <= 0) {
    return { weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  const totalSeconds = Math.floor(difference / 1000)
  const totalMinutes = Math.floor(totalSeconds / 60)
  const totalHours = Math.floor(totalMinutes / 60)
  const totalDays = Math.floor(totalHours / 24)
  const weeks = Math.floor(totalDays / 7)
  const days = totalDays % 7
  const hours = totalHours % 24
  const minutes = totalMinutes % 60
  const seconds = totalSeconds % 60

  return { weeks, days, hours, minutes, seconds }
}

function padNumber(num: number): string {
  return num.toString().padStart(2, '0')
}

interface TimeUnitProps {
  value: number
  label: string
  isLast?: boolean
}

function TimeUnit({ value, label, isLast = false }: TimeUnitProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {/* Digit container with title gradient background */}
        <div className="countdown-box-gradient rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-3 shadow-lg border border-amber-600/40">
          <span className="font-mono text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-wider tabular-nums drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
            {padNumber(value)}
          </span>
        </div>
        {/* Subtle shine effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-lg pointer-events-none" style={{ height: '40%' }} />
      </div>
      <span className="text-[10px] sm:text-xs md:text-sm text-amber-700/80 font-medium mt-1 uppercase tracking-wider">
        {label}
      </span>
      {/* Separator colon */}
      {!isLast && (
        <span className="absolute -right-1.5 sm:-right-2 top-1/2 -translate-y-1/2 text-amber-600/60 font-bold text-lg sm:text-xl md:text-2xl hidden">:</span>
      )}
    </div>
  )
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="flex flex-col items-center gap-2 sm:gap-3">
        <p className="text-xs sm:text-sm md:text-base text-amber-600 font-medium tracking-wide uppercase">
          🚀 Official Launch In
        </p>
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
          {['Weeks', 'Days', 'Hours', 'Mins', 'Secs'].map((label, i) => (
            <TimeUnit key={label} value={0} label={label} isLast={i === 4} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-2 sm:gap-3 animate-fade-in">
      
      {/* Timer digits */}
      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 relative">
        <TimeUnit value={timeLeft.weeks} label="Weeks" />
        <span className="text-amber-600/50 font-light text-lg sm:text-xl md:text-2xl self-start mt-2 sm:mt-3 md:mt-4">:</span>
        <TimeUnit value={timeLeft.days} label="Days" />
        <span className="text-amber-600/50 font-light text-lg sm:text-xl md:text-2xl self-start mt-2 sm:mt-3 md:mt-4">:</span>
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <span className="text-amber-600/50 font-light text-lg sm:text-xl md:text-2xl self-start mt-2 sm:mt-3 md:mt-4">:</span>
        <TimeUnit value={timeLeft.minutes} label="Mins" />
        <span className="text-amber-600/50 font-light text-lg sm:text-xl md:text-2xl self-start mt-2 sm:mt-3 md:mt-4">:</span>
        <TimeUnit value={timeLeft.seconds} label="Secs" />
      </div>

      <p className="text-xs sm:text-sm md:text-base text-amber-700 font-medium tracking-wide uppercase flex items-center gap-2">
        <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse" />
        Join before the Honey runs out!
      </p>
    </div>
  )
}

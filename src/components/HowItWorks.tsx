import { useEffect, useRef, useState } from 'react'
import { FlaskConical, Truck, RefreshCw, Home, Egg } from 'lucide-react'

const steps = [
  {
    icon: Egg,
    title: 'SPAWN BEES',
    description: 'Tap to create swarms of worker bees from your Hives!',
    gradientId: 'hexGradient-yellow',
  },
  {
    icon: Home,
    title: 'PRODUCE HONEY',
    description: 'Bees gather in the Colony and produce sweet honey!',
    gradientId: 'hexGradient-amber',
  },
  {
    icon: Truck,
    title: 'SHIP & SELL',
    description: 'The fleet of vehicles ship your honey for cash!',
    gradientId: 'hexGradient-orange',
  },
  {
    icon: FlaskConical,
    title: 'UPGRADE & GROW',
    description: 'Reinvest profits to unlock powerful upgrades and new buildings!',
    gradientId: 'hexGradient-brown',
  },
  {
    icon: RefreshCw,
    title: 'REINCARNATE',
    description: 'When your farm gets hard to grow further, reincarnate to earn Royal Jellies and progress beyond!',
    gradientId: 'hexGradient-purple',
  },
]

// Create smooth rounded hexagon path (matching game's HUD style)
function createSmoothHexagonPath(cx: number, cy: number, radius: number, cornerRadius: number): string {
  const angles = [270, 330, 30, 90, 150, 210].map(a => (a * Math.PI) / 180);
  const points = angles.map(angle => ({
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle)
  }));
  
  let path = '';
  for (let i = 0; i < points.length; i++) {
    const curr = points[i];
    const next = points[(i + 1) % points.length];
    const prev = points[(i - 1 + points.length) % points.length];
    
    const toPrev = { x: prev.x - curr.x, y: prev.y - curr.y };
    const toNext = { x: next.x - curr.x, y: next.y - curr.y };
    const lenPrev = Math.sqrt(toPrev.x * toPrev.x + toPrev.y * toPrev.y);
    const lenNext = Math.sqrt(toNext.x * toNext.x + toNext.y * toNext.y);
    
    const unitPrev = { x: toPrev.x / lenPrev, y: toPrev.y / lenPrev };
    const unitNext = { x: toNext.x / lenNext, y: toNext.y / lenNext };
    
    const startX = curr.x + unitPrev.x * cornerRadius;
    const startY = curr.y + unitPrev.y * cornerRadius;
    const endX = curr.x + unitNext.x * cornerRadius;
    const endY = curr.y + unitNext.y * cornerRadius;
    
    if (i === 0) {
      path = `M ${startX} ${startY}`;
    } else {
      path += ` L ${startX} ${startY}`;
    }
    path += ` Q ${curr.x} ${curr.y} ${endX} ${endY}`;
  }
  path += ' Z';
  return path;
}

// Hexagon shape component - matches game's HUD hexagon style with SVG gradients
function HexagonShape({ children, gradientId, isActive, uniqueId }: { children: React.ReactNode; gradientId: string; isActive: boolean; uniqueId: string }) {
  const hexPath = createSmoothHexagonPath(56, 56, 48, 8);
  // Create unique IDs for this instance's gradients
  const amberGradId = `hexGradient-amber-${uniqueId}`;
  const yellowGradId = `hexGradient-yellow-${uniqueId}`;
  const orangeGradId = `hexGradient-orange-${uniqueId}`;
  const brownGradId = `hexGradient-brown-${uniqueId}`;
  const purpleGradId = `hexGradient-purple-${uniqueId}`;
  const highlightId = `hexHighlight-${uniqueId}`;
  
  // Map the gradientId to the unique ID
  const gradientMap: Record<string, string> = {
    'hexGradient-amber': amberGradId,
    'hexGradient-yellow': yellowGradId,
    'hexGradient-orange': orangeGradId,
    'hexGradient-brown': brownGradId,
    'hexGradient-purple': purpleGradId,
  };
  const actualGradientId = gradientMap[gradientId] || amberGradId;
  
  return (
    <div className={`relative transition-all duration-300 ${isActive ? 'scale-100' : 'scale-90'}`}>
      <div className="w-28 h-28 relative flex items-center justify-center">
        {/* SVG Hexagon with gradient fill - matching game HUD */}
        <svg
          width="112"
          height="112"
          viewBox="0 0 112 112"
          className="absolute inset-0"
        >
          <defs>
            {/* Amber gradient */}
            <linearGradient id={amberGradId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            {/* Yellow gradient */}
            <linearGradient id={yellowGradId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="50%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
            {/* Orange gradient */}
            <linearGradient id={orangeGradId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="50%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
            {/* Orange-Brown gradient */}
            <linearGradient id={brownGradId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="50%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#c2410c" />
            </linearGradient>
            {/* Purple gradient */}
            <linearGradient id={purpleGradId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
            {/* Highlight overlay */}
            <linearGradient id={highlightId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.35)" />
              <stop offset="50%" stopColor="rgba(255, 255, 255, 0.1)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </linearGradient>
          </defs>
          
          {/* Main hexagon fill */}
          <path
            d={hexPath}
            fill={`url(#${actualGradientId})`}
            stroke="#fcd34d"
            strokeWidth="2"
            strokeLinejoin="round"
            filter="drop-shadow(0 4px 6px rgba(0,0,0,0.25))"
          />
          
          {/* Highlight overlay for 3D effect */}
          <path
            d={hexPath}
            fill={`url(#${highlightId})`}
            stroke="none"
          />
        </svg>
        
        {/* Icon centered */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          {children}
        </div>
        
        {/* Shine effect */}
        <div className="absolute top-6 left-8 w-4 h-4 bg-white/50 rounded-full blur-sm pointer-events-none" />
      </div>
    </div>
  )
}

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeStep, setActiveStep] = useState(-1)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Animate steps one by one
          steps.forEach((_, index) => {
            setTimeout(() => {
              setActiveStep(index)
            }, 400 * (index + 1))
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
      ref={sectionRef}
      className="py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section title */}
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 transition-all duration-700 font-honey text-gradient-title ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Simple to Play, Hard to Put Down
        </h2>
        <p
          className={`text-center text-amber-600 text-lg mb-12 sm:mb-16 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Master the honey production loop in 5 easy steps
        </p>

        {/* Desktop: Horizontal timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connector line - positioned at center of hexagon (56px from top) */}
            <div className="absolute top-14 left-0 right-0 h-1 bg-gray-200 rounded-full">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full transition-all duration-1000"
                style={{ width: `${Math.max(0, (activeStep + 1) / steps.length) * 100}%` }}
              />
            </div>

            <div className="grid grid-cols-5 gap-4">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isActive = index <= activeStep
                
                return (
                  <div
                    key={index}
                    className={`flex flex-col items-center text-center transition-all duration-500 ${
                      isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                  >
                    {/* Hexagon Icon */}
                    <div className="relative z-10 mb-4">
                      <HexagonShape gradientId={step.gradientId} isActive={isActive} uniqueId={`desktop-${index}`}>
                        <Icon className="w-12 h-12 text-white drop-shadow-md" strokeWidth={1.5} />
                      </HexagonShape>
                    </div>
                    
                    <h3 className="text-lg font-bold text-amber-800 mb-2">{step.title}</h3>
                    <p className="text-amber-600 text-sm leading-relaxed">{step.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet: Vertical timeline */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Vertical connector line - centered on hexagon (56px from left edge) */}
            <div className="absolute left-14 top-0 bottom-0 w-1 bg-gray-200 rounded-full">
              <div
                className="w-full bg-gradient-to-b from-amber-400 to-orange-400 rounded-full transition-all duration-1000"
                style={{ height: `${Math.max(0, (activeStep + 1) / steps.length) * 100}%` }}
              />
            </div>

            <div className="space-y-8">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isActive = index <= activeStep
                
                return (
                  <div
                    key={index}
                    className={`flex items-start gap-6 transition-all duration-500 ${
                      isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                    }`}
                  >
                    {/* Hexagon Icon - smaller for mobile */}
                    <div className="relative z-10 flex-shrink-0">
                      <HexagonShape gradientId={step.gradientId} isActive={isActive} uniqueId={`mobile-${index}`}>
                        <Icon className="w-10 h-10 text-white drop-shadow-md" strokeWidth={1.5} />
                      </HexagonShape>
                    </div>
                    
                    <div className="pt-4">
                      <h3 className="text-xl font-bold text-amber-800 mb-1">{step.title}</h3>
                      <p className="text-amber-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

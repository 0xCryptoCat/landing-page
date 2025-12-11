import { useEffect, useRef, useMemo } from 'react'
import lottie, { AnimationItem } from 'lottie-web'

interface FlyingBee {
  id: number
  startY: number
  endY: number
  duration: number
  delay: number
  size: number
}

interface FlyingBeesProps {
  count?: number
  minSize?: number
  maxSize?: number
  minDuration?: number
  maxDuration?: number
}

export function FlyingBees({ 
  count = 5, 
  minSize = 32, 
  maxSize = 48,
  minDuration = 8,
  maxDuration = 15
}: FlyingBeesProps) {
  const containerRefs = useRef<(HTMLDivElement | null)[]>([])
  const animationRefs = useRef<(AnimationItem | null)[]>([])

  // Generate random bee configurations
  const bees = useMemo<FlyingBee[]>(() => {
    return Array.from({ length: count }, (_, i) => {
      const startY = Math.random() * 80 + 10 // 10-90% of container height
      const endY = startY + (Math.random() - 0.5) * 60 // Random vertical drift
      const duration = Math.random() * (maxDuration - minDuration) + minDuration
      const delay = Math.random() * duration // Stagger start times
      const size = Math.random() * (maxSize - minSize) + minSize
      
      return { id: i, startY, endY, duration, delay, size }
    })
  }, [count, minSize, maxSize, minDuration, maxDuration])

  useEffect(() => {
    // Initialize Lottie animations for each bee
    bees.forEach((_bee, index) => {
      const container = containerRefs.current[index]
      if (container && !animationRefs.current[index]) {
        animationRefs.current[index] = lottie.loadAnimation({
          container,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: '/Honeybee.json',
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
        })
      }
    })

    return () => {
      animationRefs.current.forEach(anim => {
        if (anim) anim.destroy()
      })
      animationRefs.current = []
    }
  }, [bees])

  return (
    <>
      {bees.map((bee, index) => (
        <div
          key={bee.id}
          className="absolute pointer-events-none z-10"
          style={{
            top: `${bee.startY}%`,
            left: '-60px',
            width: `${bee.size}px`,
            height: `${bee.size}px`,
            animation: `flyBee${bee.id} ${bee.duration}s linear infinite`,
            animationDelay: `${bee.delay}s`,
          }}
        >
          <div 
            ref={el => { containerRefs.current[index] = el }}
            className="w-full h-full"
            style={{ transform: 'scaleX(-1)' }} // Face right
          />
        </div>
      ))}
      
      {/* Dynamic keyframes for each bee */}
      <style>
        {bees.map(bee => {
          const midY1 = bee.startY + (bee.endY - bee.startY) * 0.25 + (Math.random() - 0.5) * 20
          const midY2 = bee.startY + (bee.endY - bee.startY) * 0.5 + (Math.random() - 0.5) * 20
          const midY3 = bee.startY + (bee.endY - bee.startY) * 0.75 + (Math.random() - 0.5) * 20
          
          return `
            @keyframes flyBee${bee.id} {
              0% {
                left: -60px;
                top: ${bee.startY}%;
                opacity: 0;
              }
              5% {
                opacity: 1;
              }
              25% {
                left: 25vw;
                top: ${midY1}%;
              }
              50% {
                left: 50vw;
                top: ${midY2}%;
              }
              75% {
                left: 75vw;
                top: ${midY3}%;
              }
              95% {
                opacity: 1;
              }
              100% {
                left: calc(100vw + 60px);
                top: ${bee.endY}%;
                opacity: 0;
              }
            }
          `
        }).join('\n')}
      </style>
    </>
  )
}

// Single bee for section dividers
interface SectionBeeProps {
  delay?: number
}

export function SectionBee({ delay = 0 }: SectionBeeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<AnimationItem | null>(null)

  const beeConfig = useMemo(() => ({
    startY: Math.random() * 60 + 20,
    endY: Math.random() * 60 + 20,
    duration: Math.random() * 5 + 10,
    size: Math.random() * 16 + 28,
  }), [])

  useEffect(() => {
    if (containerRef.current && !animationRef.current) {
      animationRef.current = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/Honeybee.json',
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      })
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.destroy()
        animationRef.current = null
      }
    }
  }, [])

  const midY1 = beeConfig.startY + (Math.random() - 0.5) * 30
  const midY2 = beeConfig.endY + (Math.random() - 0.5) * 30

  return (
    <>
      <div
        className="absolute pointer-events-none z-10"
        style={{
          top: `${beeConfig.startY}%`,
          left: '-50px',
          width: `${beeConfig.size}px`,
          height: `${beeConfig.size}px`,
          animation: `sectionBee ${beeConfig.duration}s linear infinite`,
          animationDelay: `${delay}s`,
        }}
      >
        <div 
          ref={containerRef}
          className="w-full h-full"
          style={{ transform: 'scaleX(-1)' }}
        />
      </div>
      <style>
        {`
          @keyframes sectionBee {
            0% {
              left: -50px;
              top: ${beeConfig.startY}%;
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            33% {
              left: 33vw;
              top: ${midY1}%;
            }
            66% {
              left: 66vw;
              top: ${midY2}%;
            }
            90% {
              opacity: 1;
            }
            100% {
              left: calc(100vw + 50px);
              top: ${beeConfig.endY}%;
              opacity: 0;
            }
          }
        `}
      </style>
    </>
  )
}

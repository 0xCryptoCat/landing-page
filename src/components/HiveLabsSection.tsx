import { useEffect, useRef, useState } from 'react'

/** How long each panel stays on screen before the section rotates. */
const DWELL_MS = 7000

const HEX_LATTICE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffc107' fill-opacity='0.14'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"

type Panel = {
  id: string
  tab: string
  eyebrow: string
  live?: boolean
  title: React.ReactNode
  body: string
  pills: string[]
  ctaLabel: string
  ctaHref: string
}

const PANELS: Panel[] = [
  {
    id: 'studio',
    tab: 'The studio',
    eyebrow: 'From the makers',
    title: (
      <>
        {'Built by '}
        <span className="hl-accent">The Hive Labs</span>.
      </>
    ),
    body: 'The studio behind Honey, Inc. takes on client work: mobile apps, games, web platforms and crypto products, with project management and marketing in-house.',
    pills: ['Mobile apps', 'Games', 'Web & dApps'],
    ctaLabel: 'See the Lab',
    ctaHref: 'https://thehive.honeyinc.app',
  },
  {
    id: 'invest',
    tab: 'Invest in Honey',
    eyebrow: 'Investor relations',
    live: true,
    title: (
      <>
        {'The hive is growing. '}
        <span className="hl-accent">Get in early.</span>
      </>
    ),
    body: "Idle games are a $16B+ market, and nobody owns the hive. We're lining up the right people ahead of our first raise — see the opportunity and get on the list before the round opens.",
    pills: ['$16B+ idle market', 'Pre-raise', 'Deck on request'],
    ctaLabel: 'Want to invest?',
    ctaHref: 'https://thehive.honeyinc.app/investors',
  },
]

export function HiveLabsSection() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [onScreen, setOnScreen] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Only rotate while the section is actually on screen, so the panel never
  // flips past someone who isn't looking at it.
  useEffect(() => {
    const el = sectionRef.current
    if (!el || !('IntersectionObserver' in window)) {
      setOnScreen(true)
      return
    }
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), {
      threshold: 0.25,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const running = onScreen && !paused

  useEffect(() => {
    if (!running) return
    const timer = window.setTimeout(() => {
      setIndex((i) => (i + 1) % PANELS.length)
    }, DWELL_MS)
    return () => window.clearTimeout(timer)
  }, [running, index])

  return (
    <section
      ref={sectionRef}
      className="hl"
      data-paused={!running}
      aria-label="The Hive Labs"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="hl-lattice" style={{ backgroundImage: HEX_LATTICE }} aria-hidden="true" />
      <div className="hl-glow" aria-hidden="true" />

      <div className="hl-inner">
        <div className="hl-tabs" role="tablist" aria-label="The Hive Labs highlights">
          {PANELS.map((panel, i) => (
            <button
              key={panel.id}
              type="button"
              role="tab"
              id={`hl-tab-${panel.id}`}
              aria-selected={i === index}
              aria-controls={`hl-panel-${panel.id}`}
              className="hl-tab"
              onClick={() => setIndex(i)}
            >
              {panel.tab}
              {i === index && (
                // Remounting each cycle restarts the fill animation.
                <span
                  key={`${index}-${String(running)}`}
                  className="hl-tab-progress"
                  style={{ animationDuration: `${DWELL_MS}ms` }}
                  aria-hidden="true"
                />
              )}
            </button>
          ))}
        </div>

        <div className="hl-stage">
          {PANELS.map((panel, i) => {
            const active = i === index
            return (
              <div
                key={panel.id}
                className="hl-panel"
                id={`hl-panel-${panel.id}`}
                role="tabpanel"
                aria-labelledby={`hl-tab-${panel.id}`}
                aria-hidden={!active}
                data-active={active}
              >
                <div className="hl-copy">
                  <p className="hl-eyebrow hl-stagger">
                    {panel.live && <span className="hl-dot" aria-hidden="true" />}
                    {panel.eyebrow}
                  </p>
                  <h3 className="hl-title hl-stagger">{panel.title}</h3>
                  <p className="hl-body hl-stagger">{panel.body}</p>
                  <div className="hl-pills hl-stagger">
                    {panel.pills.map((pill) => (
                      <span className="hl-pill" key={pill}>
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="hl-cta-col hl-stagger">
                  <a
                    className="hl-cta"
                    href={panel.ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={active ? undefined : -1}
                  >
                    {panel.ctaLabel}
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function HiveLabsStrip() {
  return (
    <section style={{ background: '#0a0a0b' }}>
      <div
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          padding: '56px 24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '28px',
        }}
      >
        <div style={{ minWidth: '260px', flex: '1 1 320px' }}>
          <p
            style={{
              fontFamily: 'ui-monospace,SFMono-Regular,Menlo,monospace',
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#6e6e73',
              margin: '0 0 10px',
            }}
          >
            From the makers
          </p>
          <h3
            style={{
              color: '#f5f5f7',
              fontSize: 'clamp(22px,4vw,30px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            {'Built by '}
            <span
              style={{
                background: 'linear-gradient(100deg,#ffc107,#ff8f00 55%,#ff6d00)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              The Hive Labs
            </span>
            .
          </h3>
          <p
            style={{
              color: '#a1a1a6',
              margin: '12px 0 0',
              fontSize: '15px',
              maxWidth: '52ch',
              lineHeight: 1.6,
            }}
          >
            The studio behind Honey, Inc. takes on client work: mobile apps, games, web platforms
            and crypto products, with project management and marketing in-house.
          </p>
        </div>
        <a
          href="https://thehive.honeyinc.app"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: 'linear-gradient(100deg,#ffc107,#ff8f00 55%,#ff6d00)',
            color: '#1a1200',
            fontWeight: 700,
            fontSize: '16px',
            padding: '13px 28px',
            borderRadius: '980px',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Work with us
        </a>
      </div>
    </section>
  )
}

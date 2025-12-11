# Honey, Inc. - Landing Page

Marketing landing page for Honey, Inc. idle bee farming game.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lottie Web** - Bee animations
- **Lucide React** - Icons

## Project Structure

```
landing-page/
├── public/
│   ├── fonts/honey_jar/     # Custom Honey font
│   ├── screenshots/         # Game screenshots (add your own)
│   ├── Honeybee.json        # Lottie bee animation
│   └── bee.svg              # Favicon
├── src/
│   ├── components/
│   │   ├── Hero.tsx         # Hero section with CTA
│   │   ├── GamePreview.tsx  # Video + feature list
│   │   ├── HowItWorks.tsx   # 5-step timeline
│   │   ├── Features.tsx     # Feature cards grid
│   │   ├── Screenshots.tsx  # Phone mockup carousel
│   │   ├── SocialProof.tsx  # Testimonials
│   │   ├── CTABanner.tsx    # Final CTA
│   │   └── Footer.tsx       # Footer links
│   ├── App.tsx              # Main app
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── index.html               # HTML template with SEO
└── package.json
```

## Assets Needed

Before deploying, add these assets:

### Screenshots (required)
Add to `public/screenshots/`:
- `gameplay.png` - Main gameplay view
- `research.png` - Research modal
- `hives.png` - Hive upgrade modal
- `vehicles.png` - Vehicle fleet
- `reincarnation.png` - Reincarnation modal

### Social Preview (recommended)
Add to `public/`:
- `social-preview.png` (1200x630) - OG image for social sharing

### Video (optional)
Add to `public/`:
- `gameplay.mp4` - 15-30 second gameplay loop

## Customization

### Colors
Edit `tailwind.config.js` to change the color scheme:

```js
colors: {
  honey: {
    gold: '#FFC107',
    amber: '#FF8F00',
    light: '#FFF8E1',
    dark: '#5D4037',
  },
  telegram: '#0088CC',
}
```

### Links
Update these links in the components:
- Telegram bot: `https://t.me/honeyincbot`
- Community: `https://t.me/theHiveGoop`
- Channel: `https://t.me/honeyinc`

### Player Count
In `SocialProof.tsx`, update the player count target:
```js
const target = 1000 // Change to actual count
```

## Deployment

### Netlify (Recommended)
1. Push to GitHub
2. Connect repo to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### Vercel
1. Push to GitHub
2. Import project in Vercel
3. Framework preset: Vite
4. Deploy

## SEO

Meta tags are pre-configured in `index.html`. Update:
- Title and descriptions
- OG image URL after deploying
- Add favicon files

## License

Private - Honey, Inc.

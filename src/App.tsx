import { Hero } from './components/Hero'
import { GamePreview } from './components/GamePreview'
import { HowItWorks } from './components/HowItWorks'
import { Features } from './components/Features'
import { Screenshots } from './components/Screenshots'
import { SocialProof } from './components/SocialProof'
import { CTABanner } from './components/CTABanner'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      <Hero />
      <GamePreview />
      <HowItWorks />
      <Features />
      <Screenshots />
      <SocialProof />
      <CTABanner />
      <Footer />
    </div>
  )
}

export default App

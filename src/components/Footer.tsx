import { useState } from 'react'
import { Loader2, Check } from 'lucide-react'
import { TelegramIcon, XIcon, YouTubeIcon } from './BrandIcons'
import {
  APP_STORE_URL,
  PLAY_STORE_URL,
  TELEGRAM_COMMUNITY_URL,
  TELEGRAM_PLAY_URL,
  X_URL,
  YOUTUBE_URL,
} from '../links'

// Only accounts with a real url are rendered — an icon that links to "#" reads
// as a broken site. Fill a url in here and the icon appears.
const SOCIALS = [
  { label: 'Telegram', url: TELEGRAM_COMMUNITY_URL, Icon: TelegramIcon, hover: 'hover:bg-telegram' },
  { label: 'X', url: X_URL, Icon: XIcon, hover: 'hover:bg-black' },
  { label: 'YouTube', url: YOUTUBE_URL, Icon: YouTubeIcon, hover: 'hover:bg-red-600' },
].filter((s) => s.url)

// Supabase edge function URL
const SUPABASE_URL = 'https://soglsvcfkrmuujxjmvld.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvZ2xzdmNma3JtdXVqeGptdmxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzNzc4NTIsImV4cCI6MjA3ODk1Mzg1Mn0.CNiFc6S-pXvRD6k6Ri6DDVHx80EiWE9xrpbWTdw-VY0';
const NEWSLETTER_SIGNUP_URL = `${SUPABASE_URL}/functions/v1/newsletter-signup`;

export function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setStatus('error')
      setMessage('Please enter your email')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch(NEWSLETTER_SIGNUP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ email: email.trim(), source: 'landing-page-footer' }),
      })

      const data = await response.json()

      if (data.success) {
        setStatus('success')
        setMessage('Welcome to the Hive! 🐝')
        setEmail('')
        // Reset after 3 seconds
        setTimeout(() => {
          setStatus('idle')
          setMessage('')
        }, 3000)
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong')
      }
    } catch (err) {
      setStatus('error')
      setMessage('Failed to connect. Please try again.')
    }
  }

  return (
    <footer className="bg-amber-900 text-amber-100 py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Logo & Tagline */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-bold text-white font-honey mb-2">Honey, Inc.</h3>
            <p className="text-amber-400">Build your Bee Farm!</p>
          </div>

          {/* Column 2: Links */}
          <div>
            <h4 className="font-bold text-white mb-4">Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Download for iOS
                </a>
              </li>
              <li>
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Download for Android
                </a>
              </li>
              <li>
                <a
                  href={TELEGRAM_PLAY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Play on Telegram
                </a>
              </li>
              <li>
                <a
                  href={TELEGRAM_COMMUNITY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Join Community
                </a>
              </li>
              <li>
                <a href="/wiki/" className="hover:text-white transition-colors">
                  Game Wiki &amp; Guides
                </a>
              </li>
              <li>
                <a href="/privacy.html" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://thehive.honeyinc.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  The Hive Labs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors opacity-50">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Social */}
          <div>
            <h4 className="font-bold text-white mb-4">Social</h4>
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ label, url, Icon, hover }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-amber-800 ${hover} rounded-full flex items-center justify-center transition-colors`}
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="font-bold text-white mb-4">Stay Updated</h4>
            <p className="text-sm mb-3">Get notified about new features</p>
            <form className="flex gap-2" onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@beemail.com"
                disabled={status === 'loading' || status === 'success'}
                className="flex-1 px-4 py-2 rounded-lg bg-amber-800 border border-amber-700 text-white placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-amber-900 font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[70px] justify-center"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : status === 'success' ? (
                  <Check className="w-4 h-4" />
                ) : (
                  'Join'
                )}
              </button>
            </form>
            {message && (
              <p className={`text-sm mt-2 ${status === 'error' ? 'text-red-400' : 'text-green-400'}`}>
                {message}
              </p>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-amber-800 pt-8 text-center text-amber-500 text-sm">
          <p>© 2026 Honey, Inc. All rights reserved.</p>
          <p className="mt-1">Made with Buzz by the Hive Team</p>
        </div>
      </div>
    </footer>
  )
}

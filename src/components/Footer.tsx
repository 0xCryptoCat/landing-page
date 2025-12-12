import { useState } from 'react'
import { Send, Twitter, Youtube, Music2, Loader2, Check } from 'lucide-react'

// Supabase edge function URL
const NEWSLETTER_SIGNUP_URL = import.meta.env.VITE_SUPABASE_URL 
  ? `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/newsletter-signup`
  : 'https://bhwkgpgtcvpgwvedwfez.supabase.co/functions/v1/newsletter-signup';

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
        headers: { 'Content-Type': 'application/json' },
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
                  href="https://t.me/honeyincbot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Play Game
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/theHiveGoop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Join Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors opacity-50">
                  Privacy Policy
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
              <a
                href="https://t.me/honeyinc"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-amber-800 hover:bg-telegram rounded-full flex items-center justify-center transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-amber-800 hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors opacity-50"
                aria-label="Twitter (Coming Soon)"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-amber-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors opacity-50"
                aria-label="YouTube (Coming Soon)"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-amber-800 hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors opacity-50"
                aria-label="TikTok (Coming Soon)"
              >
                <Music2 className="w-5 h-5" />
              </a>
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
          <p>© 2025 Honey, Inc. All rights reserved.</p>
          <p className="mt-1">Made with Buzz by the Hive Team</p>
        </div>
      </div>
    </footer>
  )
}

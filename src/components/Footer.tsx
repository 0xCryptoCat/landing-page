import { Send, Twitter, Youtube, Music2 } from 'lucide-react'

export function Footer() {
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
            <form className="flex gap-2" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@beemail.com"
                className="flex-1 px-4 py-2 rounded-lg bg-amber-800 border border-amber-700 text-white placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-amber-900 font-bold rounded-lg transition-colors"
              >
                Join
              </button>
            </form>
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

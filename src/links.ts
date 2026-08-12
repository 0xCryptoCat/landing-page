/**
 * Every outbound destination in one place, so a store link never has to be
 * hunted down across components when a build ships.
 *
 * Status, as of the iOS release: both stores are live. The Telegram mini app
 * has been live throughout and is now the third route rather than the headline
 * one.
 *
 * The App Store link is deliberately storefront-neutral (`/app/id…` with no
 * country segment). Apple redirects it to the visitor's own storefront; a link
 * carrying `/hu/` would send every visitor to the Hungarian store and prompt
 * them to switch region.
 */
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.honeyinc.app'
export const APP_STORE_URL = 'https://apps.apple.com/app/id6763545984'
export const TELEGRAM_PLAY_URL = 'https://t.me/honeyincbot/play'
export const TELEGRAM_COMMUNITY_URL = 'https://t.me/TheHiveGoop'
export const YOUTUBE_URL = 'https://www.youtube.com/@BecomeTheHive'
export const X_URL = 'https://x.com/becomethehive'
export const HIVE_LABS_URL = 'https://thehive.honeyinc.app'
export const INVESTORS_URL = 'https://thehive.honeyinc.app/investors'

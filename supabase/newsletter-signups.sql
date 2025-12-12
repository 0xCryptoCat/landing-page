-- Newsletter Signups Table
-- Created: December 12, 2025
-- Purpose: Store email signups from landing page
-- Security: All operations via edge function (service role) only

-- Create table for newsletter signups
CREATE TABLE IF NOT EXISTS newsletter_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  source TEXT DEFAULT 'landing-page',
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ NULL,
  is_active BOOLEAN DEFAULT TRUE,
  ip_address TEXT NULL,
  user_agent TEXT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_signups(email);

-- Create index for active subscribers
CREATE INDEX IF NOT EXISTS idx_newsletter_active ON newsletter_signups(is_active) WHERE is_active = TRUE;

-- Enable RLS (CRITICAL for security)
ALTER TABLE newsletter_signups ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES: Block ALL anonymous access
-- Edge function uses service_role which bypasses RLS
-- This ensures only the edge function can write to this table
-- ============================================

-- Block anonymous SELECT
CREATE POLICY "Block anonymous reads" ON newsletter_signups
  FOR SELECT
  TO anon
  USING (FALSE);

-- Block anonymous INSERT (edge function uses service_role, bypasses this)
CREATE POLICY "Block anonymous inserts" ON newsletter_signups
  FOR INSERT
  TO anon
  WITH CHECK (FALSE);

-- Block anonymous UPDATE
CREATE POLICY "Block anonymous updates" ON newsletter_signups
  FOR UPDATE
  TO anon
  USING (FALSE);

-- Block anonymous DELETE
CREATE POLICY "Block anonymous deletes" ON newsletter_signups
  FOR DELETE
  TO anon
  USING (FALSE);

-- ============================================
-- For authenticated users (if you add admin panel later)
-- ============================================

-- Allow authenticated users to read (for admin dashboard)
CREATE POLICY "Allow authenticated reads" ON newsletter_signups
  FOR SELECT
  TO authenticated
  USING (TRUE);

-- Comment for documentation
COMMENT ON TABLE newsletter_signups IS 'Newsletter email signups from landing page. All writes via edge function (service_role) only.';

-- ============================================
-- Optional: Auto-update updated_at timestamp
-- ============================================
CREATE OR REPLACE FUNCTION update_newsletter_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER newsletter_signups_updated_at
  BEFORE UPDATE ON newsletter_signups
  FOR EACH ROW
  EXECUTE FUNCTION update_newsletter_updated_at();

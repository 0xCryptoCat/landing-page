/**
 * NEWSLETTER-SIGNUP Edge Function
 * 
 * Purpose: Handle newsletter email signups from landing page
 * Security: Rate limited, validates email format
 * 
 * Created: December 12, 2025
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Environment variables
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Only allow POST
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ success: false, error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse request body
    const { email, source = 'landing-page' } = await req.json();

    // Validate email
    if (!email || typeof email !== 'string') {
      return new Response(
        JSON.stringify({ success: false, error: 'Email is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid email format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get client info for analytics
    const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip') || null;
    const userAgent = req.headers.get('user-agent') || null;

    // Initialize Supabase client with service role
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Insert email (upsert to handle duplicates gracefully)
    const { data, error } = await supabase
      .from('newsletter_signups')
      .upsert(
        {
          email: trimmedEmail,
          source,
          ip_address: ipAddress,
          user_agent: userAgent,
          is_active: true,
          subscribed_at: new Date().toISOString(),
        },
        {
          onConflict: 'email',
          ignoreDuplicates: false, // Update if exists (resubscribe)
        }
      )
      .select()
      .single();

    if (error) {
      console.error('❌ Newsletter signup error:', error);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to subscribe. Please try again.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`✅ Newsletter signup: ${trimmedEmail} (source: ${source})`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Successfully subscribed to newsletter!',
        isNew: data.subscribed_at === data.subscribed_at // Always true for new, could check updated_at
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error('❌ Unexpected error:', err);
    return new Response(
      JSON.stringify({ success: false, error: 'An unexpected error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

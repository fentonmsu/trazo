import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables');
}

// The secret/service_role key bypasses Row Level Security, which is what
// lets this backend (authenticating users itself via its own JWT, not
// Supabase Auth) read/write every user's rows. It must never be sent to
// the frontend.
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

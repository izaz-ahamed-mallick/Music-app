import { createClient } from "@supabase/supabase-js";

const supaBaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supaBaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supaBaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supaBaseUrl || !supaBaseAnonKey) {
    throw new Error(
        "Supabase URL or Anon Key is missing in environment variables"
    );
}

// Client instance for client-side code
export const supaBaseInstence = createClient(supaBaseUrl, supaBaseAnonKey);

// Server-side client instance (service role key)
if (!supaBaseServiceKey) {
    console.warn(
        "Supabase Service Role Key is not defined. This is required for server-side operations."
    );
}
export const supabaseServerClient = supaBaseServiceKey
    ? createClient(supaBaseUrl, supaBaseServiceKey)
    : null;

import { createClient } from "@supabase/supabase-js";

const supaBaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supaBaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supaBaseUrl || !supaBaseKey) {
    throw new Error("Supabase URL or Key is missing in environment variables");
}

export const supaBaseInstence = createClient(supaBaseUrl, supaBaseKey);

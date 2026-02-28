import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Create a lazy-initialized client to avoid build-time errors
let _supabase: SupabaseClient | null = null;

export const getSupabase = (): SupabaseClient => {
    if (!_supabase) {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        
        if (!supabaseUrl || !supabaseAnonKey) {
            throw new Error('Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.');
        }
        _supabase = createClient(supabaseUrl, supabaseAnonKey);
    }
    return _supabase;
};

// Create an authenticated Supabase client with session token
export const getAuthenticatedSupabase = (accessToken: string): SupabaseClient => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing Supabase environment variables.');
    }
    
    return createClient(supabaseUrl, supabaseAnonKey, {
        global: {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
    });
};

// Create a Supabase client with service role key (bypasses RLS)
// Only use this server-side for operations that need to bypass RLS
export const getServiceSupabase = (): SupabaseClient => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !serviceRoleKey) {
        throw new Error('Missing Supabase service role key. Please set SUPABASE_SERVICE_ROLE_KEY in your .env.local file.');
    }
    
    return createClient(supabaseUrl, serviceRoleKey);
};

// Types for the teams table
export interface Team {
    id: string;
    name: string;
    role: string;
    image_url: string;
    order_index: number;
    created_at: string;
    updated_at: string;
}

import { getServiceSupabase } from "./supabase";

// Simple server-side auth using Postgres tables `admin_users` and `admin_sessions`.
// Sessions are random tokens stored in `admin_sessions` with an expiry.

export async function loginWithTable(email: string, password: string) {
  const supabase = getServiceSupabase();

  // Call Postgres function verify_admin which should return the user's id (uuid)
  const { data, error } = await supabase.rpc("verify_admin", {
    p_email: email,
    p_password: password,
  });

  if (error || !data) return { error: true };

  // `data` should be the user's id
  const userId = Array.isArray(data) ? data[0] : data;

  // Create a session token
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  const { error: insertError } = await supabase.from("admin_sessions").insert([
    { token, user_id: userId, expires_at: expiresAt },
  ]);

  if (insertError) return { error: true };

  // Fetch user email to return
  const { data: userData, error: userError } = await supabase
    .from("admin_users")
    .select("id,email")
    .eq("id", userId)
    .single();

  if (userError || !userData) return { error: true };

  return { token, user: { id: userData.id, email: userData.email } };
}

export async function verifySessionToken(token: string | null) {
  if (!token) return null;
  const supabase = getServiceSupabase();

  const { data, error } = await supabase
    .from("admin_sessions")
    .select("user_id,expires_at")
    .eq("token", token)
    .single();

  if (error || !data) return null;

  const now = new Date().toISOString();
  if (!data.expires_at || data.expires_at < now) return null;

  // Fetch user
  const { data: userData, error: userError } = await supabase
    .from("admin_users")
    .select("id,email")
    .eq("id", data.user_id)
    .single();

  if (userError || !userData) return null;

  return { id: userData.id, email: userData.email };
}

export async function logoutToken(token: string | null) {
  if (!token) return;
  const supabase = getServiceSupabase();
  await supabase.from("admin_sessions").delete().eq("token", token);
}

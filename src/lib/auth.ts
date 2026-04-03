import bcrypt from "bcryptjs";
import { getCollection, Collections, AdminUser, AdminSession } from "./mongodb";

// Simple server-side auth using MongoDB collections `admin_users` and `admin_sessions`.
// Sessions are random tokens stored in `admin_sessions` with an expiry.

export async function loginWithTable(email: string, password: string) {
  try {
    const usersCollection = await getCollection<AdminUser>(Collections.ADMIN_USERS);
    
    // Find user by email
    const user = await usersCollection.findOne({ email });
    
    if (!user) {
      return { error: true };
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    
    if (!isPasswordValid) {
      return { error: true };
    }

    // Create a session token
    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    
    const sessionsCollection = await getCollection<AdminSession>(Collections.ADMIN_SESSIONS);
    
    await sessionsCollection.insertOne({
      token,
      user_id: user.id,
      expires_at: expiresAt,
      created_at: new Date().toISOString(),
    });

    return { 
      token, 
      user: { 
        id: user.id, 
        email: user.email 
      } 
    };
  } catch (error) {
    console.error("Login error:", error);
    return { error: true };
  }
}

export async function verifySessionToken(token: string | null) {
  if (!token) return null;
  
  try {
    const sessionsCollection = await getCollection<AdminSession>(Collections.ADMIN_SESSIONS);
    
    const session = await sessionsCollection.findOne({ token });
    
    if (!session) return null;

    const now = new Date().toISOString();
    if (!session.expires_at || session.expires_at < now) {
      // Clean up expired session
      await sessionsCollection.deleteOne({ token });
      return null;
    }

    // Fetch user
    const usersCollection = await getCollection<AdminUser>(Collections.ADMIN_USERS);
    const user = await usersCollection.findOne({ id: session.user_id });
    
    if (!user) return null;

    return { 
      id: user.id, 
      email: user.email 
    };
  } catch (error) {
    console.error("Verify session error:", error);
    return null;
  }
}

export async function logoutToken(token: string | null) {
  if (!token) return;
  
  try {
    const sessionsCollection = await getCollection<AdminSession>(Collections.ADMIN_SESSIONS);
    await sessionsCollection.deleteOne({ token });
  } catch (error) {
    console.error("Logout error:", error);
  }
}

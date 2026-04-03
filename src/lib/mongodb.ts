import { MongoClient, Db, Collection, Document } from "mongodb";

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://root:root@72.61.178.198:32768/";
const DB_NAME = "rb_holding";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(DB_NAME);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export async function getDb(): Promise<Db> {
  const { db } = await connectToDatabase();
  return db;
}

export async function getCollection<T extends Document = Document>(name: string): Promise<Collection<T>> {
  const db = await getDb();
  return db.collection<T>(name);
}

// Collection names
export const Collections = {
  TEAMS: "teams",
  CONTACT_SUBMISSIONS: "contact_submissions",
  ADMIN_USERS: "admin_users",
  ADMIN_SESSIONS: "admin_sessions",
} as const;

// Types for the teams collection
export interface Team {
  _id?: string;
  id: string;
  name: string;
  role: string;
  company: string;
  image_url: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

// Types for contact submissions
export interface ContactSubmission {
  _id?: string;
  id: string;
  name: string;
  email: string;
  message: string;
  status: "new" | "read" | "replied" | "archived";
  created_at: string;
  updated_at: string;
}

// Types for admin users
export interface AdminUser {
  _id?: string;
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
}

// Types for admin sessions
export interface AdminSession {
  _id?: string;
  token: string;
  user_id: string;
  expires_at: string;
  created_at: string;
}

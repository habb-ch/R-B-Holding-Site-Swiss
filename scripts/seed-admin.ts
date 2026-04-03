import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://root:root@72.61.178.198:32768/";
const DB_NAME = "rb_holding";

async function seedAdmin() {
  const client = await MongoClient.connect(MONGODB_URI);
  
  try {
    const db = client.db(DB_NAME);
    const usersCollection = db.collection("admin_users");

    // Check if admin already exists
    const existingAdmin = await usersCollection.findOne({ email: "admin@rbrajhholding.ch" });
    
    if (existingAdmin) {
      console.log("Admin user already exists!");
      return;
    }

    // Create admin user
    const password = "RBHolding2024!";
    const password_hash = await bcrypt.hash(password, 10);
    
    const adminUser = {
      id: crypto.randomUUID(),
      email: "admin@rbrajhholding.ch",
      password_hash,
      created_at: new Date().toISOString(),
    };

    await usersCollection.insertOne(adminUser);
    
    console.log("✅ Admin user created successfully!");
    console.log("Email: admin@rbrajhholding.ch");
    console.log("Password: RBHolding2024!");
    console.log("\n⚠️  Please change the password after first login!");

    // Create indexes
    await usersCollection.createIndex({ email: 1 }, { unique: true });
    await usersCollection.createIndex({ id: 1 }, { unique: true });
    
    const teamsCollection = db.collection("teams");
    await teamsCollection.createIndex({ id: 1 }, { unique: true });
    await teamsCollection.createIndex({ order_index: 1 });
    
    const contactsCollection = db.collection("contact_submissions");
    await contactsCollection.createIndex({ id: 1 }, { unique: true });
    await contactsCollection.createIndex({ created_at: -1 });
    await contactsCollection.createIndex({ status: 1 });
    
    const sessionsCollection = db.collection("admin_sessions");
    await sessionsCollection.createIndex({ token: 1 }, { unique: true });
    await sessionsCollection.createIndex({ expires_at: 1 }, { expireAfterSeconds: 0 });
    
    console.log("✅ Database indexes created successfully!");
    
  } catch (error) {
    console.error("Error seeding admin:", error);
    throw error;
  } finally {
    await client.close();
  }
}

seedAdmin().catch(console.error);

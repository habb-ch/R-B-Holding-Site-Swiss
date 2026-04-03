import { NextRequest, NextResponse } from "next/server";
import { getCollection, Collections, ContactSubmission } from "@/lib/mongodb";
import { verifySessionToken } from "@/lib/auth";
import { cookies } from "next/headers";

// Helper to verify admin session and return token
async function getSessionToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("admin-session")?.value ?? null;
  const user = await verifySessionToken(sessionToken);
  return user ? sessionToken : null;
}

// GET - Fetch contact submissions with pagination (admin only)
export async function GET(request: NextRequest) {
  try {
    const sessionToken = await getSessionToken();
    if (!sessionToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const contactsCollection = await getCollection<ContactSubmission>(Collections.CONTACT_SUBMISSIONS);

    // Get total count
    const total = await contactsCollection.countDocuments();

    // Get paginated data
    const data = await contactsCollection
      .find({})
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      data: data || [],
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// POST - Create new contact submission (public)
export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 },
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    const contactsCollection = await getCollection<ContactSubmission>(Collections.CONTACT_SUBMISSIONS);
    const newSubmission: ContactSubmission = {
      id: crypto.randomUUID(),
      name,
      email,
      message,
      status: "new",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    await contactsCollection.insertOne(newSubmission);

    return NextResponse.json(newSubmission, { status: 201 });
  } catch (error) {
    console.error("Error creating submission:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// PUT - Update submission status (admin only)
export async function PUT(request: NextRequest) {
  try {
    const sessionToken = await getSessionToken();
    if (!sessionToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: "ID and status are required" },
        { status: 400 },
      );
    }

    const validStatuses = ["new", "read", "replied", "archived"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const contactsCollection = await getCollection<ContactSubmission>(Collections.CONTACT_SUBMISSIONS);
    const result = await contactsCollection.findOneAndUpdate(
      { id },
      {
        $set: {
          status,
          updated_at: new Date().toISOString(),
        },
      },
      { returnDocument: "after" }
    );

    if (!result) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating submission:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// DELETE - Delete submission (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const sessionToken = await getSessionToken();
    if (!sessionToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Submission ID is required" },
        { status: 400 },
      );
    }

    const contactsCollection = await getCollection<ContactSubmission>(Collections.CONTACT_SUBMISSIONS);
    const result = await contactsCollection.deleteOne({ id });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting submission:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

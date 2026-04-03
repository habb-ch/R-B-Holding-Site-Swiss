import { NextRequest, NextResponse } from "next/server";
import { getCollection, Collections, Team } from "@/lib/mongodb";
import { verifySessionToken } from "@/lib/auth";
import { cookies } from "next/headers";

// Helper to verify admin session and return token
async function getSessionToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("admin-session")?.value ?? null;

  const user = await verifySessionToken(sessionToken);
  return user ? sessionToken : null;
}

// GET - Fetch all team members (public)
export async function GET() {
  try {
    const teamsCollection = await getCollection<Team>(Collections.TEAMS);
    const teams = await teamsCollection
      .find({})
      .sort({ order_index: 1 })
      .toArray();

    return NextResponse.json(teams || []);
  } catch (error) {
    console.error("Error fetching teams:", error);
    return NextResponse.json([], { status: 200 });
  }
}

// POST - Create new team member (admin only)
export async function POST(request: NextRequest) {
  try {
    const sessionToken = await getSessionToken();
    if (!sessionToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, role, company, image_url, order_index } =
      await request.json();

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const teamsCollection = await getCollection<Team>(Collections.TEAMS);
    const newTeam: Team = {
      id: crypto.randomUUID(),
      name,
      role: role || "",
      company: company || "",
      image_url: image_url || "",
      order_index: order_index || 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    await teamsCollection.insertOne(newTeam);

    return NextResponse.json(newTeam, { status: 201 });
  } catch (error) {
    console.error("Error creating team member:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// PUT - Update team member (admin only)
export async function PUT(request: NextRequest) {
  try {
    const sessionToken = await getSessionToken();
    if (!sessionToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, name, role, company, image_url, order_index } =
      await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Team member ID is required" },
        { status: 400 },
      );
    }

    const teamsCollection = await getCollection<Team>(Collections.TEAMS);
    const result = await teamsCollection.findOneAndUpdate(
      { id },
      {
        $set: {
          name,
          role,
          company,
          image_url,
          order_index,
          updated_at: new Date().toISOString(),
        },
      },
      { returnDocument: "after" }
    );

    if (!result) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating team member:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// DELETE - Delete team member (admin only)
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
        { error: "Team member ID is required" },
        { status: 400 },
      );
    }

    const teamsCollection = await getCollection<Team>(Collections.TEAMS);
    const result = await teamsCollection.deleteOne({ id });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting team member:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

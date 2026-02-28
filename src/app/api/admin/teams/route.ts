import { NextRequest, NextResponse } from "next/server";
import { getSupabase, getAuthenticatedSupabase } from "@/lib/supabase";
import { cookies } from "next/headers";

// Helper to verify admin session and return token
async function getSessionToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("admin-session")?.value;

  if (!sessionToken) {
    return null;
  }

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase.auth.getUser(sessionToken);
    if (!error && data.user) {
      return sessionToken;
    }
    return null;
  } catch {
    return null;
  }
}

// GET - Fetch all team members (public)
export async function GET() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("teams")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) {
      console.error("Error fetching teams:", error);
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(data || []);
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

    const supabase = getAuthenticatedSupabase(sessionToken);
    const { data, error } = await supabase
      .from("teams")
      .insert([
        {
          name,
          role: role || "",
          company: company || "",
          image_url: image_url || "",
          order_index: order_index || 0,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating team member:", error);
      return NextResponse.json(
        { error: "Failed to create team member" },
        { status: 500 },
      );
    }

    return NextResponse.json(data, { status: 201 });
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

    const supabase = getAuthenticatedSupabase(sessionToken);
    const { data, error } = await supabase
      .from("teams")
      .update({
        name,
        role,
        company,
        image_url,
        order_index,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating team member:", error);
      return NextResponse.json(
        { error: "Failed to update team member" },
        { status: 500 },
      );
    }

    return NextResponse.json(data);
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

    const supabase = getAuthenticatedSupabase(sessionToken);
    const { error } = await supabase.from("teams").delete().eq("id", id);

    if (error) {
      console.error("Error deleting team member:", error);
      return NextResponse.json(
        { error: "Failed to delete team member" },
        { status: 500 },
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

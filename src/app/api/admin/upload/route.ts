import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSupabase } from "@/lib/supabase";

const IMGBB_API_KEY = "5200f27c34683513ab60c7eaf8938056";

// Helper to verify admin session
async function verifySession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("admin-session")?.value;

  if (!sessionToken) {
    return false;
  }

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase.auth.getUser(sessionToken);
    return !error && !!data.user;
  } catch {
    return false;
  }
}

// POST - Upload image to ImageBB (admin only)
export async function POST(request: NextRequest) {
  try {
    const isAuthenticated = await verifySession();
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const image = formData.get("image") as File;

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Convert file to base64
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString("base64");

    // Upload to ImageBB
    const imgbbFormData = new FormData();
    imgbbFormData.append("key", IMGBB_API_KEY);
    imgbbFormData.append("image", base64Image);

    const response = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: imgbbFormData,
    });

    const result = await response.json();

    if (!result.success) {
      console.error("ImageBB error:", result);
      return NextResponse.json(
        { error: "Failed to upload image" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      url: result.data.url,
      display_url: result.data.display_url,
      thumb_url: result.data.thumb?.url,
      delete_url: result.data.delete_url,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

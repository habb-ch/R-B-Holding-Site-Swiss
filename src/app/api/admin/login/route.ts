import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { loginWithTable } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    // Authenticate using DB table
    const result = await loginWithTable(email, password);
    if ((result as any).error || !result.token) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set("admin-session", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return NextResponse.json({ success: true, user: result.user });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { verifySessionToken, logoutToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("admin-session")?.value;

    if (!sessionToken) {
      return NextResponse.json({ authenticated: false });
    }

    const user = await verifySessionToken(sessionToken ?? null);
    if (!user) return NextResponse.json({ authenticated: false });

    return NextResponse.json({ authenticated: true, user: { email: user.email } });
  } catch (error) {
    console.error("Session check error:", error);
    return NextResponse.json({ authenticated: false });
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin-session")?.value ?? null;
    await logoutToken(token);
    cookieStore.delete("admin-session");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

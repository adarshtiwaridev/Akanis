import { NextResponse } from "next/server";

/**
 * POST /api/auth/logout
 * Clear authentication cookie and log out the user
 */
export async function POST(req) {
  try {
    // Create response with logout message
    const response = NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );

    // Clear the auth_token cookie
    response.cookies.set({
      name: "auth_token",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { message: "Logout failed", error: error.message },
      { status: 500 }
    );
  }
}

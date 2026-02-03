import { NextResponse } from "next/server";

export async function POST() {
  // Clear the auth_token cookie (HttpOnly)
  const response = NextResponse.json({ message: "Logged out" }, { status: 200 });

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
}

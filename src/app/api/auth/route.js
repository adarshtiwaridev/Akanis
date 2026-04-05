import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { rateLimiter } from "../../../lib/rateLimiter";

export async function POST(req) {
  // Apply rate limiting: 5 attempts per 15 minutes
  if (!rateLimiter(req, { limit: 5, windowMs: 15 * 60 * 1000 })) {
    return NextResponse.json(
      { message: "Too many login attempts, please try again later." },
      { status: 429 }
    );
  }

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // ✅ Create JWT
    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // ✅ Create response
    const response = NextResponse.json(
      { message: "Login successful", token: token },
      { status: 200 }
    );


    // ✅ Set HttpOnly cookie
    response.cookies.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 2 * 60 * 60, // 2 hours (seconds)
      path: "/",
    });



    return response;

  } catch (error) {
    console.error("Auth error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

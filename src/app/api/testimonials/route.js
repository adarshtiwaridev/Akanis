import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Testimonial from "../../../models/Testimonial";

/**
 * GET /api/testimonials
 * Fetch all testimonials
 */
export async function GET() {
  try {
    await dbConnect();
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });

    return NextResponse.json(testimonials, { status: 200 });
  } catch (error) {
    console.error("GET /api/testimonials error:", error);
    return NextResponse.json(
      { message: "Failed to fetch testimonials", error: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/testimonials
 * Create a new testimonial
 */
export async function POST(req) {
  try {
    const body = await req.json();

    const { name, company, role, message, image, rating } = body;

    // Validate required fields
    if (!name || !message) {
      return NextResponse.json(
        { message: "Name and message are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const testimonial = await Testimonial.create({
      name,
      company: company || null,
      role: role || null,
      message,
      image: image || null,
      rating: rating || 5,
    });

    return NextResponse.json(
      { message: "Testimonial created successfully", testimonial },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/testimonials error:", error);
    return NextResponse.json(
      { message: "Failed to create testimonial", error: error.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/testimonials?id=TESTIMONIAL_ID
 * Delete a testimonial
 */
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Testimonial ID is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const testimonial = await Testimonial.findByIdAndDelete(id);

    if (!testimonial) {
      return NextResponse.json(
        { message: "Testimonial not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Testimonial deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/testimonials error:", error);
    return NextResponse.json(
      { message: "Failed to delete testimonial", error: error.message },
      { status: 500 }
    );
  }
}

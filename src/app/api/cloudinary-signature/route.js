import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const resourceType = body.resourceType || "image";

    // Validate resource type
    if (!["image", "video"].includes(resourceType)) {
      return NextResponse.json(
        { message: "Invalid resource type" },
        { status: 400 }
      );
    }

    const timestamp = Math.floor(Date.now() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      {
        folder: "studio-gallery",
        timestamp,
      },
      process.env.CLOUDINARY_API_SECRET
    );

    return NextResponse.json(
      {
        timestamp,
        signature,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        resourceType,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Signature generation error:", err);
    return NextResponse.json(
      { message: "Failed to generate signature" },
      { status: 500 }
    );
  }
}

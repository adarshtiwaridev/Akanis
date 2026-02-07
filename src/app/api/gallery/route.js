import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Gallery from "../../../models/Gallery";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary config (needed for DELETE)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* ======================
   GET  /api/gallery
====================== */
export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  const query = type ? { type } : {};
  const media = await Gallery.find(query).sort({ createdAt: -1 });

  return NextResponse.json(media, { status: 200 });
}

/* ======================
   POST  /api/gallery
   (NO AUTH)
====================== */
export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { title = "", tags = "", type, url, publicId } = body;

    if (!type || !url || !publicId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const normalizedTags = Array.isArray(tags)
      ? tags
      : typeof tags === "string"
      ? tags.split(",").map(t => t.trim())
      : [];

    const media = await Gallery.create({
      title,
      tags: normalizedTags,
      type,
      url,
      publicId,
    });

    return NextResponse.json(media, { status: 201 });

  } catch (err) {
    console.error("POST /api/gallery error:", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

/* ======================
   DELETE  /api/gallery?id=MEDIA_ID
   (NO AUTH)
====================== */
export async function DELETE(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Media ID required" },
        { status: 400 }
      );
    }

    const media = await Gallery.findById(id);
    if (!media) {
      return NextResponse.json(
        { message: "Media not found" },
        { status: 404 }
      );
    }

    await cloudinary.uploader.destroy(media.publicId, {
      resource_type: media.type === "video" ? "video" : "image",
    });

    await media.deleteOne();

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (err) {
    console.error("DELETE /api/gallery error:", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

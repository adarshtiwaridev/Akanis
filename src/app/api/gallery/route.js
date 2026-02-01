import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Gallery from "../../../models/Gallery";
import { uploadToCloudinary } from "../../../lib/uploadToCloudinary";
import { v2 as cloudinary } from "cloudinary";

/* ================= GET =================
   /api/gallery?type=photo|video
========================================= */
export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  const query = type ? { type } : {};
  const media = await Gallery.find(query).sort({ createdAt: -1 });

  return NextResponse.json(media);
}

/* ================= POST =================
   Upload image or video
========================================= */
export async function POST(req) {
  await dbConnect();

  const formData = await req.formData();
  const file = formData.get("file");
  const type = formData.get("type"); // photo | video
  const title = formData.get("title");
  const tags = formData.get("tags");

  if (!file || !type) {
    return NextResponse.json(
      { message: "File and type are required" },
      { status: 400 }
    );
  }

  const uploadResult = await uploadToCloudinary(file, {
    folder: "studio-gallery",
    resourceType: type === "video" ? "video" : "image",
    quality: type === "photo" ? "auto" : undefined,
  });

  const media = await Gallery.create({
    url: uploadResult.secure_url,
    publicId: uploadResult.public_id,
    type,
    title,
    tags,
  });

  return NextResponse.json(media, { status: 201 });
}

/* ================= DELETE =================
   /api/gallery?id=MEDIA_ID
========================================= */
export async function DELETE(req) {
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

  return NextResponse.json({ success: true });
}

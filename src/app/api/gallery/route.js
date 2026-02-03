import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import dbConnect from "../../../lib/dbConnect";
import Gallery from "../../../models/Gallery";
import { uploadToCloudinaryServer } from "../../../lib/uploadToCloudinaryServer";
import { v2 as cloudinary } from "cloudinary";

/* ======================
   AUTH HELPER
====================== */
async function verifyAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return false;

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

/* ======================
   GET  /api/gallery?type=photo|video
   Public
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
   Protected (JWT)
====================== */
export async function POST(req) {
  await dbConnect();

  const isAuth = await verifyAuth();
  if (!isAuth) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const contentType = req.headers.get("content-type") || "";

  // ---- multipart upload ----
  if (contentType.includes("multipart/form-data")) {
    const form = await req.formData();

    const file = form.get("file");
    const title = form.get("title")?.toString() || "";
    const tags = form.get("tags")?.toString() || "";
    const type = form.get("type")?.toString() || "photo";

    if (!file || typeof file.arrayBuffer !== "function") {
      return NextResponse.json(
        { message: "Invalid file upload" },
        { status: 400 }
      );
    }

    // optional limit (adjust as needed)
    const MAX_BYTES = 250 * 1024 * 1024; // 250 MB
    if (file.size && file.size > MAX_BYTES) {
      return NextResponse.json({ message: "File too large" }, { status: 413 });
    }

    // ensure server Cloudinary creds present
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error("Missing Cloudinary server env vars");
      return NextResponse.json({ message: "Server misconfigured: Cloudinary credentials missing" }, { status: 500 });
    }

    let uploadRes;
    try {
      uploadRes = await uploadToCloudinaryServer(file, {
        resourceType: type === "video" ? "video" : "image",
      });
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      return NextResponse.json({ message: err?.message || "Cloudinary upload failed" }, { status: 500 });
    }

    const media = await Gallery.create({
      title,
      tags,
      type,
      url: uploadRes.secure_url,
      publicId: uploadRes.public_id,
    });

    return NextResponse.json(media, { status: 201 });
  }

  // ---- JSON fallback ----
  const { title, tags, type, url, publicId } = await req.json();

  if (!url || !type) {
    return NextResponse.json(
      { message: "Missing data" },
      { status: 400 }
    );
  }

  const media = await Gallery.create({
    title,
    tags,
    type,
    url,
    publicId,
  });

  return NextResponse.json(media, { status: 201 });
}

/* ======================
   DELETE  /api/gallery?id=MEDIA_ID
   Protected (JWT)
====================== */
export async function DELETE(req) {
  await dbConnect();

  const isAuth = await verifyAuth();
  if (!isAuth) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

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
}

import { IncomingForm } from "formidable";
import fs from "fs/promises";
import path from "path";
import os from "os";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Utility function to parse FormData with formidable v3
async function parseFormData(req) {
  const form = new IncomingForm({
    maxFileSize: 2 * 1024 * 1024 * 1024, // 2GB
    maxFields: 10,
    maxFieldsSize: 2 * 1024 * 1024, // 2MB for field data
    uploadDir: os.tmpdir(),
    keepExtensions: true,
    multiples: false,
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error("[PROXY] Formidable parse error:", err.message);
        reject(err);
      } else {
        console.log("[PROXY] Formidable v3 parsed successfully");
        console.log("[PROXY] Fields:", Object.keys(fields));
        console.log("[PROXY] Files:", Object.keys(files));
        resolve({ fields, files });
      }
    });
  });
}

export async function POST(req) {
  try {
    console.log("[PROXY] POST request received");
    console.log("[PROXY] Content-Type:", req.headers?.get?.("content-type") || "(unknown)");

    // Parse form data — support Web Request (App Router) and Node IncomingMessage
    let fields = {};
    let files = {};

    if (typeof req.formData === "function") {
      // Running in Next.js App Router where `req` is a Web Request
      const formData = await req.formData();
      // extract fields
      for (const entry of formData.entries()) {
        const [key, value] = entry;
        if (key === "file") continue;
        // keep first value for simple fields
        if (!fields[key]) fields[key] = value;
      }

      const fileValue = formData.get("file");
      if (fileValue) {
        const filename = fileValue.name || `upload-${Date.now()}`;
        const contentType = fileValue.type || "application/octet-stream";
        const arrayBuffer = await fileValue.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const tmpPath = path.join(os.tmpdir(), `${Date.now()}-${filename}`);
        await fs.writeFile(tmpPath, buffer);

        files.file = {
          filepath: tmpPath,
          originalFilename: filename,
          size: buffer.length,
          mimetype: contentType,
        };
      }
    } else {
      // Fallback to formidable for Node-style requests
      const parsed = await parseFormData(req);
      fields = parsed.fields || {};
      files = parsed.files || {};
    }

    console.log("[PROXY] Raw files object:", JSON.stringify(Object.keys(files)));
    console.log("[PROXY] Raw fields object:", JSON.stringify(Object.keys(fields)));

    // Extract file (formidable v3 returns array)
    let file = files.file;
    if (Array.isArray(file)) {
      file = file[0];
    }

    // Extract fields (formidable v3 returns array for each field)
    let folderValue = fields.folder;
    if (Array.isArray(folderValue)) {
      folderValue = folderValue[0];
    }

    let resourceTypeValue = fields.resource_type;
    if (Array.isArray(resourceTypeValue)) {
      resourceTypeValue = resourceTypeValue[0];
    }
    
    const folder = folderValue || "studio-gallery";
    const resourceType = resourceTypeValue || "video";

    console.log("[PROXY] Parsed data:", { 
      folder, 
      resourceType, 
      fileName: file?.originalFilename, 
      fileSize: file?.size, 
      fileMime: file?.mimetype,
      filePath: file?.filepath
    });

    if (!file) {
      console.error("[PROXY] No file found in request. Available files:", Object.keys(files));
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    // Validate file exists
    try {
      await fs.access(file.filepath);
      console.log("[PROXY] ✅ File exists at:", file.filepath);
    } catch (err) {
      console.error("[PROXY] ❌ File not found at path:", file.filepath);
      return NextResponse.json(
        { message: "File not found after upload" },
        { status: 400 }
      );
    }

    // Validate file type
    const validImageTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
    const validVideoTypes = ["video/mp4", "video/webm", "video/quicktime", "video/x-msvideo"];
    const validTypes = resourceType === "image" ? validImageTypes : validVideoTypes;

    const fileMimeType = file.mimetype || "";
    const isValidType = validTypes.includes(fileMimeType);
    
    console.log(`[PROXY] Type validation: mimeType=${fileMimeType}, isValid=${isValidType}, validTypes=${validTypes.join(", ")}`);

    if (!isValidType) {
      console.error(`[PROXY] Invalid file type: ${fileMimeType}`);
      await fs.unlink(file.filepath).catch(() => {});
      return NextResponse.json(
        { 
          message: `Invalid ${resourceType} format. Received: ${fileMimeType}. Supported: ${validTypes.join(", ")}` 
        },
        { status: 400 }
      );
    }

    // Check image size limits
    const IMAGE_SIZE_LIMIT = 50 * 1024 * 1024; // 50MB for images
    if (resourceType === "image" && file.size > IMAGE_SIZE_LIMIT) {
      console.error(`[PROXY] Image too large: ${file.size} bytes > ${IMAGE_SIZE_LIMIT}`);
      await fs.unlink(file.filepath).catch(() => {});
      return NextResponse.json(
        { 
          message: `Image too large. Max ${IMAGE_SIZE_LIMIT / (1024 * 1024)}MB for images. Received: ${(file.size / (1024 * 1024)).toFixed(2)}MB` 
        },
        { status: 413 }
      );
    }

    // Check video size limits
    const VIDEO_SIZE_LIMIT = 500 * 1024 * 1024; // 500MB for videos
    if (resourceType === "video" && file.size > VIDEO_SIZE_LIMIT) {
      console.error(`[PROXY] Video too large: ${file.size} bytes > ${VIDEO_SIZE_LIMIT}`);
      await fs.unlink(file.filepath).catch(() => {});
      return NextResponse.json(
        { 
          message: `Video too large. Max ${VIDEO_SIZE_LIMIT / (1024 * 1024)}MB for videos. Received: ${(file.size / (1024 * 1024)).toFixed(2)}MB` 
        },
        { status: 413 }
      );
    }

    const uploadOptions = {
      folder,
      resource_type: resourceType,
      chunk_size: 6000000,
      quality: "auto",
      fetch_format: "auto",
    };

    console.log(`[PROXY] Starting ${resourceType} upload to Cloudinary...`, { uploadOptions, fileSize: `${(file.size / (1024 * 1024)).toFixed(2)}MB` });

    try {
      const result = await cloudinary.uploader.upload_large(
        file.filepath,
        uploadOptions
      );

      console.log(`[PROXY] ✅ ${resourceType} uploaded. Raw result:`, Object.keys(result));
      try {
        console.log("[PROXY] Cloudinary result preview:", JSON.stringify(result).slice(0, 1000));
      } catch (e) {
        // ignore circular
      }

      // Ensure expected fields exist
      const publicId = result?.public_id || result?.publicId || result?.publicID;
      const secureUrl = result?.secure_url || result?.secureUrl || result?.url;

      if (!publicId || !secureUrl) {
        console.warn("[PROXY] Cloudinary response missing expected fields", { publicId, secureUrl });
      } else {
        console.log(`[PROXY] Parsed Cloudinary publicId=${publicId}`);
      }

      // Robust cleanup for Windows: attempt rm with retries to avoid EPERM
      const tryUnlink = async (p) => {
        const maxAttempts = 4;
        const delay = (ms) => new Promise((r) => setTimeout(r, ms));
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
          try {
            await fs.rm(p, { force: true });
            console.log(`[PROXY] Temp file removed: ${p}`);
            return;
          } catch (e) {
            console.warn(`[PROXY] Attempt ${attempt} to remove temp file failed:`, e.code || e.message);
            // small backoff
            await delay(attempt * 150);
          }
        }
        console.warn('[PROXY] Failed to remove temp file after retries:', p);
      };

      try {
        await tryUnlink(file.filepath);
      } catch (e) {
        console.warn('[PROXY] Cleanup threw unexpected error:', e?.message || e);
      }

      return NextResponse.json(result, { status: 200 });
    } catch (cloudinaryErr) {
      console.error("[PROXY] ❌ Cloudinary upload error:", cloudinaryErr.message || cloudinaryErr);
      // Cleanup temp file even on error (retry)
      try {
        await fs.rm(file.filepath, { force: true }).catch(() => {});
      } catch (e) {
        console.warn('[PROXY] Cleanup after error failed:', e?.message || e);
      }

      // Return error response instead of throwing to avoid uncaughtException
      return NextResponse.json(
        { message: 'Cloudinary upload failed', error: cloudinaryErr?.message || String(cloudinaryErr) },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("[PROXY] ❌ Proxy upload error:", err.message || err);
    return NextResponse.json(
      {
        message: "Upload failed",
        error: err.message,
        details: process.env.NODE_ENV === "development" ? err.toString() : undefined,
      },
      { status: 500 }
    );
  }
}

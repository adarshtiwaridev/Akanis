import formidable from "formidable";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

export const config = {
  api: {
    bodyParser: false, // 🔥 REQUIRED
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const form = new formidable.IncomingForm({
      maxFileSize: 1024 * 1024 * 1024, // 1GB
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Form parse error:", err);
        return res.status(400).json({ message: "Form parse failed" });
      }

      const file = files.file;
      const folder = fields.folder || "studio-gallery";
      const resourceType = fields.resource_type || "video";

      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const uploadOptions = {
        folder,
        resource_type: resourceType,
        chunk_size: 6000000,
        quality: "auto",
        fetch_format: "auto",
      };

      const result = await cloudinary.uploader.upload_large(
        file.filepath,
        uploadOptions
      );

      // cleanup temp file
      fs.unlink(file.filepath, () => {});

      return res.status(200).json(result);
    });
  } catch (err) {
    console.error("Proxy upload error:", err);
    return res.status(500).json({
      message: "Video upload failed",
      error: err.message,
    });
  }
}

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload image or video to Cloudinary
 * @param {File} file - browser File object (from formData)
 * @param {Object} options
 */
export async function uploadToCloudinary(
  file,
  {
    folder = "studio-gallery",
    resourceType = "auto", // image | video | auto
    quality,
    height,
  } = {}
) {
  const buffer = Buffer.from(await file.arrayBuffer());

  return await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: resourceType,
          quality,
          height,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      )
      .end(buffer);
  });
}

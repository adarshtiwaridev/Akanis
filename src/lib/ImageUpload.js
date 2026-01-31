import fs from "fs";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const imageuploadcloudanary = async (file, folder, height, quality, resourceType = "auto") => {
  const options = { folder, resource_type: resourceType };

  if (height) options.height = height;
  if (quality) options.quality = quality;

  // Read file buffer
  const buffer = fs.readFileSync(file.filepath);

  // Upload directly using file path — better for any file type
  const result = await cloudinary.v2.uploader.upload(file.filepath, options);

  return result;
};

export default imageuploadcloudanary;

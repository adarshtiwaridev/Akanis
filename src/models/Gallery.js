import mongoose from "mongoose";

  const GallerySchema = new mongoose.Schema({
  title: String,
  tags: {
    type: [String],   // 👈 array of strings
    default: [],
  },
  type: {
    type: String,
    enum: ["photo", "video"],
  },
  url: String,
  publicId: String,
}, { timestamps: true });


export default mongoose.models.Gallery ||
  mongoose.model("Gallery", GallerySchema);

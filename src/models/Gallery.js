import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema(
  {
    url: String,
    publicId: String,
    type: {
      type: String,
      enum: ["photo", "video"],
      required: true,
    },
    title: String,
    tags: String,
  },
  { timestamps: true }
);

export default mongoose.models.Gallery ||
  mongoose.model("Gallery", GallerySchema);

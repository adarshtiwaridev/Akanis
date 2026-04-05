import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI;
if (process.env.NODE_ENV === 'development') {
  console.log("Connecting to MongoDB:", MONGODB_URI?.split('@')[0] + '...');
}

if (!MONGODB_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}
let cached = global.mongoose || { conn: null, promise: null };

export default async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

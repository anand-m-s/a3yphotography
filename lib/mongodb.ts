import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

console.log(MONGODB_URI)

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

// This global cache avoids creating many connections in dev
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "portfolio", // you can change the DB name
      })
     .then((mongoose) => {
      // console.log("🚀 MongoDB Connected:", mongoose.connection.host);
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

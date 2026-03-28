import mongoose from 'mongoose';

// Mengambil tautan rahasia dari file .env nanti
const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Tolong masukkan MONGODB_URI di dalam file .env.local Anda');
}

// Mencegah Next.js membuat koneksi baru setiap kali kita me-refresh halaman (mencegah database jebol)
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export const connectMongoDB = async () => {
  if (cached.conn) {
    console.log("Sudah terhubung ke MongoDB (Cached)");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log("Menyambungkan ke MongoDB untuk pertama kalinya...");
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  
  cached.conn = await cached.promise;
  return cached.conn;
};
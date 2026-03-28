import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../lib/mongodb'; // Pastikan path ini mengarah ke file koneksi Anda

// WAJIB HURUF BESAR: GET, dan TANPA KATA 'default'
export async function GET() {
  try {
    await connectMongoDB();

    return NextResponse.json({ 
      status: 'Sukses', 
      message: 'Selamat! Next.js Anda berhasil bersalaman dengan MongoDB! 🎉' 
    });

  } catch (error) {
    console.error("Gagal terhubung:", error);
    return NextResponse.json({ 
      status: 'Error', 
      message: 'Gagal terhubung ke database. Cek terminal untuk detailnya.' 
    }, { status: 500 });
  }
}
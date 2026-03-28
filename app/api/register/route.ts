import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/user';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    // 1. Collect data sent from user
    const { name, email, password } = await request.json();

    // 2. Check the null data
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Semua kolom wajib diisi!" }, { status: 400 });
    }

    await connectMongoDB();

    // 3. Check email already register or using 
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json({ message: "Email sudah terdaftar. Silakan gunakan email lain." }, { status: 400 });
    }

    // Angka 10 adalah tingkat kerumitan acakan (semakin tinggi semakin aman, tapi semakin lambat prosesnya)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Simpan user baru ke database dengan password yang sudah diacak
    await User.create({
      name,
      email,
      password: hashedPassword, 
    });

    return NextResponse.json({ message: "User berhasil didaftarkan!" }, { status: 201 });
  } catch (error) {
    console.error("Error saat mendaftar:", error);
    return NextResponse.json({ message: "Terjadi kesalahan pada server." }, { status: 500 });
  }
}


import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // 1. PENGAMAN: Cek apakah file .env sudah terbaca
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      console.error("❌ KUNCI WEB3FORMS KOSONG!");
      return NextResponse.json({ message: "Konfigurasi server salah." }, { status: 500 });
    }

    const payload = {
      ...data,
      access_key: accessKey, 
    };

    // 2. TEMBAK API DENGAN KTP PENYAMARAN (User-Agent)
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        // 🌟 INI KUNCI RAHASIANYA: Menyamar sebagai browser Chrome asli agar tidak diblokir Cloudflare 🌟
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      },
      body: JSON.stringify(payload),
    });

    const textResponse = await res.text();
    
    let result;
    try {
      result = JSON.parse(textResponse);
    } catch (err) {
      console.error("❌ Masih dicegat Cloudflare / HTML Response:", textResponse);
      return NextResponse.json({ message: "Terblokir oleh sistem keamanan." }, { status: 500 });
    }

    if (result.success) {
      return NextResponse.json({ message: "Email berhasil dikirim!" }, { status: 200 });
    } else {
      console.error("❌ Web3Forms Error:", result);
      return NextResponse.json({ message: "Gagal mengirim email." }, { status: 400 });
    }

  } catch (error) {
    console.error("❌ Server Error Internal:", error);
    return NextResponse.json({ message: "Terjadi kesalahan server." }, { status: 500 });
  }
}
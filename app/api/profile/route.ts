import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import Profile from '@/models/profile';

// Fungsi READ: Mengambil data profil satu-satunya
export async function GET() {
  try {
    await connectMongoDB();
    const profile = await Profile.findOne(); // Mengambil dokumen pertama yang ditemukan
    return NextResponse.json({ profile }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Gagal mengambil profil" }, { status: 500 });
  }
}

// Fungsi UPSERT (Update/Insert): Menyimpan data profil
export async function POST(request: Request) {
  try {
    const { emailUrl,discordUrl, profileImageUrl,cvUrl,instagramUrl, githubUrl, linkedinUrl,profileImageAbt, homeDescription, aboutDescription, skills } = await request.json();
    await connectMongoDB();

    // Cek apakah profil sudah pernah dibuat sebelumnya
    let profile = await Profile.findOne();

    if (profile) {
      // Jika SUDAH ADA, kita Update datanya
      profile.emailUrl = emailUrl;
      profile.discordUrl = discordUrl;
      profile.profileImageUrl = profileImageUrl;
      profile.profileImageAbt = profileImageAbt;
      profile.cvUrl = cvUrl;
      profile.linkedinUrl = linkedinUrl;
      profile.githubUrl = githubUrl;
      profile.instagramUrl = instagramUrl;
      profile.homeDescription = homeDescription;
      profile.aboutDescription = aboutDescription;
      profile.skills = skills;
      await profile.save();
    } else {
      // Jika BELUM ADA sama sekali, kita Create baru
      profile = await Profile.create({
        emailUrl,
        discordUrl,
        profileImageUrl,
        profileImageAbt,
        cvUrl,
        instagramUrl,
        linkedinUrl,
        githubUrl,
        homeDescription,
        aboutDescription,
        skills
      });
    }

    return NextResponse.json({ message: "Profil berhasil diperbarui!", profile }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Gagal memperbarui profil" }, { status: 500 });
  }
}
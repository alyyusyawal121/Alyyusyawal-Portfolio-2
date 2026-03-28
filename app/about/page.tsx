import React from 'react';
import AboutClient from './AboutClient';

// 1. Fungsi pengambil data Profil dari MongoDB (Server-Side)
async function getProfile() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
      cache: 'no-store'
    });
    
    if (!res.ok) return null;
    const data = await res.json();
    return data.profile;
  } catch (error) {
    console.error("Gagal mengambil profil:", error);
    return null;
  }
}

export default async function AboutPage() {
  // 2. Mengambil data sebelum halaman dirender
  const profile = await getProfile();

  // 3. Melemparkan data ke Komponen Client yang memiliki animasi Framer Motion
  return <AboutClient profile={profile} />;
}
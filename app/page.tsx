import React from 'react';
import HomeClient from './HomeClient';

// 1. Fungsi pengambil data Profil dari MongoDB secara aman
async function getProfile() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
    const res = await fetch(`${baseUrl}/api/profile`, {
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

export default async function Home() {
  // 2. Ambil data sebelum halaman dirender di browser
  const profile = await getProfile();

  // 3. Serahkan data ke komponen animasi (Client Component)
  return <HomeClient profile={profile} />;
}
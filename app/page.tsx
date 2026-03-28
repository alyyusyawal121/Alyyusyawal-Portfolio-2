import React from 'react';
import HomeClient from './HomeClient';

// 1. Fungsi pengambil data Profil dari MongoDB secara aman
  async function getProfile() {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? (process.env.NEXT_PUBLIC_API_URL || "https://alyyusyawal.vercel.app")
      : "http://localhost:3000";

    try {
      const res = await fetch(`${baseUrl}/api/profile`, {
        cache: 'no-store',
        // Tambahkan header ini agar Vercel tidak bingung
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!res.ok) return [];
      return res.json();
    } catch (error) {
      console.error("Fetch error:", error);
      return []; 
    }
  }

export default async function Home() {
  // 2. Ambil data sebelum halaman dirender di browser
  const profile = await getProfile();
  const profileData = profile?.profile || profile?.data || profile;

  // 3. Serahkan data ke komponen animasi (Client Component)
  return <HomeClient profile={profileData} />;
}
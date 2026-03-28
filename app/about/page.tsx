import React from 'react';
import AboutClient from './AboutClient';

// 1. Fungsi pengambil data Profil dari MongoDB (Server-Side)
  async function getProfile() {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? `https://${process.env.NEXT_PUBLIC_API_URL}` 
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
export default async function AboutPage() {
  // 2. Mengambil data sebelum halaman dirender
  const profile = await getProfile();
  const profileData = profile?.profile || profile?.data || profile ;

  // 3. Melemparkan data ke Komponen Client yang memiliki animasi Framer Motion
  return <AboutClient profile={profileData} />;
}
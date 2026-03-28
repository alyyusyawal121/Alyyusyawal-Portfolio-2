import React from 'react';
import AboutClient from './AboutClient';

// 1. Fungsi pengambil data Profil dari MongoDB (Server-Side)
async function getProfile() {
  // 1. Trik untuk mendapatkan URL asli secara otomatis
  const baseUrl = process.env.NEXT_PUBLIC_API_URL 
    ? process.env.NEXT_PUBLIC_API_URL 
    : process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : "";

  // 2. Fetch menggunakan baseUrl yang sudah dipastikan lengkap
  const res = await fetch(`${baseUrl}/api/portfolio`, {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error("Failed to take data from database");
  }
  return res.json();
}

export default async function AboutPage() {
  // 2. Mengambil data sebelum halaman dirender
  const profile = await getProfile();

  // 3. Melemparkan data ke Komponen Client yang memiliki animasi Framer Motion
  return <AboutClient profile={profile} />;
}
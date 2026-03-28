import React from 'react';
import HomeClient from './HomeClient';

// 1. Fungsi pengambil data Profil dari MongoDB secara aman
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

export default async function Home() {
  // 2. Ambil data sebelum halaman dirender di browser
  const profile = await getProfile();

  // 3. Serahkan data ke komponen animasi (Client Component)
  return <HomeClient profile={profile} />;
}
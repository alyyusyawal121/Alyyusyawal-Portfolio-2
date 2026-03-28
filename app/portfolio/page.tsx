import React from 'react';
import PortfolioClient from './PortfolioClient';

// 1. Fungsi pengambil data yang aman (Server-Side)
async function getPortfolio() {
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

export default async function PortfolioPage() {
  // 2. Ambil data sebelum halaman dirender
  const data = await getPortfolio();
  const listPortfolio = data?.portfolios || []; 

  // 3. Serahkan data ke komponen animasi
  return <PortfolioClient listPortfolio={listPortfolio} />;
}
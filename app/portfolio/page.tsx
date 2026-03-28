import React from 'react';
import PortfolioClient from './PortfolioClient';

// 1. Fungsi pengambil data yang aman (Server-Side)
  async function getPortfolio() {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? (process.env.NEXT_PUBLIC_API_URL || "https://alyyusyawal.vercel.app")
      : "http://localhost:3000";

    try {
      const res = await fetch(`${baseUrl}/api/portfolio`, {
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

export default async function PortfolioPage() {
  // 2. Ambil data sebelum halaman dirender
  const data = await getPortfolio();
  const listPortfolio = data?.portfolios || []; 

  // 3. Serahkan data ke komponen animasi
  return <PortfolioClient listPortfolio={listPortfolio} />;
}
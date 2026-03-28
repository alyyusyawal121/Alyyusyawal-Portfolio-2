import React from 'react';
import PortfolioClient from './PortfolioClient';

// 1. Fungsi pengambil data yang aman (Server-Side)
async function getPortfolio(){
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/portfolio`,{
      cache: 'no-store', // Selalu ambil data terbaru (dinamis)
    });
    
    if(!res.ok){
      return { portfolios: [] }; 
    }
    return res.json();
  } catch (error) {
    console.error("Gagal mengambil data database:", error);
    return { portfolios: [] };
  }
}

export default async function PortfolioPage() {
  // 2. Ambil data sebelum halaman dirender
  const data = await getPortfolio();
  const listPortfolio = data?.portfolios || []; 

  // 3. Serahkan data ke komponen animasi
  return <PortfolioClient listPortfolio={listPortfolio} />;
}
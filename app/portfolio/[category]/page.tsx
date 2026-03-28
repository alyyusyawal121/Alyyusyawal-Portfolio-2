import React from 'react';
import CategoryClient from './CategoryClient';

// 1. Fungsi pemanggil API
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
export default async function CategoryPage({ params }: { params: { category: string } }) {
  // 2. Tangkap parameter URL
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  // 3. Ambil data asli dari MongoDB
  const data = await getPortfolio();
  const allProjects = data.portfolios || [];

  // 4. Saring data proyek berdasarkan kategori yang dipilih
  const filteredProjects = allProjects.filter(
    (item: any) => (item.category || 'Others').toLowerCase() === decodedCategory.toLowerCase()
  );

  // 5. Serahkan data ke komponen animasi (Client Component)
  return (
    <CategoryClient 
      decodedCategory={decodedCategory} 
      filteredProjects={filteredProjects} 
      rawCategory={category} // Mengirim URL asli untuk navigasi tombol detail
    />
  );
}
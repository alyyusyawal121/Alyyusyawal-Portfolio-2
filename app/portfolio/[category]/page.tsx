import React from 'react';
import CategoryClient from './CategoryClient';

// 1. Fungsi pemanggil API
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
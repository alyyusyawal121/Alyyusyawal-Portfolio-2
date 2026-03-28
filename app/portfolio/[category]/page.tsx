import React from 'react';
import CategoryClient from './CategoryClient';

// 1. Fungsi pemanggil API
async function getPortfolio(){
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
    const res = await fetch(`${baseUrl}/api/portfolio`,{
      cache: 'no-store',
    });
    if(!res.ok) return { portfolios: [] };
    return res.json();
  } catch (error) {
    console.error("Gagal mengambil data database:", error);
    return { portfolios: [] };
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
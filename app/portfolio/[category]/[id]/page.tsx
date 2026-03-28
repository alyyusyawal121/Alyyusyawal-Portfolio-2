import React from 'react';
import ProjectClient from './ProjectClient';

// 1. Fungsi pengambil data yang aman
async function getPortfolio() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/portfolio`, {
      cache: 'no-store'
    });
    if(!res.ok) return { portfolios: [] };
    return res.json();
  } catch (error) {
    console.error("Gagal fetch portfolio:", error);
    return { portfolios: [] };
  }
}

export default async function ProjectDetail({ params }: { params: { category: string, id: string } }) {
  // 2. Tangkap parameter
  const { category, id } = await params; 
  const decodedCategory = decodeURIComponent(category);
  
  // 3. Ambil data database
  const data = await getPortfolio();
  const allProjects = data.portfolios || [];
  
  // 4. Cari Proyek Spesifik
  const project = allProjects.find((item: any) => item._id === id);

  // 5. Serahkan data ke komponen animasi (Client Component)
  return (
    <ProjectClient 
      project={project} 
      category={category} 
      decodedCategory={decodedCategory} 
    />
  );
}
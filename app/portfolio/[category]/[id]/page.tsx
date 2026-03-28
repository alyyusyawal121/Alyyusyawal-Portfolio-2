import React from 'react';
import ProjectClient from './ProjectClient';

// 1. Fungsi pengambil data yang aman
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
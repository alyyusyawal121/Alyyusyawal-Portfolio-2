import React from 'react'

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
}

export const blogs: BlogPost[] = [
  {
    id: 1,
    title: "Menguasai Next.js 14 untuk Pemula",
    description: "Panduan lengkap membangun aplikasi web modern yang cepat dan SEO-friendly menggunakan fitur terbaru dari Next.js.",
    date: "12 Okt 2023",
    readTime: "5 min read",
    tags: ["Next.js", "Tutorial"],
  },
  {
    id: 2,
    title: "Tips Mendesain UI dengan Tailwind CSS",
    description: "Cara cepat dan efektif membuat antarmuka pengguna yang menawan tanpa harus keluar dari file HTML Anda.",
    date: "05 Nov 2023",
    readTime: "4 min read",
    tags: ["Tailwind", "Desain UI"],
  },
  {
    id: 3,
    title: "Mengenal MongoDB untuk Database Modern",
    description: "Mengapa database NoSQL seperti MongoDB sangat cocok untuk pengembangan aplikasi web skala menengah hingga besar.",
    date: "20 Des 2023",
    readTime: "7 min read",
    tags: ["MongoDB", "Database"],
  }
];
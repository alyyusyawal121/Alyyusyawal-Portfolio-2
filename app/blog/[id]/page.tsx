import React from 'react'
import Link from 'next/link'

// 1. Tambahkan fungsi pengambil data dari API
async function getBlogs() {
  const res = await fetch('http://localhost:3000/api/blog', {
    cache: 'no-store'
  });
  if (!res.ok) {
    throw new Error("Failed to fetch blogs from database");
  }
  return res.json();
}

export default async function BlogDetail({ params }: any) {
  // 2. Tangkap ID dari URL (yang diklik oleh user)
  const { id } = await params;

  // 3. Ambil semua data blog dari MongoDB
  const data = await getBlogs();
  const allBlogs = data.blogs || [];

  // 4. Cari artikel yang _id-nya cocok dengan ID di URL
  const blog = allBlogs.find((b: any) => b._id === id);

  // Jika artikel tidak ditemukan atau ID salah
  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Artikel tidak ditemukan 🥲</h1>
        <Link href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline">
          &larr; Kembali ke Daftar Artikel
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 px-6 py-24 md:px-16 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        
        {/* Tombol Kembali */}
        <Link href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline mb-8 inline-block font-medium">
          &larr; Kembali ke Daftar Artikel
        </Link>

        {/* Gambar Thumbnail Artikel */}
        <div className="w-full h-64 md:h-[400px] mb-8 rounded-2xl overflow-hidden shadow-md">
          <img 
            src={blog.imageUrl} 
            alt={blog.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Judul Artikel Dinamis */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
          {blog.title}
        </h1>

        {/* Info Meta & Tags */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-8 border-b pb-8 dark:border-slate-800">
          <span>{blog.date}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
          <span>{blog.readTime}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
          
          {/* Menampilkan Tags */}
          <div className="flex gap-2">
            {blog.tags?.map((tag: string, index: number) => (
              <span key={index} className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Isi Artikel Dinamis */}
        <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
          {blog.description} 
        </p>



      </div>
    </main>
  )
}
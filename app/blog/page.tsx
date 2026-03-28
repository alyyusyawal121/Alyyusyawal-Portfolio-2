import React from 'react'
import Link from 'next/link'

async function getBlog(){
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/portfolio`,{
    cache:'no-store'
  });
  if(!res.ok){
    throw new Error("Failed to take data from database");
  }
  return res.json();
}

export default async function BlogPage() {
  const data = await getBlog();
  const listBlog = data.blogs || [];
  
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 px-6 py-16 md:px-16 flex flex-col items-center">
      
      {/* Header Halaman */}
      <div className="text-center mb-16 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          Blog & <span className="text-blue-600 dark:text-blue-400">Artikel</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          Kumpulan artikel, tutorial, dan opini seputar pengembangan web, desain antarmuka, dan teknologi terbaru.
        </p>
      </div>

      {/* Daftar Blog */}
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
        {listBlog.map((blog: any) => (
          <article 
            key={blog._id} // <- Ubah ke _id
            className="group flex flex-col md:flex-row bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-800"
          >
            {/* Area Gambar (Thumbnail) */}
            <div className="w-full md:w-2/5 h-64 md:h-auto bg-slate-200 dark:bg-slate-800 relative overflow-hidden flex-shrink-0">
              {/* Gambar dinamis dari database */}
              <img 
                src={blog.imageUrl} 
                alt={blog.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Efek Hover Gambar */}
              <div className="absolute inset-0 bg-blue-600/10 dark:bg-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Area Konten (Teks) */}
            <div className="p-6 md:p-8 flex flex-col flex-grow justify-center">
              
              {/* Meta Info (Tanggal & Waktu Baca) */}
              <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-3">
                <span>{blog.date}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                <span>{blog.readTime}</span>
              </div>

              {/* Judul & Deskripsi */}
              <Link href={`/blog/${blog._id}`} className="block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 leading-snug">
                  {blog.title}
                </h3>
              </Link>
              <p className="text-slate-600 dark:text-slate-400 text-base mb-6 line-clamp-2 md:line-clamp-3">
                {blog.description}
              </p>

              {/* Bagian Bawah: Tags & Tombol Baca */}
              <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag: string, index: number) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-50 dark:text-blue-300 dark:bg-blue-900/30 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Tombol Baca Selengkapnya */}
                <Link href={`/blog/${blog._id}`} className="inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                  Baca Artikel
                  <svg className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>

              </div>
            </div>
          </article>
        ))}
      </div>
      
    </main>
  )
}
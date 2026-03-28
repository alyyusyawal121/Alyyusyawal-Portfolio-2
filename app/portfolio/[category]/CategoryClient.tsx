"use client"; 

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowLeft } from "react-icons/fa";

export default function CategoryClient({ 
  decodedCategory, 
  filteredProjects,
  rawCategory // URL asli (sebelum di-decode) untuk keperluan routing kembali
}: { 
  decodedCategory: string, 
  filteredProjects: any[],
  rawCategory: string
}) {

  // Konfigurasi Animasi Framer Motion (Efek Stagger)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 12 } 
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#1A1E2E] transition-colors duration-300 px-6 py-32 md:px-16 flex flex-col items-center relative overflow-hidden">
      
      {/* 🌟 Hiasan Background Glow (Menyamai tema utama) 🌟 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-5%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl -z-10"
        />
      </div>

      <div className="w-full max-w-7xl mx-auto relative z-10">
        
        {/* Tombol Kembali yang Elegan */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5 }}
        >
          <Link 
            href="/portfolio" 
            className="inline-flex items-center gap-2 text-blue-600 dark:text-yellow-400 hover:text-blue-700 dark:hover:text-yellow-300 hover:-translate-x-2 transition-transform mb-10 font-bold"
          >
            <FaArrowLeft className="w-4 h-4" /> Back to Categories
          </Link>
        </motion.div>

        {/* Header Judul Dinamis */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16 border-b border-slate-200 dark:border-slate-800/50 pb-8"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight drop-shadow-sm">
            Category:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 dark:from-yellow-400 dark:to-yellow-200">
              {decodedCategory}
            </span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-gray-400 font-medium">
            Displaying <span className="text-blue-600 dark:text-yellow-400 font-extrabold">{filteredProjects.length}</span> best {filteredProjects.length > 1 ? 'projects' : 'project'} in this field.
          </p>
        </motion.div>

        {/* Grid Daftar Proyek (Dianimasikan) */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProjects.map((item: any) => (
            <motion.div 
              key={item._id} 
              variants={cardVariants}
              className="group flex flex-col bg-white dark:bg-[#202538] rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_15px_40px_rgba(37,99,235,0.15)] hover:-translate-y-2 transition-all duration-300 border border-slate-200 dark:border-slate-800/50 relative h-full"
            >
              
              {/* Wadah Gambar dengan Efek Hover Zoom */}
              <div className="h-56 relative overflow-hidden bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay gelap transparan saat hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>

              {/* Konten Kartu */}
              <div className="p-8 flex flex-col flex-grow">
                
                {/* Judul Proyek */}
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-yellow-400 transition-colors drop-shadow-sm">
                  {item.title}
                </h3>
                
                {/* Tampilan Teknologi (Maksimal 3) */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.technologies?.slice(0, 3).map((tech: string, i: number) => (
                    <span key={i} className="text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-[#151822] px-3 py-1 rounded-full shadow-sm border border-slate-200/50 dark:border-slate-700/50">
                      {tech}
                    </span>
                  ))}
                  {item.technologies?.length > 3 && (
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 px-3 py-1 rounded-full shadow-sm border border-slate-200/50 dark:border-slate-800">
                      +{item.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Deskripsi */}
                <p className="text-slate-600 dark:text-gray-400 text-sm mb-8 flex-grow line-clamp-3 leading-relaxed opacity-90">
                  {item.description}
                </p>
                
                {/* Tombol Detail Full Width */}
                <Link 
                  href={`/portfolio/${rawCategory}/${item._id}`} 
                  className="mt-auto w-full text-center py-3 bg-slate-100 dark:bg-slate-800/50 text-blue-600 dark:text-yellow-400 font-bold rounded-xl group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-yellow-400 dark:group-hover:text-slate-900 transition-all duration-300 shadow-sm"
                >
                  View Project Details
                </Link>

              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </main>
  );
}
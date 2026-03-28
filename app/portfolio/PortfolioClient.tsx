"use client"; 

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaFolderOpen, FaExclamationCircle } from "react-icons/fa"; 

export default function PortfolioClient({ listPortfolio }: { listPortfolio: any[] }) {
  // 🌟 PENGAMAN: Jika database masih kosong
  if (listPortfolio.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-[#1A1E2E] flex flex-col items-center justify-center px-6 transition-colors duration-300">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          <FaExclamationCircle className="w-20 h-20 text-slate-300 dark:text-slate-700 mb-6" />
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">No Projects Yet</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md">
            You haven't added any portfolio projects yet. Please add your first masterpiece through the Dashboard.
          </p>
        </motion.div>
      </main>
    );
  }

  // Mengelompokkan Kategori
  const uniqueCategories = [...new Set(listPortfolio.map((item: any) => item.category || 'Others'))];
  const categoryStats = uniqueCategories.map(cat => {
    return {
      name: cat as string,
      count: listPortfolio.filter((item: any) => (item.category || 'Others') === cat).length
    }
  });

  // Konfigurasi Animasi Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Jeda kemunculan antar kartu
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
    <main className="min-h-screen bg-slate-50 dark:bg-[#1A1E2E] transition-colors duration-300 px-6 pt-32 pb-24 md:px-16 flex flex-col items-center relative overflow-hidden">
      
      {/* Hiasan Background Glow (Menyamai Home & Contact) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[0%] left-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl -z-10"
        />
      </div>

      <div className="w-full max-w-7xl mx-auto relative z-10">
        
        {/* Bagian Header Animasi */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight drop-shadow-sm">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 dark:from-yellow-400 dark:to-yellow-200">Portfolio</span>
          </h1>
          <div className="w-24 h-1.5 bg-blue-600 dark:bg-yellow-400 mx-auto rounded-full mb-6"></div>
          <p className="text-lg md:text-xl text-slate-600 dark:text-gray-400 leading-relaxed">
            Explore the various projects I've worked on. Select a category below to see the technologies and final results of each masterpiece.
          </p>
        </motion.div>

        {/* Grid Kartu Kategori Animasi */}
        <motion.div 
          className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {categoryStats.map((cat, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Link 
                href={`/portfolio/${cat.name}`} 
                className="group relative flex flex-col items-center justify-center p-10 bg-white dark:bg-[#202538] rounded-3xl shadow-sm hover:shadow-[0_15px_40px_rgba(37,99,235,0.15)] hover:-translate-y-2 transition-all duration-300 border border-slate-200 dark:border-slate-800/50 h-full"
              >
                {/* Efek Hover Background Card */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />

                {/* Ikon Animasi Hover */}
                <div className="relative w-20 h-20 bg-blue-50 dark:bg-[#151822] border border-blue-100 dark:border-slate-700/50 text-blue-600 dark:text-yellow-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform shadow-sm duration-300">
                  <FaFolderOpen className="w-8 h-8" />
                </div>
                
                <h2 className="relative text-2xl font-bold text-slate-900 dark:text-white text-center mb-4 group-hover:text-blue-600 dark:group-hover:text-yellow-400 transition-colors line-clamp-1">
                  {cat.name} 
                </h2>
                
                <span className="relative inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50">
                  {cat.count} {cat.count > 1 ? 'Projects' : 'Project'}
                </span>
                
              </Link>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </main>
  );
}
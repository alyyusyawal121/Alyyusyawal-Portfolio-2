"use client"; // Wajib karena animasi berjalan di sisi klien

import React from 'react';
import { motion, Variants } from 'framer-motion';

export default function Loading() {
  // 1. Konfigurasi animasi untuk teks (Stagger effect yang lebih halus)
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Jeda antar huruf lebih cepat & mulus
        delayChildren: 0.2, 
      }
    }
  };

const letterVariants: Variants = { 
  hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { type: "spring", damping: 12, stiffness: 200 } 
  }
};

  // Menggunakan nama Anda alih-alih "AGENSIDIGITAL"
  const myName = "ALYYUSYAWAL".split("");

  return (
    // Background menyatu dengan tema halaman utama (#1A1E2E)
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-[#1A1E2E] space-y-10 overflow-hidden relative p-6 transition-colors duration-300">
      
      {/* 🌟 Efek Gradasi Latar Belakang Khas Portofolio Anda 🌟 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none flex items-center justify-center">
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[400px] h-[400px] bg-blue-600/20 dark:bg-blue-600/10 rounded-full blur-[100px] -z-10"
        />
        <motion.div 
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute w-[300px] h-[300px] bg-purple-600/20 dark:bg-yellow-500/10 rounded-full blur-[80px] -z-10 translate-x-20"
        />
      </div>

      {/* 🌟 Bagian Visual: Cincin Orbital Premium & Inisial 🌟 */}
      <div className="relative flex items-center justify-center w-24 h-24 mb-4">
        
        {/* Cincin Luar (Berputar lambat) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-slate-300 dark:border-slate-700 opacity-50"
        />
        
        {/* Cincin Tengah (Berputar cepat dengan warna aksen) */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="absolute inset-2 rounded-full border-t-2 border-r-2 border-blue-600 dark:border-yellow-400 opacity-90 shadow-[0_0_15px_rgba(37,99,235,0.5)] dark:shadow-[0_0_15px_rgba(250,204,21,0.3)]"
        />
        
        {/* Inner Glowing Pulse (Denyut di dalam) */}
        <motion.div
          animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.3, 0.8, 0.3] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute inset-4 rounded-full bg-blue-600/20 dark:bg-yellow-400/20 blur-md"
        />
        
        {/* Inisial Nama (Elegan & Statis di tengah) */}
        <span className="text-4xl font-extrabold text-blue-600 dark:text-yellow-400 z-10 drop-shadow-md">
          A
        </span>
      </div>

      {/* 🌟 Bagian Teks: Nama Muncul Per Huruf 🌟 */}
      <div className="flex flex-col items-center gap-5 text-center relative z-10">
        <motion.div 
          className="flex text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-[0.3em] md:tracking-[0.4em] ml-2 md:ml-4" // margin-left untuk mengimbangi tracking huruf terakhir
          variants={textContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {myName.map((letter, index) => (
            <motion.span key={index} variants={letterVariants}>
              {letter}
            </motion.span>
          ))}
        </motion.div>
        
        {/* Teks Subtitle Pendek & Berkelas */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex items-center gap-3"
        >
          <div className="w-8 h-px bg-slate-300 dark:bg-slate-700"></div>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-bold tracking-[0.2em] uppercase">
            Memuat Pengalaman
          </p>
          <div className="w-8 h-px bg-slate-300 dark:bg-slate-700"></div>
        </motion.div>
      </div>

    </div>
  );
}
"use client"; 

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaArrowLeft } from "react-icons/fa";

export default function ProjectClient({ project, category, decodedCategory }: { project: any, category: string, decodedCategory: string }) {

  // Jika Data Tidak Ditemukan
  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#1A1E2E]">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">Project Not Found 🕵️‍♂️</h1>
        <Link 
          href={`/portfolio/${category}`} 
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all"
        >
          Back to {decodedCategory} Category
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#1A1E2E] transition-colors duration-300">
      
      {/* 🌟 HEADER GELAP 🌟 */}
      <div className="relative w-full pt-32 pb-48 px-6 md:px-16 bg-[#0B0F19] flex flex-col items-center">
        
        {/* Glow Halus di Background Header */}
        <div className="absolute top-0 inset-x-0 h-full bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none" />

        <div className="w-full max-w-7xl relative z-10 flex flex-col items-start">
          
          {/* Badge Kategori & Tombol Kembali (Dianimasikan) */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="flex flex-col items-start"
          >
            <span className="inline-block px-5 py-2 bg-blue-600 text-white font-bold text-sm rounded-full mb-6 tracking-widest shadow-lg uppercase">
              {project.category || 'Uncategorized'}
            </span>

            <Link 
              href={`/portfolio/${category}`} 
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 backdrop-blur-md text-white rounded-full font-medium transition-all mb-10 group"
            >
              <FaArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
            </Link>
          </motion.div>

          {/* Judul Besar */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-[5rem] font-extrabold text-white leading-[1.1] drop-shadow-md max-w-5xl"
          >
            {project.title}
          </motion.h1>
          
        </div>
      </div>

      {/* 🌟 KARTU KONTEN UTAMA (Overlapping Header) 🌟 */}
      <div className="max-w-7xl mx-auto px-4 md:px-16 -mt-32 relative z-20 pb-24">
        
        {/* Kartu menimpa header dengan animasi Slide Up */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="bg-white dark:bg-[#202538] rounded-[2rem] p-6 md:p-12 lg:p-16 shadow-2xl shadow-blue-900/5 dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row gap-12 lg:gap-20"
        >
          
          {/* KOLOM KIRI: Cerita & Gambar */}
          <div className="lg:w-[65%] flex flex-col">
            
            <div className="flex items-center gap-6 mb-8">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">About the Project</h2>
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
            </div>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line text-pretty mb-12">
              {project.description}
            </p>

            <div className="w-full rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm bg-slate-100 dark:bg-slate-900 mt-auto">
              <img 
                src={project.imageUrl} 
                alt={`Screenshot ${project.title}`} 
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

          </div>

          {/* KOLOM KANAN: Sidebar Teknologi & Link */}
          <div className="lg:w-[35%] flex flex-col gap-8">
            
            <div className="bg-slate-50 dark:bg-[#151822] rounded-3xl p-8 border border-slate-100 dark:border-slate-800/80">
              <h3 className="text-sm font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] mb-6">
                Technologies & Tools
              </h3>
              
              <div className="flex flex-wrap gap-3">
                {project.technologies?.map((tech: string, index: number) => (
                  <span 
                    key={index} 
                    className="px-5 py-2.5 bg-white dark:bg-[#202538] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm text-sm font-bold rounded-full hover:border-blue-500 dark:hover:border-yellow-400 transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project.projectUrl ? (
              <a 
                href={project.projectUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-lg rounded-2xl transition-all shadow-lg hover:shadow-blue-600/25 hover:-translate-y-1"
              >
                Visit Website <FaExternalLinkAlt className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            ) : (
              <div className="w-full py-5 bg-slate-100 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 text-center font-bold rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                Link Not Available
              </div>
            )}

          </div>

        </motion.div>
      </div>

    </main>
  );
}
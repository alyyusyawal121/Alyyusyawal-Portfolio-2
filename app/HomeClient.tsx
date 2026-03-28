"use client"; // Kunci utama agar Framer Motion bisa berjalan

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

export default function HomeClient({ profile }: { profile: any }) {
  // 1. Data dinamis dari Database
  const imageUrl = profile?.profileImageUrl || "https://via.placeholder.com/400";
  const description = profile?.homeDescription || "A junior programmer who’s always curious and never stops learning. My passion lies in building websites, but I also enjoy exploring graphic design, and machine learning.";
  
  const cvUrl = profile?.cvUrl || "";
  const instagram = profile?.instagramUrl || "";
  const github = profile?.githubUrl || "";
  const linkedin = profile?.linkedinUrl || "";

  // 2. Konfigurasi Animasi Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Jeda waktu animasi antar kolom
        delayChildren: 0.1,
      }
    }
  };

    const itemVariants: Variants = {
    hidden: { 
        opacity: 0, 
        y: 30 
    },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { 
        duration: 0.7, 
        ease: [0.22, 1, 0.36, 1] 
        } 
    }
    };
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#1A1E2E] flex items-center justify-center py-24 px-6 md:px-12 transition-colors duration-300 relative overflow-hidden">
      
      {/* 🌟 Animasi Hiasan Background Glow 🌟 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl"
        />
      </div>

      {/* 🌟 Wadah Utama dengan Animasi Bertahap (Stagger) 🌟 */}
      <motion.div 
        className="max-w-7xl mx-auto w-full grid lg:grid-cols-[1.1fr_1fr_1.2fr] md:grid-cols-2 grid-cols-1 items-center gap-12 lg:gap-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        {/* KOLOM 1: NAMA & SOSIAL MEDIA */}
        <motion.div className="order-2 md:order-1" variants={itemVariants}>
          <h1 className="text-5xl lg:text-[4rem] font-extrabold leading-[1.1] text-slate-900 dark:text-white tracking-tight drop-shadow-sm">
            Alyyusyawal <br /> Arjuna Widardi
          </h1>

          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: 64 }} 
            transition={{ delay: 0.8, duration: 0.5 }}
            className="h-[4px] mt-6 bg-yellow-500 dark:bg-yellow-400 rounded-full" 
          />

          <div className="flex gap-6 mt-10 text-2xl text-slate-600 dark:text-gray-300">
            {instagram && (
              <a href={instagram} target="_blank" rel="noreferrer noopener" className="hover:text-yellow-600 dark:hover:text-yellow-400 hover:-translate-y-1 transition-all">
                <FaInstagram />
              </a>
            )}
            {github && (
              <a href={github} target="_blank" rel="noreferrer noopener" className="hover:text-yellow-600 dark:hover:text-yellow-400 hover:-translate-y-1 transition-all">
                <FaGithub />
              </a>
            )}
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noreferrer noopener" className="hover:text-yellow-600 dark:hover:text-yellow-400 hover:-translate-y-1 transition-all">
                <FaLinkedin />
              </a>
            )}
          </div>
        </motion.div>

        {/* KOLOM 2: FOTO DENGAN BINGKAI MIRING */}
        <motion.div className="order-1 md:order-2 flex justify-center" variants={itemVariants}>
          <div className="relative transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(37,99,235,0.25)] w-[260px] h-[340px] md:w-[300px] md:h-[380px] lg:w-[320px] lg:h-[420px] group">
            
            {/* Animasi Glow di Belakang Foto saat Hover */}
            <div className="absolute inset-0 rounded-3xl bg-blue-500/20 translate-x-4 translate-y-8 blur-3xl opacity-60 dark:opacity-40 group-hover:opacity-80 transition-opacity duration-500" />
            
            <div className="absolute inset-0 bg-blue-600 rounded-3xl rotate-3 scale-105 opacity-90 shadow-xl transition-transform duration-500 group-hover:rotate-6" />
            
            <div className="absolute inset-0 bg-slate-200 dark:bg-gradient-to-br dark:from-[#151822] dark:to-[#0E1120] rounded-3xl border-[3px] border-white rotate-[-1deg] shadow-2xl overflow-hidden flex items-center justify-center transition-transform duration-500 group-hover:rotate-0">
              <img src={imageUrl} alt="Profile" className="w-full h-full object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-700" />
            </div>
            
          </div>
        </motion.div>

        {/* KOLOM 3: DESKRIPSI & TOMBOL */}
        <motion.div className="order-3 md:order-3 pt-6 md:pt-0" variants={itemVariants}>
          <p className="uppercase tracking-widest text-xs font-bold text-blue-600 dark:text-yellow-400 mb-3">Introduction</p>
          <h2 className="text-3xl lg:text-4xl font-extrabold leading-tight text-slate-900 dark:text-white mb-4">A Junior Programmer</h2>
          <p className="text-base lg:text-lg text-slate-600 dark:text-gray-300 leading-relaxed mb-10 opacity-90 text-pretty">
            {description}
          </p>

          <div className="flex flex-wrap gap-6 items-center">
            {cvUrl ? (
              <a href={cvUrl} target="_blank" rel="noreferrer noopener" className="text-yellow-600 dark:text-yellow-400 font-bold hover:text-yellow-700 dark:hover:text-yellow-300 hover:tracking-wide transition-all border-b-2 border-transparent hover:border-yellow-400 pb-1">
                Download CV
              </a>
            ) : (
              <span className="text-slate-400 cursor-not-allowed border-b-2 border-transparent pb-1">CV Belum Tersedia</span>
            )}
            
            <a href="/contact" className="text-slate-500 dark:text-gray-400 font-medium hover:text-slate-900 dark:hover:text-white transition-all border-b-2 border-transparent hover:border-white pb-1 relative group">
              Contact Me
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-900 dark:bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
        </motion.div>

      </motion.div>
    </main>
  );
}
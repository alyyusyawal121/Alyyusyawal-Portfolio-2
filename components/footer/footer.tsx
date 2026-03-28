"use client";

import React from 'react';
import Link from 'next/link';
// Import react-icons agar seragam dengan halaman lain
import { FaInstagram, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    // Background Dark Mode (#1A1E2E) dengan sedikit sentuhan transparan di atasnya
    <footer className="bg-white dark:bg-[#151822] border-t border-slate-200 dark:border-slate-800/80 transition-colors duration-300 relative z-20">
      
      <div className="mx-auto w-full max-w-7xl px-6 py-12 lg:py-16">
        
        {/* ========================================================= */}
        {/* BAGIAN ATAS: Logo & Link Navigasi Cepat */}
        {/* ========================================================= */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10">
          
          {/* Logo & Deskripsi Singkat */}
          <div className="text-center md:text-left max-w-sm">
            <Link href="/" className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight group inline-block mb-4">
              <span className="text-blue-600 dark:text-yellow-400 group-hover:opacity-80 transition-opacity">A</span>lyyusyawal
            </Link>
            
            {/* 🌟 TEKS AJAKAN (CALL TO ACTION) YANG BARU 🌟 */}
            <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed">
              Ready to build something amazing together? Let's team up to craft elegant, responsive, and user-centric digital experiences. Your next big idea starts here!
            </p>
          </div>

          {/* Quick Links (Navigasi Bawah) */}
          <div className="flex gap-8 text-sm font-medium">
            <Link href="/portfolio" className="text-slate-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 transition-colors relative group">
              Portfolio
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-600 dark:bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/about" className="text-slate-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 transition-colors relative group">
              About Me
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-600 dark:bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/contact" className="text-slate-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 transition-colors relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-600 dark:bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

        </div>

        {/* ========================================================= */}
        {/* GARIS PEMBATAS */}
        {/* ========================================================= */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent my-8 lg:my-10"></div>

        {/* ========================================================= */}
        {/* BAGIAN BAWAH: Copyright & Sosial Media */}
        {/* ========================================================= */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6">
          
          {/* Teks Copyright */}
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center md:text-left">
            © {currentYear} <span className="font-semibold text-slate-700 dark:text-gray-300">Alyyusyawal Arjuna Widardi</span>. All Rights Reserved.
          </p>

          {/* Ikon Sosial Media (Menggunakan react-icons) */}
          <div className="flex items-center gap-6">
            
            {/* Email */}
            <Link 
              href="/contact" 
              className="text-slate-400 hover:text-blue-600 dark:hover:text-yellow-400 hover:-translate-y-1 transition-all duration-300"
              aria-label="Contact via Email"
            >
              <FaEnvelope className="w-5 h-5" />
            </Link>

            {/* LinkedIn */}
            <a 
              href="https://linkedin.com/in/alyyusyawal" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-600 dark:hover:text-yellow-400 hover:-translate-y-1 transition-all duration-300"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>

            {/* GitHub */}
            <a 
              href="https://github.com/alyyusyawal" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-900 dark:hover:text-white hover:-translate-y-1 transition-all duration-300"
              aria-label="GitHub Profile"
            >
              <FaGithub className="w-5 h-5" />
            </a>

            {/* Instagram */}
            <a 
              href="https://instagram.com/alyyusyawal" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 hover:-translate-y-1 transition-all duration-300"
              aria-label="Instagram Profile"
            >
              <FaInstagram className="w-5 h-5" />
            </a>

          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;
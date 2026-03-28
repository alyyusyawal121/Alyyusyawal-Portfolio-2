"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// Import ikon modern untuk menu mobile dan tema
import { FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';

const Links = [
  { id: 1, name: 'Home', url: '/' },
  { id: 2, name: 'Portfolio', url: '/portfolio' },
  { id: 3, name: 'About', url: '/about' },
  { id: 4, name: 'Contact', url: '/contact' },
];

const Navbar = () => {
  const pathname = usePathname();
  
  // State untuk Tema dan Menu Mobile
  const [theme, setTheme] = useState("dark"); // Kita jadikan Dark Mode sebagai default Premium
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Efek 1: Deteksi Scroll untuk membuat Navbar lebih menyusut saat di-scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Efek 2: Setup Tema (Sinkronisasi dengan Local Storage)
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    } else {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Efek 3: Tutup menu mobile setiap kali pindah halaman
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    // Navbar Induk: Efek Glassmorphism (Kaca) dan selalu melayang (Sticky)
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? "bg-white/80 dark:bg-[#1A1E2E]/80 backdrop-blur-lg border-slate-200 dark:border-slate-800/80 py-4 shadow-sm" 
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* LOGO: Teks Premium */}
        <Link 
          href="/" 
          className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight group"
        >
          <span className="text-blue-600 dark:text-yellow-400 group-hover:opacity-80 transition-opacity">A</span>lyyusyawal
        </Link>

        {/* ========================================================= */}
        {/* LAYAR DESKTOP: Menu Links & Kontrol Tema */}
        {/* ========================================================= */}
        <div className="hidden md:flex items-center gap-10">
          
          {/* Links */}
          <div className="flex items-center gap-8">
            {Links.map(link => {
              const isActive = pathname === link.url;
              return (
                <Link
                  key={link.id}
                  href={link.url}
                  className={`text-sm font-bold tracking-wide transition-all duration-300 relative group ${
                    isActive
                      ? "text-blue-600 dark:text-yellow-400"
                      : "text-slate-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white"
                  }`}
                >
                  {link.name}
                  
                  {/* Garis Bawah Melayang (Underline Hover Effect) */}
                  <span className={`absolute -bottom-2 left-0 h-0.5 bg-blue-600 dark:bg-yellow-400 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}></span>
                </Link>
              )
            })}
          </div>

          {/* Garis Pemisah (Divider) */}
          <div className="w-px h-6 bg-slate-300 dark:bg-slate-700"></div>

          {/* Tombol Tema (Bulat, Ikon Elegan) */}
          <button 
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-[#202538] text-slate-600 dark:text-yellow-400 hover:scale-110 hover:shadow-md transition-all duration-300 border border-slate-200 dark:border-slate-700/50"
          >
            {theme === "light" ? <FaMoon className="w-4 h-4" /> : <FaSun className="w-4 h-4" />}
          </button>
        </div>

        {/* ========================================================= */}
        {/* LAYAR MOBILE: Hamburger & Tombol Tema */}
        {/* ========================================================= */}
        <div className="flex md:hidden items-center gap-4">
          
          <button 
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-100 dark:bg-[#202538] text-slate-600 dark:text-yellow-400 transition-all border border-slate-200 dark:border-slate-700/50"
          >
            {theme === "light" ? <FaMoon className="w-4 h-4" /> : <FaSun className="w-4 h-4" />}
          </button>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-slate-900 dark:text-white p-2 focus:outline-none"
          >
            {isMobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* ========================================================= */}
      {/* DROPDOWN MENU MOBILE (Muncul jika isMobileMenuOpen = true) */}
      {/* ========================================================= */}
      <div 
        className={`md:hidden absolute top-[100%] left-0 w-full bg-white dark:bg-[#1A1E2E] border-b border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-6 py-4 gap-4">
          {Links.map(link => {
            const isActive = pathname === link.url;
            return (
              <Link
                key={link.id}
                href={link.url}
                className={`text-lg font-bold py-3 border-b border-slate-100 dark:border-slate-800/50 transition-colors ${
                  isActive
                    ? "text-blue-600 dark:text-yellow-400"
                    : "text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            )
          })}
        </div>
      </div>

    </nav>
  )
}

export default Navbar;
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react'; // Import signOut!

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await fetch('/api/profile');
        const data = await res.json();
        if (data.profile && data.profile.profileImageUrl) {
          setProfileImage(data.profile.profileImageUrl);
        }
      } catch (error) {
        console.error("Gagal mengambil foto profil:", error);
      }
    };
    fetchProfileData();
  }, []);

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center dark:text-white">Memuat Dashboard...</div>;
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12 relative">
      
      {/* 🌟 BAGIAN PROFIL & TOMBOL LOGOUT DI KANAN ATAS 🌟 */}
      <div className="absolute top-6 right-6 md:top-12 md:right-12 flex items-center gap-6">
        
        {/* Tombol Logout (Warna Merah Halus) */}
        <button 
          onClick={() => signOut({ callbackUrl: '/' })} 
          className="text-sm font-semibold text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
        >
          Keluar
        </button>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900 dark:text-white">{session?.user?.name || 'Admin'}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Web Developer</p>
          </div>
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500 shadow-md bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <svg className="w-6 h-6 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-20 md:pt-0">
        
        {/* Header Dashboard */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
            Halo, {session?.user?.name || 'Admin'}! 👋
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Selamat datang di pusat kendali website Anda. Apa yang ingin Anda kelola hari ini?
          </p>
        </div>

        {/* 🌟 Grid Menu CRUD (Sekarang jadi 2 Kolom karena Blog dihapus) 🌟 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-4xl">
          
          {/* Kartu Kelola Profil */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Profil & CV</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 flex-grow">
              Ganti foto profil, link CV Google Drive, Sosial Media, teks sambutan, dan keahlian Anda.
            </p>
            <Link href="/dashboard/profile" className="w-full text-center py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors">
              Kelola Profil &rarr;
            </Link>
          </div>

          {/* Kartu Kelola Portofolio */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Portofolio</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 flex-grow">
              Tambahkan proyek baru, perbarui deskripsi, atau hapus karya lama Anda.
            </p>
            <Link href="/dashboard/portfolios" className="w-full text-center py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
              Kelola Portofolio &rarr;
            </Link>
          </div>

        </div>

        {/* Placeholder untuk Fitur Analisis */}
        <div className="bg-slate-100 dark:bg-slate-800/50 rounded-3xl p-8 border border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center text-center mt-8">
          <div className="w-12 h-12 mb-4 text-slate-400 dark:text-slate-500">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">Analisis Bisnis (Segera Hadir)</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-lg">
            Area ini sedang dipersiapkan. Nanti kita akan merakit grafik interaktif untuk melacak performa karya Anda di sini.
          </p>
        </div>

      </div>
    </main>
  );
}
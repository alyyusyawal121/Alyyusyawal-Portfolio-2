'use client'; 

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  // Efek samping: Saat orang mencoba membuka halaman ini, tunggu 3 detik, lalu lempar ke halaman Login.
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard/login'); 
    }, 3000); // 3000 milidetik = 3 detik

    // Membersihkan timer jika komponen ditutup sebelum 3 detik
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-10 shadow-lg border border-slate-200 dark:border-slate-800 text-center">
        
        {/* Ikon Gembok (Opsional, untuk memperkuat pesan) */}
        <div className="flex justify-center mb-6 text-red-500 dark:text-red-400">
          <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">Pendaftaran Ditutup</h1>
        
        <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-6">
          Sistem ini adalah area Dashboard pribadi. Pembuatan akun publik tidak diizinkan.
        </p>

        <p className="text-sm font-medium text-blue-600 dark:text-blue-400 animate-pulse">
          Mengarahkan ke halaman Login...
        </p>

        <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-6 text-sm text-slate-600 dark:text-slate-400">
          Admin?{' '}
          <Link href="/dashboard/login" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Masuk di sini secara manual
          </Link>
        </div>

      </div>
    </main>
  );
}
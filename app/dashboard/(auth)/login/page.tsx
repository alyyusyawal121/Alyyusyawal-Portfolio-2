'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// Ini dia tombol pemanggil "Satpam Robot" dari NextAuth
import { signIn } from 'next-auth/react'; 

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email dan Password wajib diisi!');
      return;
    }

    try {
      // Memanggil fungsi signIn bawaan NextAuth
      // 'credentials' adalah nama metode yang kita atur di file [...nextauth]
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false, // Penting: Jangan biarkan NextAuth memindahkan halaman secara paksa, biar kita yang atur
      });

      if (res?.error) {
        // Jika Satpam menolak (password salah / email tidak ada)
        setError('Email atau Password salah!');
      } else {
        // Jika Satpam mengizinkan masuk, arahkan ke Dashboard!
        setError('');
        router.replace('/dashboard'); // Pakai replace agar user tidak bisa klik tombol "Back" ke halaman login
      }
    } catch (error) {
      console.log('Error saat login: ', error);
      setError('Terjadi kesalahan pada sistem.');
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-lg border border-slate-200 dark:border-slate-800">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Selamat Datang</h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Silakan masuk untuk mengelola portofolio dan blog Anda.
          </p>
        </div>

        {/* Kotak Peringatan Error */}
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm mb-6 font-medium text-center">
            {error}
          </div>
        )}

        {/* Formulir Login */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email</label>
            <input 
              type="email" 
              placeholder="nama@email.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-3 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-md"
          >
            Masuk
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
          Belum punya akun?{' '}
          <Link href="/dashboard/register" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Daftar di sini
          </Link>
        </div>

      </div>
    </main>
  );
}
'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreateDashboard() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [category, setCategory] = useState('');
    const [technologies, setTechnologies] = useState('');
    const [projectUrl, setProjectUrl] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); // Tambahan efek loading

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 1. projectUrl dikeluarkan dari syarat wajib
        if (!title || !description || !imageUrl || !category || !technologies) {
            setError('Semua kolom wajib (kecuali Project URL) harus diisi!');
            return;
        }

        setIsSubmitting(true);

        // 2. Mengubah teks "React, Node" menjadi array ["React", "Node"]
        const techArray = technologies.split(',').map((tech) => tech.trim());

        try {
            const res = await fetch('/api/portfolio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // 3. Masukkan techArray dan projectUrl ke dalam pengiriman
                body: JSON.stringify({ 
                    title, 
                    description, 
                    imageUrl, 
                    category, 
                    technologies: techArray, 
                    projectUrl 
                })
            });

            if (res.ok) {
                setError('');
                router.push('/dashboard/portfolios');
            } else {
                const errorData = await res.json();
                setError(errorData.message);
                setIsSubmitting(false);
            }
        } catch (error) {
            console.log('Error saat menyimpan portofolio', error);
            setError('Terjadi kesalahan pada sistem');
            setIsSubmitting(false);
        }
    }

  return (
    <main className='min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center py-12 px-6'>
        
        <div className="w-full max-w-2xl">
            <Link href="/dashboard/portfolios" className="text-blue-600 dark:text-blue-400 hover:underline mb-6 inline-block font-medium">
                &larr; Batal & Kembali
            </Link>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-lg border border-slate-200 dark:border-slate-800">
                <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-6">
                    <h1 className='text-3xl font-extrabold text-slate-900 dark:text-white'>
                        Tambah Portofolio
                    </h1>
                    <p className="text-slate-500 mt-2">Masukkan detail proyek terbaru Anda di sini.</p>
                </div>

                {error && (
                    <div className='bg-red-100 text-red-600 p-3 rounded-lg text-sm mb-6 font-medium text-center'>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                    
                    <div>
                        <label className='block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2'>Judul Proyek *</label>
                        <input 
                            type='text' placeholder='Contoh: Website E-Commerce'
                            onChange={(e) => setTitle(e.target.value)}
                            className='w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all'
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2'>Kategori *</label>
                        <input 
                            type='text' placeholder='Contoh: Web Development'
                            onChange={(e) => setCategory(e.target.value)}
                            className='w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all'
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2'>Link Gambar (URL) *</label>
                        <input 
                            type='text' placeholder='https://contoh.com/gambar.png'
                            onChange={(e) => setImageUrl(e.target.value)}
                            className='w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all'
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2'>Teknologi (Pisahkan dengan koma) *</label>
                        <input 
                            type='text' placeholder='Contoh: Next.js, Tailwind, MongoDB'
                            onChange={(e) => setTechnologies(e.target.value)}
                            className='w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all'
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2'>Link Proyek / GitHub (Opsional)</label>
                        <input 
                            type='text' placeholder='https://github.com/akun/proyek'
                            onChange={(e) => setProjectUrl(e.target.value)}
                            className='w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all'
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2'>Deskripsi *</label>
                        <textarea 
                            rows={4} placeholder='Ceritakan tentang proyek ini...'
                            onChange={(e) => setDescription(e.target.value)}
                            className='w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all resize-none'
                        ></textarea>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className={`w-full py-3 mt-4 text-white font-bold rounded-xl transition-colors shadow-md ${
                            isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {isSubmitting ? 'Menyimpan...' : 'Simpan Portofolio'}
                    </button>

                </form>
            </div>
        </div>
    </main>
  )
}
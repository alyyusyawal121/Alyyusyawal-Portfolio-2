'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function EditPortfolio() {
    // 1. Tangkap ID proyek dari URL (karena nama foldernya [id])
    const { id } = useParams();
    const router = useRouter();

    // State untuk menyimpan data form
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [category, setCategory] = useState('');
    const [technologies, setTechnologies] = useState('');
    const [projectUrl, setProjectUrl] = useState('');
    
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 2. Ambil data lama saat halaman pertama kali dibuka
    useEffect(() => {
        const fetchSingleProject = async () => {
            try {
                const res = await fetch('/api/portfolio');
                const data = await res.json();
                const allProjects = data.portfolios || [];
                
                // Cari proyek yang ID-nya cocok
                const project = allProjects.find((p: any) => p._id === id);

                if (project) {
                    // Isi kotak input dengan data lama
                    setTitle(project.title);
                    setDescription(project.description);
                    setImageUrl(project.imageUrl);
                    setCategory(project.category || '');
                    // Ubah array teknologi kembali menjadi teks dengan koma
                    setTechnologies(project.technologies?.join(', ') || '');
                    setProjectUrl(project.projectUrl || '');
                } else {
                    setError('Proyek tidak ditemukan!');
                }
            } catch (err) {
                console.error(err);
                setError('Gagal mengambil data proyek.');
            } finally {
                setIsLoading(false);
            }
        };

        if (id) fetchSingleProject();
    }, [id]);

    // 3. Fungsi saat tombol "Simpan Perubahan" ditekan
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !description || !imageUrl || !category || !technologies) {
            setError('Semua kolom wajib harus diisi!');
            return;
        }

        setIsSubmitting(true);
        const techArray = technologies.split(',').map((tech) => tech.trim());

        try {
            // KIRIM KE API dengan metode PUT (Update)
            const res = await fetch(`/api/portfolio?id=${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
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
                router.push('/dashboard/portfolios'); // Kembali ke tabel jika sukses
            } else {
                const errorData = await res.json();
                setError(errorData.message);
                setIsSubmitting(false);
            }
        } catch (error) {
            console.log(error);
            setError('Terjadi kesalahan pada sistem');
            setIsSubmitting(false);
        }
    }

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center dark:text-white">Memuat data proyek...</div>;
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
                        Edit Portofolio
                    </h1>
                    <p className="text-slate-500 mt-2">Perbarui informasi proyek Anda di bawah ini.</p>
                </div>

                {error && (
                    <div className='bg-red-100 text-red-600 p-3 rounded-lg text-sm mb-6 font-medium text-center'>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                    
                    {/* Kotak Input (Sama persis seperti halaman Create, tapi nilai awalnya terisi otomatis) */}
                    <div>
                        <label className='block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2'>Judul Proyek *</label>
                        <input 
                            type='text' 
                            value={title} // Ini yang membuat datanya otomatis terisi
                            onChange={(e) => setTitle(e.target.value)}
                            className='w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all'
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2'>Kategori *</label>
                        <input 
                            type='text' 
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className='w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all'
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2'>Link Gambar (URL) *</label>
                        <input 
                            type='text' 
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className='w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all'
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2'>Teknologi (Pisahkan dengan koma) *</label>
                        <input 
                            type='text' 
                            value={technologies}
                            onChange={(e) => setTechnologies(e.target.value)}
                            className='w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all'
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2'>Link Proyek / GitHub (Opsional)</label>
                        <input 
                            type='text' 
                            value={projectUrl}
                            onChange={(e) => setProjectUrl(e.target.value)}
                            className='w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all'
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2'>Deskripsi *</label>
                        <textarea 
                            rows={4} 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className='w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all resize-none'
                        ></textarea>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className={`w-full py-3 mt-4 text-white font-bold rounded-xl transition-colors shadow-md ${
                            isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                        }`}
                    >
                        {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </button>

                </form>
            </div>
        </div>
    </main>
  )
}
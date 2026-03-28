'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Untuk tombol kembali

export default function DashboardProfile() {
    const router = useRouter();

    // State untuk Gambar dan Teks
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [profileImageAbt, setProfileImageAbt] = useState('');
    const [homeDescription, setHomeDescription] = useState('');
    const [aboutDescription, setAboutDescription] = useState('');
    const [skills, setSkills] = useState('');

    // 🌟 STATE BARU: CV & Sosial Media (Termasuk Email & Discord)
    const [cvUrl, setCvUrl] = useState('');
    const [emailUrl, setEmailUrl] = useState('');
    const [linkedinUrl, setLinkedinUrl] = useState('');
    const [githubUrl, setGithubUrl] = useState('');
    const [discordUrl, setDiscordUrl] = useState('');
    const [instagramUrl, setInstagramUrl] = useState('');
    
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 1. Ambil data profil saat halaman dibuka
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch('/api/profile');
                const data = await res.json();
                
                if (data.profile) {
                    setProfileImageUrl(data.profile.profileImageUrl || '');
                    setProfileImageAbt(data.profile.profileImageAbt || '');
                    setHomeDescription(data.profile.homeDescription || '');
                    setAboutDescription(data.profile.aboutDescription || '');
                    setSkills(data.profile.skills?.join(', ') || '');
                    
                    // 🌟 Set data CV dan Sosial Media dari database
                    setCvUrl(data.profile.cvUrl || '');
                    setEmailUrl(data.profile.emailUrl || '');
                    setLinkedinUrl(data.profile.linkedinUrl || '');
                    setGithubUrl(data.profile.githubUrl || '');
                    setDiscordUrl(data.profile.discordUrl || '');
                    setInstagramUrl(data.profile.instagramUrl || '');
                }
            } catch (error) {
                console.error("Gagal memuat profil", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfile();
    }, []);

    // 2. Simpan data profil (Upsert)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        // Ubah kembali teks koma menjadi Array
        const skillsArray = skills.split(',').map((skill) => skill.trim());

        try {
            const res = await fetch('/api/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    profileImageUrl, 
                    profileImageAbt,
                    homeDescription, 
                    aboutDescription, 
                    skills: skillsArray,
                    // 🌟 Kirim data CV dan Sosial Media ke API
                    cvUrl,
                    emailUrl,
                    linkedinUrl,
                    githubUrl,
                    discordUrl,
                    instagramUrl
                })
            });

            if (res.ok) {
                setMessage('✅ Profil berhasil diperbarui!');
            } else {
                setMessage('❌ Gagal memperbarui profil.');
            }
        } catch (error) {
            console.error(error);
            setMessage('❌ Terjadi kesalahan sistem.');
        } finally {
            setIsSubmitting(false);
        }
    }

    if (isLoading) return <div className="min-h-screen flex items-center justify-center dark:text-white">Memuat profil...</div>;

  return (
    <main className='min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12'>
        <div className="max-w-4xl mx-auto">
            
            {/* Tombol Kembali Otomatis */}
            <button 
                onClick={() => router.back()} 
                className="text-blue-600 dark:text-blue-400 hover:underline mb-6 inline-block font-medium transition-colors cursor-pointer bg-transparent border-none p-0 text-left"
            >
                &larr; Kembali
            </button>

            <div className="mb-8">
                <h1 className='text-3xl font-extrabold text-slate-900 dark:text-white'>Kelola Profil Saya</h1>
                <p className="text-slate-500 mt-2">Data ini akan ditampilkan langsung di seluruh halaman publik Anda.</p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
                {message && (
                    <div className={`p-4 rounded-xl mb-6 font-medium text-center ${message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                    
                    {/* BAGIAN GAMBAR */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <div>
                            <label className='block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2'>Foto Profil Home (URL)</label>
                            <div className="flex gap-4 items-start">
                                {profileImageUrl && (
                                    <img src={profileImageUrl} alt="Preview Home" className="w-12 h-12 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700 shrink-0" />
                                )}
                                <input 
                                    type='text' placeholder='https://contoh.com/foto-home.jpg'
                                    value={profileImageUrl} onChange={(e) => setProfileImageUrl(e.target.value)}
                                    className='w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white text-sm'
                                />
                            </div>
                        </div>
                        <div>
                            <label className='block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2'>Foto Profil About (URL)</label>
                            <div className="flex gap-4 items-start">
                                {profileImageAbt && (
                                    <img src={profileImageAbt} alt="Preview About" className="w-12 h-12 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700 shrink-0" />
                                )}
                                <input 
                                    type='text' placeholder='https://contoh.com/foto-about.jpg'
                                    value={profileImageAbt} onChange={(e) => setProfileImageAbt(e.target.value)}
                                    className='w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white text-sm'
                                />
                            </div>
                        </div>
                    </div>

                    {/* BAGIAN TEKS DESKRIPSI */}
                    <div className="space-y-6">
                        <div>
                            <label className='block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2'>Teks Sambutan Halaman Home</label>
                            <textarea 
                                rows={3} placeholder='Halo! Saya seorang Web Developer yang suka membangun...'
                                value={homeDescription} onChange={(e) => setHomeDescription(e.target.value)}
                                className='w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white resize-none'
                            ></textarea>
                        </div>

                        <div>
                            <label className='block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2'>Cerita Lengkap Halaman About</label>
                            <textarea 
                                rows={6} placeholder='Perjalanan karir saya dimulai sejak...'
                                value={aboutDescription} onChange={(e) => setAboutDescription(e.target.value)}
                                className='w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white resize-none'
                            ></textarea>
                        </div>

                        <div>
                            <label className='block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2'>Keahlian & Teknologi (Pisahkan dengan koma)</label>
                            <input 
                                type='text' placeholder='React, Next.js, MongoDB, Tailwind CSS'
                                value={skills} onChange={(e) => setSkills(e.target.value)}
                                className='w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white'
                            />
                        </div>
                    </div>

                    {/* 🌟 BAGIAN BARU: CV & TAUTAN SOSIAL (Grid 2 Kolom) */}
                    <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Tautan Dokumen & Kontak Pribadi</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className='block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2'>Link CV (Google Drive)</label>
                                <input 
                                    type='url' placeholder='https://drive.google.com/...'
                                    value={cvUrl} onChange={(e) => setCvUrl(e.target.value)}
                                    className='w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white'
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2'>Format Email (Mailto)</label>
                                <input 
                                    type='text' placeholder='mailto:halo@email.com'
                                    value={emailUrl} onChange={(e) => setEmailUrl(e.target.value)}
                                    className='w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white'
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2'>Link LinkedIn</label>
                                <input 
                                    type='url' placeholder='https://linkedin.com/in/...'
                                    value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)}
                                    className='w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white'
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2'>Link GitHub</label>
                                <input 
                                    type='url' placeholder='https://github.com/...'
                                    value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)}
                                    className='w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white'
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2'>Link Discord Server / Profile</label>
                                <input 
                                    type='url' placeholder='https://discord.gg/...'
                                    value={discordUrl} onChange={(e) => setDiscordUrl(e.target.value)}
                                    className='w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white'
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2'>Link Instagram</label>
                                <input 
                                    type='url' placeholder='https://instagram.com/...'
                                    value={instagramUrl} onChange={(e) => setInstagramUrl(e.target.value)}
                                    className='w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white'
                                />
                            </div>
                        </div>
                    </div>

                    <button 
                        type="submit" disabled={isSubmitting}
                        className={`w-full py-4 mt-4 text-white font-bold text-lg rounded-xl transition-colors shadow-lg ${isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {isSubmitting ? 'Menyimpan Perubahan...' : 'Simpan Profil Saya'}
                    </button>

                </form>
            </div>
        </div>
    </main>
  )
}
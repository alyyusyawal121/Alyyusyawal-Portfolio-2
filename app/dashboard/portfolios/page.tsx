'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardPortfolio() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Fungsi untuk mengambil data (Read)
  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/portfolio');
      const data = await res.json();
      setProjects(data.portfolios || []);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Menjalankan fetchProjects saat halaman pertama kali dibuka
  useEffect(() => {
    fetchProjects();
  }, []);

  // 2. Fungsi untuk menghapus data (Delete)
  const handleDelete = async (id: string) => {
    // Munculkan popup konfirmasi bawaan browser
    const isConfirm = window.confirm("Apakah Anda yakin ingin menghapus proyek ini?");
    
    if (isConfirm) {
      try {
        const res = await fetch(`/api/portfolio?id=${id}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          // Jika sukses terhapus di database, ambil ulang data terbaru untuk me-refresh tabel
          fetchProjects();
        } else {
          alert("Gagal menghapus proyek");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* TOMBOL KEMBALI KE DASHBOARD */}
        <Link 
          href="/dashboard" 
          className="text-blue-600 dark:text-blue-400 hover:underline mb-6 inline-block font-medium transition-colors"
        >
          &larr; Kembali ke Dashboard Utama
        </Link>

        {/* Header & Tombol Tambah */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Kelola Portofolio</h1>
            <p className="text-slate-600 dark:text-slate-400">Total: {projects.length} proyek terdaftar</p>
          </div>
          
          {/* Tombol ini akan mengarah ke halaman form tambah data (Create) */}
          <Link 
            href="/dashboard/portfolios/create"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-md"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Tambah Proyek Baru
          </Link>
        </div>

        {/* Area Tabel */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          {isLoading ? (
            <div className="p-10 text-center text-slate-500 dark:text-slate-400">Sedang memuat data...</div>
          ) : projects.length === 0 ? (
            <div className="p-10 text-center text-slate-500 dark:text-slate-400">Belum ada proyek. Silakan tambahkan proyek pertama Anda!</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 text-sm uppercase tracking-wider">
                    <th className="p-4 font-semibold">Gambar</th>
                    <th className="p-4 font-semibold">Judul & Kategori</th>
                    <th className="p-4 font-semibold">Teknologi</th>
                    <th className="p-4 font-semibold text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  
                  {/* Melakukan looping data proyek ke dalam baris tabel */}
                  {projects.map((project: any) => (
                    <tr key={project._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                      
                      <td className="p-4">
                        <div className="w-16 h-12 rounded overflow-hidden bg-slate-200 dark:bg-slate-700">
                          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                        </div>
                      </td>
                      
                      <td className="p-4">
                        <div className="font-bold text-slate-900 dark:text-white mb-1">{project.title}</div>
                        <div className="text-xs text-blue-600 dark:text-blue-400 font-medium px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 rounded inline-block">
                          {project.category || 'Uncategorized'}
                        </div>
                      </td>
                      
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {project.technologies?.slice(0, 3).map((tech: string, i: number) => (
                            <span key={i} className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                              {tech}
                            </span>
                          ))}
                          {project.technologies?.length > 3 && (
                            <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-3">
                          {/* Tombol Edit */}
                          <Link 
                            href={`/dashboard/portfolios/edit/${project._id}`}
                            className="text-sm font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
                          >
                            Edit
                          </Link>
                          
                          {/* Tombol Hapus */}
                          <button 
                            onClick={() => handleDelete(project._id)}
                            className="text-sm font-semibold text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                      
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
"use client";

import { motion } from "framer-motion";

export default function AboutClient({ profile }: { profile: any }) {
  // Ambil data dinamis dari database, berikan fallback jika kosong
  const imageUrl = profile?.profileImageAbt || profile?.profileImageUrl || "https://via.placeholder.com/400";
  
  // Karena description bisa saja masih berbahasa Indonesia dari database Anda, 
  // pastikan nanti Anda memperbaruinya di halaman Dashboard agar isinya juga Bahasa Inggris.
  const description = profile?.aboutDescription || "A detailed story about myself has not been added yet. Please manage it in the Dashboard.";
  
  const skills = profile?.skills?.length > 0 ? profile.skills : ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"];

  return (
    // Background menyesuaikan tema premium Dark Mode (#1A1E2E)
    <section className="min-h-screen bg-slate-50 dark:bg-[#1A1E2E] transition-colors duration-300 relative overflow-hidden">
      
      {/* 🌟 Hiasan Background Glow 🌟 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-32 pb-24 lg:px-12 relative z-10">
        
        {/* Animasi Masuk Utama (Fade In & Slide Up) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          
          {/* 🌟 HEADER SECTION 🌟 */}
          <div className="mb-16 md:mb-24 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-extrabold tracking-tight text-slate-900 dark:text-white drop-shadow-sm mb-6">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 dark:from-yellow-400 dark:to-yellow-200">Me</span>
            </h1>
            <div className="w-24 h-1.5 bg-blue-600 dark:bg-yellow-400 mx-auto lg:mx-0 rounded-full mb-6"></div>
            <p className="text-lg md:text-xl text-slate-600 dark:text-gray-400 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
              A glimpse into my career journey, my philosophy in writing code, and the technologies I use to craft digital solutions.
            </p>
          </div>

          {/* 🌟 KONTEN UTAMA (Grid 2 Kolom) 🌟 */}
          <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr] items-center mb-24">
            
            {/* KOLOM KIRI: Teks Deskripsi */}
            <div className="order-2 lg:order-1 space-y-6 text-lg md:text-xl leading-[1.8] text-slate-700 dark:text-gray-300 text-pretty whitespace-pre-line bg-white/50 dark:bg-[#202538]/50 p-8 md:p-10 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-4">
                My Journey
                <span className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></span>
              </h2>
              {description}
            </div>

            {/* KOLOM KANAN: Gambar Miring Premium */}
            <div className="order-1 lg:order-2 relative w-[260px] h-[340px] md:w-[320px] md:h-[420px] lg:w-[380px] lg:h-[480px] mx-auto group">
              <div className="absolute inset-0 rounded-[2.5rem] bg-blue-500/20 blur-2xl translate-x-6 translate-y-8 opacity-60 dark:opacity-40 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-blue-600 rounded-[2.5rem] rotate-3 scale-105 shadow-xl transition-transform duration-500 group-hover:rotate-6" />
              <div className="absolute inset-0 rounded-[2.5rem] -rotate-2 border-4 border-white dark:border-slate-800 overflow-hidden bg-slate-200 dark:bg-[#151822] shadow-2xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-0 group-hover:scale-105 z-10">
                <img
                  src={imageUrl}
                  alt="Profile Photo"
                  className="w-full h-full object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
            
          </div>

          {/* 🌟 BAGIAN TEKNOLOGI (Hanya Teks, Minimalis & Elegan) 🌟 */}
          <div className="bg-white dark:bg-[#202538] rounded-[2.5rem] p-10 md:p-16 shadow-xl border border-slate-200 dark:border-slate-800/80 relative overflow-hidden">
            
            {/* Hiasan Sudut */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 dark:bg-yellow-400/5 rounded-bl-full pointer-events-none"></div>

            <div className="mb-10 text-center">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                Technologies & Tools
              </h2>
              <p className="text-slate-600 dark:text-gray-400">
                A collection of skills I continuously refine through learning and experimentation.
              </p>
            </div>

            {/* Grid Pill Teks */}
            <div className="flex flex-wrap justify-center gap-4">
              {skills.map((skill: string, index: number) => (
                <motion.span 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, type: "spring", stiffness: 100 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="px-6 py-3.5 bg-slate-50 dark:bg-[#151822] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm text-sm md:text-base font-bold rounded-full cursor-default hover:border-blue-500 dark:hover:border-yellow-400 hover:text-blue-600 dark:hover:text-yellow-400 transition-colors"
                >
                  {skill}
                </motion.span>
              ))}
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
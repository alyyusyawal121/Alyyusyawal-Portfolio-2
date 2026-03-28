"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle, FaDiscord, FaInstagram } from "react-icons/fa";

export default function ContactPage() {
  const [profile, setProfile] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // FUNGSI PENGIRIMAN ASLI (Langsung dari Browser via Web3Forms)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (accessKey) {
      formData.append("access_key", accessKey);
    } else {
      console.error("Web3Forms API Key is missing in .env file!");
      alert("Email system is not configured properly.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData, 
      });

      const data = await res.json();

      if (data.success) {
        setIsSubmitted(true); 
      } else {
        console.error("Web3Forms Error:", data);
        alert("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("A network error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fetch Data Profil
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/profile');
        const data = await res.json();
        if (data.profile) {
          setProfile(data.profile);
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };
    fetchProfile();
  }, []);

  const emailUrl = profile?.emailUrl || "mailto:@alyyusyawal6.com";
  const linkedinUrl = profile?.linkedinUrl || "https://linkedin.com/in/alyyusyawal"; 
  const githubUrl = profile?.githubUrl || "";
  const discordUrl = profile?.discordUrl || "";
  const instagramUrl = profile?.instagramUrl || "";

  // Konfigurasi Animasi
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#1A1E2E] transition-colors duration-300 relative overflow-hidden pt-32 pb-24 px-6 md:px-12">
      
      {/* 🌟 Hiasan Background Glow 🌟 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] right-[-5%] w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
        />
      </div>

      <div className="w-full max-w-7xl mx-auto relative z-10">
        
        {/* 🌟 HEADER 🌟 */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24 max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight drop-shadow-sm">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 dark:from-yellow-400 dark:to-yellow-200">Collaborate</span>
          </h1>
          <div className="w-24 h-1.5 bg-blue-600 dark:bg-yellow-400 mx-auto rounded-full mb-6"></div>
          <p className="text-lg md:text-xl text-slate-600 dark:text-gray-400 leading-relaxed">
            Have an amazing project idea or need help with web development? Don't hesitate to reach out, I'm always open to new discussions!
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          
          {/* 🌟 KOLOM KIRI: Informasi Kontak 🌟 */}
          <div className="w-full lg:w-5/12 flex flex-col gap-6">
            
            <motion.a variants={itemVariants} href={emailUrl} className="group flex items-center gap-6 p-6 bg-white dark:bg-[#202538] rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-14 h-14 bg-blue-50 dark:bg-[#151822] text-blue-600 dark:text-yellow-400 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-sm">
                <FaEnvelope />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">Email Me</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-yellow-400 transition-colors">Send a Message</p>
              </div>
            </motion.a>

            <motion.a variants={itemVariants} href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-6 p-6 bg-white dark:bg-[#202538] rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-14 h-14 bg-blue-50 dark:bg-[#151822] text-blue-600 dark:text-yellow-400 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-sm">
                <FaLinkedin />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">LinkedIn</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-yellow-400 transition-colors">Let's Connect</p>
              </div>
            </motion.a>

            {githubUrl && (
              <motion.a variants={itemVariants} href={githubUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-6 p-6 bg-white dark:bg-[#202538] rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="w-14 h-14 bg-blue-50 dark:bg-[#151822] text-blue-600 dark:text-yellow-400 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-sm">
                  <FaGithub />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">GitHub</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-yellow-400 transition-colors">View Repositories</p>
                </div>
              </motion.a>
            )}

            {discordUrl && (
              <motion.a variants={itemVariants} href={discordUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-6 p-6 bg-white dark:bg-[#202538] rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="w-14 h-14 bg-blue-50 dark:bg-[#151822] text-blue-600 dark:text-yellow-400 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-sm">
                  <FaDiscord />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">Discord</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-yellow-400 transition-colors">Chat Directly</p>
                </div>
              </motion.a>
            )}

            {instagramUrl && (
              <motion.a variants={itemVariants} href={instagramUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-6 p-6 bg-white dark:bg-[#202538] rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="w-14 h-14 bg-blue-50 dark:bg-[#151822] text-blue-600 dark:text-yellow-400 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-sm">
                  <FaInstagram />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">Instagram</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-yellow-400 transition-colors">Follow My Daily Life</p>
                </div>
              </motion.a>
            )}

            <motion.div variants={itemVariants} className="flex items-center gap-6 p-6 bg-white dark:bg-[#202538] rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-sm">
              <div className="w-14 h-14 bg-blue-50 dark:bg-[#151822] text-blue-600 dark:text-yellow-400 rounded-full flex items-center justify-center text-2xl shadow-sm shrink-0">
                <FaMapMarkerAlt />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-1">Location</p>
                <p className="text-base font-medium text-slate-700 dark:text-gray-300">Surabaya, East Java<br/>Indonesia</p>
              </div>
            </motion.div>

          </div>

          {/* 🌟 KOLOM KANAN: Formulir Kontak 🌟 */}
          <motion.div variants={itemVariants} className="w-full lg:w-7/12">
            <div className="bg-white dark:bg-[#202538] p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800/80 relative overflow-hidden">
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="relative z-10">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-8">Send a Direct Message</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-sm font-bold text-slate-700 dark:text-gray-300 ml-1">Full Name</label>
                      <input 
                        type="text" id="name" name="name" placeholder="John Doe" required 
                        className="px-5 py-4 rounded-2xl bg-slate-50 dark:bg-[#151822] border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 transition-all dark:text-white placeholder-slate-400 dark:placeholder-slate-600"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-sm font-bold text-slate-700 dark:text-gray-300 ml-1">Email Address</label>
                      <input 
                        type="email" id="email" name="email" placeholder="john@email.com" required 
                        className="px-5 py-4 rounded-2xl bg-slate-50 dark:bg-[#151822] border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 transition-all dark:text-white placeholder-slate-400 dark:placeholder-slate-600"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mb-6">
                    <label htmlFor="subject" className="text-sm font-bold text-slate-700 dark:text-gray-300 ml-1">Subject / Company</label>
                    <input 
                      type="text" id="subject" name="subject" placeholder="e.g. Job Offer" required 
                      className="px-5 py-4 rounded-2xl bg-slate-50 dark:bg-[#151822] border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 transition-all dark:text-white placeholder-slate-400 dark:placeholder-slate-600"
                    />
                  </div>

                  <div className="flex flex-col gap-2 mb-8">
                    <label htmlFor="message" className="text-sm font-bold text-slate-700 dark:text-gray-300 ml-1">Your Message</label>
                    <textarea 
                      id="message" name="message" rows={5} placeholder="Tell me about your project here..." required 
                      className="px-5 py-4 rounded-2xl bg-slate-50 dark:bg-[#151822] border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 transition-all dark:text-white resize-none placeholder-slate-400 dark:placeholder-slate-600"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 text-white dark:text-slate-900 font-extrabold text-lg rounded-2xl transition-all flex justify-center items-center gap-3 group shadow-xl ${isSubmitting ? 'bg-slate-400 dark:bg-slate-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 dark:bg-yellow-500 dark:hover:bg-yellow-400 hover:-translate-y-1 hover:shadow-blue-600/30 dark:hover:shadow-yellow-500/20'}`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    {!isSubmitting && <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                  </button>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative z-10 flex flex-col items-center justify-center text-center py-10 h-full"
                >
                  <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-500 dark:text-green-400 rounded-full flex items-center justify-center text-5xl mb-6 shadow-inner">
                    <FaCheckCircle />
                  </div>
                  <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">Message Sent!</h2>
                  <p className="text-lg text-slate-600 dark:text-gray-400 mb-8 max-w-md">
                    Thank you for reaching out. Your message has been forwarded, and I will reply to you as soon as possible.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="px-8 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}

            </div>
          </motion.div>

        </motion.div>
      </div>
    </main>
  );
}
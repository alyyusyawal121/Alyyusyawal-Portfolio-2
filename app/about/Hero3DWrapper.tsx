"use client" // Wajib tambahkan ini di paling atas!
import dynamic from 'next/dynamic'

// Komponen 3D dipanggil secara dinamis di sini (area Client)
const Hero3D = dynamic(() => import('./Hero3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full flex items-center justify-center bg-slate-200 h-[400px] dark:bg-slate-800 animate-pulse rounded-3xl">
      <p className="text-slate-500 font-medium">Memuat Model 3D.....</p>
    </div>
  )
})

export default function Hero3DWrapper() {
  return <Hero3D />
}
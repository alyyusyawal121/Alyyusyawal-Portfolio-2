"use client"
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment } from '@react-three/drei'

function Objectglb() {
    // Pastikan file computer.glb ada di dalam folder 'public'
    const { scene } = useGLTF('/bmw.glb')
    return <primitive object={scene} scale={1} position={[0, -1, 0]} />
}

export default function Hero3D() {
  return (
    // Memperbaiki typo min-h-[400px]
    <div className="w-full h-full relative min-h-[400px] rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-900 border-4 border-white dark:border-slate-800">
        {/* Memperbaiki FOV menjadi 45 agar model terlihat pas */}
        <Canvas camera={{ position: [5, 5, 25], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />

            <Environment preset='city' />
            <Objectglb />

            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
        </Canvas>
    </div>
  )
}
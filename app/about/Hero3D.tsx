"use client"
import React from 'react'
import {Canvas} from '@react-three/fiber'
import {OrbitControls, Sphere, MeshDistortMaterial,useGLTF, Environment} from '@react-three/drei'

function Objectglb() {
  const {scene} = useGLTF('/bmw.glb')

  // Gunakan tag <primitive /> untuk merender model bawaan tersebut
  return <primitive object={scene} scale={1} position={[0, -1, 0]} />
}

// function AnimatedBlob(){
//   return(
//     <Sphere visible args={[1, 100, 200]} scale={2}>
//       <MeshDistortMaterial
//         color='#2563eb'
//         attach='material'
//         distort={0.4}
//         speed={2}
//         roughness={0.1}
//       />
//     </Sphere>
//   )
// }

function Hero3D() {
  return (
    <>
    <div className="w-full h-full relative min-h-400px rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-900 border-4 border-white dark:border-slate-800 shadow-2xl">
      <Canvas camera={{position:[10, 10, 21], fov: 50}}>
        {/* Lightning */}
        <ambientLight intensity={0.5}/>
        <directionalLight position={[5, 5, 5]} intensity={1}/>

        <Environment preset="city" />

        {/* Calling Objek */}
        <Objectglb/>

        {/* OrbitControls mengizinkan user memutar objek dengan kursor */}
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
      </Canvas>
    </div>
    </>
  )
}

export default Hero3D
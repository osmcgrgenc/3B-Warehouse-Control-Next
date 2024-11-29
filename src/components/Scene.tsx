'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Depo from './Depo'
import { useState } from 'react'

export default function Scene() {
  const [isDragging, setIsDragging] = useState(false)

  return (
    <Canvas
      camera={{
        position: [10, 10, 10],
        fov: 75
      }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Depo isDragging={isDragging} setIsDragging={setIsDragging} />
      <OrbitControls enabled={!isDragging} />
    </Canvas>
  )
}

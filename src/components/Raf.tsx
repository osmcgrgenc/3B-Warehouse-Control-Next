'use client'

import { Box } from '@react-three/drei'
import { ThreeEvent, useThree } from '@react-three/fiber'
import { useState, useRef } from 'react'
import { useModal } from '@/contexts/ModalContext'
import { useRaf } from '@/contexts/RafContext'
import * as THREE from 'three'

interface RafProps {
  rafId: string
  position: [number, number, number]
  color: string
  hasBox: boolean
  boxColor: string
  boxContent: string
  isDragging: boolean
  setIsDragging: (dragging: boolean) => void
}

export default function Raf({ 
  rafId,
  color = "#FFD700", 
  hasBox = false, 
  boxColor = "#8B4513",
  boxContent = "Bu kolide önemli malzemeler var!",
  position,
  isDragging,
  setIsDragging
}: RafProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [rotation, setRotation] = useState(0)
  const { openModal } = useModal()
  const { updateRafPosition } = useRaf()
  const groupRef = useRef<THREE.Group>(null)
  const { camera, gl } = useThree()
  const [isDraggingThis, setIsDraggingThis] = useState(false)
  const dragStartPosition = useRef<[number, number, number]>([0, 0, 0])

  const onDragStart = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    setIsDragging(true)
    setIsDraggingThis(true)
    if (groupRef.current) {
      dragStartPosition.current = [
        groupRef.current.position.x,
        groupRef.current.position.y,
        groupRef.current.position.z
      ]
    }
    gl.domElement.style.cursor = 'grabbing'
  }

  const onDrag = (e: ThreeEvent<PointerEvent>) => {
    if (!isDraggingThis || !groupRef.current) return

    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1
    )

    raycaster.setFromCamera(mouse, camera)
    const intersectionPoint = new THREE.Vector3()
    raycaster.ray.intersectPlane(plane, intersectionPoint)

    groupRef.current.position.x = intersectionPoint.x
    groupRef.current.position.z = intersectionPoint.z
  }

  const onDragEnd = () => {
    if (!isDraggingThis || !groupRef.current) return

    setIsDragging(false)
    setIsDraggingThis(false)
    gl.domElement.style.cursor = 'auto'

    // Yeni pozisyonu kaydet
    const newPosition: [number, number, number] = [
      groupRef.current.position.x,
      groupRef.current.position.y,
      groupRef.current.position.z
    ]
    updateRafPosition(rafId, newPosition)
  }

  return (
    <group 
      ref={groupRef}
      position={position}
      onPointerDown={onDragStart}
      onPointerMove={onDrag}
      onPointerUp={onDragEnd}
      onPointerLeave={onDragEnd}
    >
      <group
        rotation-y={rotation}
        onPointerEnter={() => !isDragging && setIsHovered(true)}
        onPointerLeave={() => !isDragging && setIsHovered(false)}
      >
        {/* Raf tabanı */}
        <Box args={[4, 0.2, 3]} position={[0, 0, 0]}>
          <meshPhysicalMaterial 
            color={isHovered ? '#FFFFFF' : color}
            metalness={0.5}
            roughness={0.2}
          />
        </Box>

        {/* Raf ayakları - Lacivert */}
        {/* Ön ayaklar */}
        <Box args={[0.2, 2, 0.2]} position={[-1.9, -1, 1.4]}>
          <meshPhysicalMaterial 
            color="#000080"
            metalness={0.6}
            roughness={0.2}
          />
        </Box>
        <Box args={[0.2, 2, 0.2]} position={[1.9, -1, 1.4]}>
          <meshPhysicalMaterial 
            color="#000080"
            metalness={0.6}
            roughness={0.2}
          />
        </Box>

        {/* Arka ayaklar */}
        <Box args={[0.2, 2, 0.2]} position={[-1.9, -1, -1.4]}>
          <meshPhysicalMaterial 
            color="#000080"
            metalness={0.6}
            roughness={0.2}
          />
        </Box>
        <Box args={[0.2, 2, 0.2]} position={[1.9, -1, -1.4]}>
          <meshPhysicalMaterial 
            color="#000080"
            metalness={0.6}
            roughness={0.2}
          />
        </Box>

        {/* Ayakları birbirine bağlayan çapraz destekler */}
        {/* Ön-arka bağlantılar */}
        <Box args={[0.1, 0.1, 2.8]} position={[-1.9, -1.5, 0]}>
          <meshPhysicalMaterial 
            color="#000080"
            metalness={0.6}
            roughness={0.2}
          />
        </Box>
        <Box args={[0.1, 0.1, 2.8]} position={[1.9, -1.5, 0]}>
          <meshPhysicalMaterial 
            color="#000080"
            metalness={0.6}
            roughness={0.2}
          />
        </Box>

        {/* Yan bağlantılar */}
        <Box args={[3.8, 0.1, 0.1]} position={[0, -1.5, 1.4]}>
          <meshPhysicalMaterial 
            color="#000080"
            metalness={0.6}
            roughness={0.2}
          />
        </Box>
        <Box args={[3.8, 0.1, 0.1]} position={[0, -1.5, -1.4]}>
          <meshPhysicalMaterial 
            color="#000080"
            metalness={0.6}
            roughness={0.2}
          />
        </Box>

        {/* Koli */}
        {hasBox && (
          <Box 
            args={[2, 1.5, 2]} 
            position={[0, 1, 0]}
            onClick={(e: ThreeEvent<MouseEvent>) => {
              setIsDraggingThis(false)
              e.stopPropagation()
              openModal(boxContent)
              setIsDraggingThis(true)
            }}
            onPointerEnter={() => !isDragging && (document.body.style.cursor = 'pointer')}
            onPointerLeave={() => !isDragging && (document.body.style.cursor = 'default')}
          >
            <meshPhysicalMaterial 
              color={boxColor}
              metalness={0.1}
              roughness={0.8}
            />
          </Box>
        )}

        {/* Döndürme butonu */}
        <Box 
          args={[0.5, 0.5, 0.5]} 
          position={[2.5, 0, 0]}
          onClick={(e) => {
            setIsDraggingThis(false);
            e.stopPropagation()
            setRotation((prev) => prev + Math.PI / 2)
            setIsDraggingThis(true)
          }}
          onPointerEnter={() => !isDragging && (document.body.style.cursor = 'pointer')}
          onPointerLeave={() => !isDragging && (document.body.style.cursor = 'default')}
        >
          <meshPhysicalMaterial 
            color="#4CAF50"
            metalness={0.3}
            roughness={0.4}
            emissive="#4CAF50"
            emissiveIntensity={isHovered && !isDragging ? 0.5 : 0}
          />
        </Box>
      </group>
    </group>
  )
}
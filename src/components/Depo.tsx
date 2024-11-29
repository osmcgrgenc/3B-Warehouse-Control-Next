'use client'

import { Box } from '@react-three/drei'
import { GroupProps } from '@react-three/fiber'
import Raf from './Raf'
import { useRaf } from '@/contexts/RafContext'

interface DepoProps extends GroupProps {
  width?: number
  height?: number
  depth?: number
  isDragging: boolean
  setIsDragging: (dragging: boolean) => void
}

const Depo: React.FC<DepoProps> = ({ 
  width = 20, 
  height = 10, 
  depth = 20,
  isDragging,
  setIsDragging,
  ...props 
}) => {
  const { raflar } = useRaf()

  return (
    <group {...props}>
      {/* Depo zemini ve duvarları */}
      <Box args={[width, 0.5, depth]} position={[0, -0.25, 0]}>
        <meshStandardMaterial color="#666666" />
      </Box>
      
      <Box args={[0.5, height, depth]} position={[-width/2, height/2, 0]}>
        <meshStandardMaterial color="#888888" />
      </Box>
      <Box args={[0.5, height, depth]} position={[width/2, height/2, 0]}>
        <meshStandardMaterial color="#888888" />
      </Box>
      <Box args={[width, height, 0.5]} position={[0, height/2, -depth/2]}>
        <meshStandardMaterial color="#888888" />
      </Box>

      {/* Raflar */}
      {raflar.map((raf) => (
        <Raf
          key={raf.rafId}
          rafId={raf.rafId}
          position={raf.position}
          color={raf.color}
          hasBox={raf.hasBox}
          boxColor={raf.boxColor}
          boxContent={raf.boxContent}
          isDragging={isDragging}
          setIsDragging={setIsDragging}
        />
      ))}
    </group>
  )
}

export default Depo
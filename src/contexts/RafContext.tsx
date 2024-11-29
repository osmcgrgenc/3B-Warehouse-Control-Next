'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export interface RafType {
  rafId: string  // id yerine rafId kullanıyoruz
  position: [number, number, number]
  color: string
  hasBox: boolean
  boxColor: string
  boxContent: string
}

interface RafContextType {
  raflar: RafType[]
  addRaf: (raf: Omit<RafType, 'rafId'>) => void
  updateRafPosition: (rafId: string, position: [number, number, number]) => void
  removeRaf: (rafId: string) => void
}

const RafContext = createContext<RafContextType | undefined>(undefined)

export function RafProvider({ children }: { children: ReactNode }) {
  const [raflar, setRaflar] = useState<RafType[]>([
    {
      rafId: '1',
      position: [-5, 2, -8],
      color: '#FFD700',
      hasBox: true,
      boxColor: '#8B4513',
      boxContent: 'Sarı raftaki koli: Elektronik malzemeler'
    },
  ])

  const addRaf = (raf: Omit<RafType, 'rafId'>) => {
    const newRaf = {
      ...raf,
      rafId: Math.random().toString(36).substr(2, 9)
    }
    setRaflar([...raflar, newRaf])
  }

  const updateRafPosition = (rafId: string, position: [number, number, number]) => {
    setRaflar(raflar.map(raf => 
      raf.rafId === rafId ? { ...raf, position } : raf
    ))
  }

  const removeRaf = (rafId: string) => {
    setRaflar(raflar.filter(raf => raf.rafId !== rafId))
  }

  return (
    <RafContext.Provider value={{ raflar, addRaf, updateRafPosition, removeRaf }}>
      {children}
    </RafContext.Provider>
  )
}

export const useRaf = () => {
  const context = useContext(RafContext)
  if (!context) {
    throw new Error('useRaf must be used within a RafProvider')
  }
  return context
}
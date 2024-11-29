'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Raf, Koli, Section } from '../types/depo'

interface DepoContextType {
  raflar: Raf[];
  sections: Section[];
  addRaf: (raf: Omit<Raf, 'id'>) => void;
  updateRaf: (id: string, updates: Partial<Raf>) => void;
  removeRaf: (id: string) => void;
  addKoli: (rafId: string, koli: Omit<Koli, 'id'>) => void;
  removeKoli: (rafId: string) => void;
  moveKoli: (fromRafId: string, toRafId: string) => void;
}

const defaultSections: Section[] = [
  {
    id: 'A',
    name: 'Elektronik Bölümü',
    description: 'Elektronik ürünler için özel nem kontrollü alan',
    maxCapacity: 10
  },
  {
    id: 'B',
    name: 'Gıda Bölümü',
    description: 'Sıcaklık kontrollü gıda depolama alanı',
    maxCapacity: 15
  },
  {
    id: 'C',
    name: 'Genel Depo',
    description: 'Genel amaçlı depolama alanı',
    maxCapacity: 20
  }
]

const initialRaflar: Raf[] = [
  {
    id: '1',
    position: [-5, 2, -8],
    rotation: 0,
    color: '#FFD700',
    section: defaultSections[0],
    level: 1,
    koli: {
      id: 'k1',
      name: 'Elektronik-1',
      color: '#8B4513',
      content: 'Laptoplar ve tabletler',
      weight: 15,
      category: 'elektronik',
      createdAt: new Date()
    }
  },
  {
    id: '2',
    position: [0, 2, -8],
    rotation: 0,
    color: '#FF0000',
    section: defaultSections[1],
    level: 1,
    koli: {
      id: 'k2',
      name: 'Gıda-1',
      color: '#A0522D',
      content: 'Konserve ürünler',
      weight: 20,
      category: 'gıda',
      createdAt: new Date()
    }
  },
  {
    id: '3',
    position: [5, 2, -8],
    rotation: 0,
    color: '#00FF00',
    section: defaultSections[2],
    level: 1,
    koli: {
      id: 'k3',
      name: 'Genel-1',
      color: '#6B4423',
      content: 'Kırtasiye malzemeleri',
      weight: 10,
      category: 'diğer',
      createdAt: new Date()
    }
  }
]

const DepoContext = createContext<DepoContextType | undefined>(undefined)

export function DepoProvider({ children }: { children: ReactNode }) {
  const [raflar, setRaflar] = useState<Raf[]>(initialRaflar)
  const [sections] = useState<Section[]>(defaultSections)

  const addRaf = (raf: Omit<Raf, 'id'>) => {
    const newRaf: Raf = {
      ...raf,
      id: Math.random().toString(36).substr(2, 9),
      level: raf.level as 1 | 2 | 3
    }
    setRaflar([...raflar, newRaf])
  }

  const updateRaf = (id: string, updates: Partial<Raf>) => {
    setRaflar(raflar.map(raf => 
      raf.id === id ? { ...raf, ...updates } : raf
    ))
  }

  const removeRaf = (id: string) => {
    setRaflar(raflar.filter(raf => raf.id !== id))
  }

  const addKoli = (rafId: string, koli: Omit<Koli, 'id'>) => {
    const newKoli = {
      ...koli,
      id: Math.random().toString(36).substr(2, 9)
    }
    setRaflar(raflar.map(raf =>
      raf.id === rafId ? { ...raf, koli: newKoli } : raf
    ))
  }

  const removeKoli = (rafId: string) => {
    setRaflar(raflar.map(raf =>
      raf.id === rafId ? { ...raf, koli: undefined } : raf
    ))
  }

  const moveKoli = (fromRafId: string, toRafId: string) => {
    const fromRaf = raflar.find(r => r.id === fromRafId)
    if (!fromRaf?.koli) return

    setRaflar(raflar.map(raf => {
      if (raf.id === fromRafId) return { ...raf, koli: undefined }
      if (raf.id === toRafId) return { ...raf, koli: fromRaf.koli }
      return raf
    }))
  }

  return (
    <DepoContext.Provider value={{ 
      raflar, 
      sections, 
      addRaf, 
      updateRaf, 
      removeRaf,
      addKoli,
      removeKoli,
      moveKoli
    }}>
      {children}
    </DepoContext.Provider>
  )
}

export const useDepo = () => {
  const context = useContext(DepoContext)
  if (!context) {
    throw new Error('useDepo must be used within a DepoProvider')
  }
  return context
} 
'use client'

import { useState } from 'react'
import { Section, Raf } from '../../types/depo'

interface RafEklemeFormuProps {
  sections: Section[]
  selectedSection: 'A' | 'B' | 'C'
  onRafEkle: (raf: Omit<Raf, 'id'>) => void
}

export function RafEklemeFormu({ sections, selectedSection, onRafEkle }: RafEklemeFormuProps) {
  const [yeniRaf, setYeniRaf] = useState<Omit<Raf, 'id'>>({
    position: [0, 2, -8],
    rotation: 0,
    color: '#FF0000',
    section: sections.find(s => s.id === selectedSection)!,
    level: 1,
    koli: undefined
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onRafEkle(yeniRaf)
    // Pozisyonu otomatik güncelle
    setYeniRaf(prev => ({
      ...prev,
      position: [prev.position[0] + 5, prev.position[1], prev.position[2]]
    }))
  }

  // Seviye seçimi için onChange handler'ı
  const handleLevelChange = (value: string) => {
    const level = Number(value) as 1 | 2 | 3
    setYeniRaf(prev => ({ ...prev, level }))
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-blue-50 rounded-lg">
      <h3 className="font-medium mb-3">Yeni Raf Ekle</h3>
      
      <div className="space-y-4">
        {/* Pozisyon */}
        <div>
          <label className="block text-sm font-medium mb-1">Pozisyon</label>
          <div className="grid grid-cols-3 gap-2">
            {['X', 'Y', 'Z'].map((axis, index) => (
              <div key={axis}>
                <input
                  type="number"
                  value={yeniRaf.position[index]}
                  onChange={(e) => {
                    const newPosition = [...yeniRaf.position] as [number, number, number]
                    newPosition[index] = Number(e.target.value)
                    setYeniRaf(prev => ({ ...prev, position: newPosition }))
                  }}
                  className="w-full p-1 border rounded text-sm"
                  placeholder={axis}
                />
                <span className="text-xs text-gray-500">{axis}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Raf Rengi */}
        <div>
          <label className="block text-sm font-medium mb-1">Raf Rengi</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={yeniRaf.color}
              onChange={(e) => setYeniRaf(prev => ({ ...prev, color: e.target.value }))}
              className="w-8 h-8 rounded"
            />
            <span className="text-sm text-gray-600">{yeniRaf.color}</span>
          </div>
        </div>

        {/* Seviye */}
        <div>
          <label className="block text-sm font-medium mb-1">Seviye</label>
          <select
            value={yeniRaf.level}
            onChange={(e) => handleLevelChange(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value={1}>Seviye 1</option>
            <option value={2}>Seviye 2</option>
            <option value={3}>Seviye 3</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Raf Ekle
        </button>
      </div>
    </form>
  )
} 
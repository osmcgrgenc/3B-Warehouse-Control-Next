'use client'

import { Raf } from '../../types/depo'

interface RafListesiProps {
  raflar: Raf[]
  selectedSection: 'A' | 'B' | 'C'
}

export function RafListesi({ raflar, selectedSection }: RafListesiProps) {
  const sectionRaflar = raflar.filter(raf => raf.section.id === selectedSection)

  return (
    <div className="mb-4">
      <h3 className="font-medium mb-2">Mevcut Raflar</h3>
      <div className="space-y-2">
        {sectionRaflar.map(raf => (
          <div key={raf.id} className="p-2 bg-gray-50 rounded flex justify-between items-center">
            <div>
              <div className="text-sm font-medium">Raf {raf.id}</div>
              <div className="text-xs text-gray-500">Seviye {raf.level}</div>
              {raf.koli && (
                <div className="text-xs text-blue-500">Koli var</div>
              )}
            </div>
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: raf.color }}
            />
          </div>
        ))}
      </div>
    </div>
  )
} 
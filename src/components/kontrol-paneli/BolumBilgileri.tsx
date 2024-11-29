'use client'

import { Raf } from '../../types/depo'

interface BolumBilgileriProps {
  raflar?: Raf[];
  selectedSection: 'A' | 'B' | 'C';
}

export function BolumBilgileri({ raflar, selectedSection }: BolumBilgileriProps) {
  const sectionRaflar = raflar?.filter(r => r.section.id === selectedSection)
  const doluRaflar = sectionRaflar?.filter(r => !!r.koli)

  return (
    <div className="mb-4 p-3 bg-gray-50 rounded">
      <h3 className="font-medium mb-2">Bölüm Bilgileri</h3>
      <p className="text-sm text-gray-600">
        Raf Sayısı: {sectionRaflar?.length}
      </p>
      <p className="text-sm text-gray-600">
        Dolu Raf: {doluRaflar?.length}
      </p>
    </div>
  )
} 
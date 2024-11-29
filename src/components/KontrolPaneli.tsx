'use client'

import { useState } from 'react'
import { useDepo } from '@/contexts/DepoContext'
import { BolumSecimi } from './kontrol-paneli/BolumSecimi'
import { BolumBilgileri } from './kontrol-paneli/BolumBilgileri'
import { RafEklemeFormu } from './kontrol-paneli/RafEklemeFormu'
import { KoliEklemeFormu } from './kontrol-paneli/KoliEklemeFormu'
import { RafListesi } from './kontrol-paneli/RafListesi'

export default function KontrolPaneli() {
  const { raflar, sections, addRaf, addKoli } = useDepo()
  const [selectedSection, setSelectedSection] = useState<'A' | 'B' | 'C'>('A')

  const filteredRaflar = raflar?.filter(raf => raf.section.id === selectedSection) || []

  return (
    <div className="fixed top-4 right-4 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl w-80 border border-gray-200 max-h-[90vh] overflow-y-auto">
      <h2 className="text-xl font-bold mb-6">Depo Yönetimi</h2>

      <BolumSecimi 
        sections={sections}
        selectedSection={selectedSection}
        onSectionChange={setSelectedSection}
      />

      <BolumBilgileri 
        raflar={filteredRaflar}
        selectedSection={selectedSection}
      />

      <RafEklemeFormu 
        sections={sections}
        selectedSection={selectedSection}
        onRafEkle={addRaf}
      />

      <KoliEklemeFormu 
        raflar={filteredRaflar}
        onKoliEkle={addKoli}
      />

      <RafListesi 
        raflar={filteredRaflar}
        selectedSection={selectedSection}
      />
    </div>
  )
} 
'use client'

import { useState } from 'react'
import { Koli, Raf } from '../../types/depo'

interface KoliEklemeFormuProps {
  raflar: Raf[];
  onKoliEkle: (rafId: string, koli: Omit<Koli, 'id'>) => void;
}

export function KoliEklemeFormu({ raflar, onKoliEkle }: KoliEklemeFormuProps) {
  const [secilenRafId, setSecilenRafId] = useState<string>('')
  const [yeniKoli, setYeniKoli] = useState<Omit<Koli, 'id'>>({
    name: '',
    color: '#8B4513',
    content: '',
    weight: 0,
    category: 'diğer',
    createdAt: new Date()
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!secilenRafId) {
      alert('Lütfen bir raf seçin')
      return
    }
    onKoliEkle(secilenRafId, yeniKoli)
    // Formu sıfırla
    setYeniKoli({
      name: '',
      color: '#8B4513',
      content: '',
      weight: 0,
      category: 'diğer',
      createdAt: new Date()
    })
    setSecilenRafId('')
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-yellow-50 rounded-lg">
      <h3 className="font-medium mb-3">Yeni Koli Ekle</h3>
      
      {/* Raf Seçimi */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Raf Seçimi</label>
        <select
          value={secilenRafId}
          onChange={(e) => setSecilenRafId(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Raf Seçin</option>
          {raflar.filter(raf => !raf.koli).map(raf => (
            <option key={raf.id} value={raf.id}>
              Raf {raf.id} (Seviye {raf.level})
            </option>
          ))}
        </select>
      </div>

      {/* Diğer form alanları... */}
    </form>
  )
} 
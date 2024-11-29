'use client'

import dynamic from 'next/dynamic'
import Modal from '@/components/Modal'
import Tooltip from '@/components/Tooltip'
import KontrolPaneli from '@/components/KontrolPaneli'
import { ModalProvider } from '@/contexts/ModalContext'
import { RafProvider } from '@/contexts/RafContext'
import { DepoProvider } from '@/contexts/DepoContext'

// Canvas'ı client-side only olarak import ediyoruz
const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
})

export default function Home() {
  return (
    <ModalProvider>
      <DepoProvider>
        <RafProvider>
          <main className="h-screen w-full">
            <Scene />
            <Modal />
            <Tooltip />
            <KontrolPaneli />
          </main>
        </RafProvider>
      </DepoProvider>
    </ModalProvider>
  )
}
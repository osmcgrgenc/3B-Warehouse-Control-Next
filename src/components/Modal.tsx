'use client'

import { useModal } from '@/contexts/ModalContext'

const Modal: React.FC = () => {
  const { isOpen, modalContent, closeModal } = useModal()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
        <div className="mb-4">{modalContent}</div>
        <button
          onClick={closeModal}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Kapat
        </button>
      </div>
    </div>
  )
}

export default Modal 
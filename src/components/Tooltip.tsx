'use client'

export default function Tooltip() {
  return (
    <div className="fixed bottom-4 left-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-gray-200 max-w-sm">
      <div className="space-y-2">
        <p className="flex items-center gap-2 text-gray-700">
          <span className="text-green-500">🔄</span> 
          <span>Yeşil küplere tıklayarak rafları döndürebilirsiniz</span>
        </p>
        <p className="flex items-center gap-2 text-gray-700">
          <span className="text-brown-500">📦</span> 
          <span>Kolilere tıklayarak içeriklerini görebilirsiniz</span>
        </p>
        <p className="flex items-center gap-2 text-gray-700">
          <span className="text-blue-500">✋</span> 
          <span>Rafları sürükleyerek taşıyabilirsiniz</span>
        </p>
      </div>
    </div>
  )
}
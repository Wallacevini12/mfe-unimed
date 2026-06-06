// BuscarHorarios.tsx
import React, { useState } from 'react'

export default function BuscarHorarios() {
  const [q, setQ] = useState('')
  return (
    <div className="space-y-4 max-w-xl">
      <h2 className="font-semibold text-gray-700">Buscar Horários Disponíveis</h2>
      <input value={q} onChange={e => setQ(e.target.value)}
        placeholder="Buscar por especialidade, médico ou clínica..."
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-unimed-green transition-colors" />
      {q.length > 1 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
          {['Dr. Carlos Mendes — Clínico Geral', 'Clínica Saúde+ — Exames', 'Dra. Ana Lima — Clínico Geral'].map(r => (
            <div key={r} className="px-5 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <span className="text-sm text-gray-700">{r}</span>
              <button className="text-xs text-unimed-green font-medium hover:underline">Ver horários</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

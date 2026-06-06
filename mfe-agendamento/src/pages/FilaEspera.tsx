import React from 'react'

const FILA = [
  { id:1, ben:'Paulo Ferreira',  esp:'Cardiologia',  entrada:'28/03/2026', posicao:1 },
  { id:2, ben:'Luiza Martins',   esp:'Ortopedia',    entrada:'29/03/2026', posicao:2 },
  { id:3, ben:'Carlos Nunes',    esp:'Cardiologia',  entrada:'30/03/2026', posicao:3 },
]

export default function FilaEspera() {
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-gray-700">Fila de Espera</h2>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              {['Posição', 'Beneficiário', 'Especialidade', 'Data de entrada', 'Ação'].map(h => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FILA.map(f => (
              <tr key={f.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3">
                  <span className="w-7 h-7 rounded-full bg-unimed-light text-unimed-dark text-xs font-semibold flex items-center justify-center">{f.posicao}</span>
                </td>
                <td className="px-5 py-3 font-medium text-gray-700">{f.ben}</td>
                <td className="px-5 py-3 text-gray-500">{f.esp}</td>
                <td className="px-5 py-3 text-gray-500">{f.entrada}</td>
                <td className="px-5 py-3">
                  <button className="text-xs text-unimed-green font-medium hover:underline">Agendar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

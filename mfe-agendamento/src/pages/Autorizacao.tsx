import React, { useState } from 'react'

const PENDENCIAS = [
  { id:1, ben:'Maria Silva',   proc:'Ressonância Magnética', data:'30/03/2026', urgencia:'Alta' },
  { id:2, ben:'João Oliveira', proc:'Colonoscopia',          data:'29/03/2026', urgencia:'Normal' },
]

export default function Autorizacao() {
  const [aprovados, setAprovados] = useState<number[]>([])
  const [recusados, setRecusados] = useState<number[]>([])

  return (
    <div className="space-y-4 max-w-2xl">
      <h2 className="font-semibold text-gray-700">Pré-autorizações Pendentes</h2>
      {PENDENCIAS.map(p => {
        const aprovado = aprovados.includes(p.id)
        const recusado = recusados.includes(p.id)
        return (
          <div key={p.id} className={`bg-white rounded-2xl border shadow-sm p-5 transition-all ${
            aprovado ? 'border-green-200' : recusado ? 'border-red-200' : 'border-gray-100'
          }`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-gray-800">{p.proc}</p>
                <p className="text-sm text-gray-500 mt-0.5">Beneficiário: {p.ben}</p>
                <p className="text-xs text-gray-400 mt-0.5">Solicitado em {p.data}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                p.urgencia === 'Alta' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
              }`}>{p.urgencia}</span>
            </div>
            {!aprovado && !recusado && (
              <div className="flex gap-3 mt-4">
                <button onClick={() => setAprovados(a => [...a, p.id])}
                  className="px-4 py-2 bg-unimed-green text-white rounded-lg text-xs font-medium hover:bg-unimed-dark transition-colors">
                  Autorizar
                </button>
                <button onClick={() => setRecusados(r => [...r, p.id])}
                  className="px-4 py-2 border border-red-200 text-red-500 rounded-lg text-xs font-medium hover:bg-red-50 transition-colors">
                  Recusar
                </button>
              </div>
            )}
            {aprovado && <p className="mt-3 text-xs text-green-600 font-medium">✓ Autorizado</p>}
            {recusado && <p className="mt-3 text-xs text-red-500 font-medium">✗ Recusado</p>}
          </div>
        )
      })}
    </div>
  )
}

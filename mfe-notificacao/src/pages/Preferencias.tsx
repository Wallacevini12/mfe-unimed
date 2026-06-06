import React, { useState } from 'react'

type Canal = 'email' | 'sms' | 'push'

interface Preferencia {
  evento: string
  canais: Canal[]
}

const EVENTOS_INICIAIS: Preferencia[] = [
  { evento: 'Confirmação de agendamento', canais: ['email', 'push'] },
  { evento: 'Lembrete 48h antes',         canais: ['sms']           },
  { evento: 'Lembrete 24h antes',         canais: ['sms', 'push']   },
  { evento: 'Cancelamento',               canais: ['email', 'sms']  },
  { evento: 'Resultado de pré-autorização', canais: ['email']        },
]

const CANAL_LABEL: Record<Canal, string> = { email: '✉ E-mail', sms: '✆ SMS', push: '⬡ Push' }

export default function Preferencias() {
  const [prefs, setPrefs] = useState(EVENTOS_INICIAIS)
  const [salvo, setSalvo] = useState(false)

  function toggle(eventoIdx: number, canal: Canal) {
    setPrefs(prev => prev.map((p, i) => {
      if (i !== eventoIdx) return p
      const has = p.canais.includes(canal)
      return { ...p, canais: has ? p.canais.filter(c => c !== canal) : [...p.canais, canal] }
    }))
    setSalvo(false)
  }

  function salvar() {
    setSalvo(true)
    setTimeout(() => setSalvo(false), 2500)
  }

  return (
    <div className="max-w-xl space-y-5">
      <div>
        <h2 className="font-semibold text-gray-700">Preferências de Canal</h2>
        <p className="text-sm text-gray-400 mt-0.5">Escolha como deseja receber cada tipo de notificação.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-4 px-5 py-3 border-b border-gray-100 bg-gray-50">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide col-span-1">Evento</span>
          {(['email','sms','push'] as Canal[]).map(c => (
            <span key={c} className="text-xs font-semibold text-gray-400 uppercase tracking-wide text-center">{c}</span>
          ))}
        </div>

        {prefs.map((pref, i) => (
          <div key={pref.evento} className={`grid grid-cols-4 px-5 py-4 items-center ${i < prefs.length - 1 ? 'border-b border-gray-50' : ''}`}>
            <span className="text-sm text-gray-700 col-span-1 pr-4">{pref.evento}</span>
            {(['email','sms','push'] as Canal[]).map(canal => {
              const ativo = pref.canais.includes(canal)
              return (
                <div key={canal} className="flex justify-center">
                  <button
                    onClick={() => toggle(i, canal)}
                    aria-label={`${ativo ? 'Desativar' : 'Ativar'} ${canal} para ${pref.evento}`}
                    className={`w-10 h-6 rounded-full transition-all relative ${
                      ativo ? 'bg-unimed-teal' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${
                      ativo ? 'left-5' : 'left-1'
                    }`} />
                  </button>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={salvar}
          className="px-6 py-2.5 bg-unimed-teal text-white rounded-xl text-sm font-medium hover:bg-unimed-green transition-colors"
        >
          Salvar preferências
        </button>
        {salvo && (
          <span className="text-sm text-green-600 font-medium animate-pulse">✓ Preferências salvas!</span>
        )}
      </div>
    </div>
  )
}

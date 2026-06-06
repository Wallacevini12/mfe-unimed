import React, { useState } from 'react'

const TEMPLATES_INICIAIS = [
  {
    id: 1,
    tipo: 'Confirmação',
    canal: 'E-mail',
    assunto: 'Agendamento confirmado — Unimed',
    corpo: 'Olá {{beneficiario}}, sua {{tipo_servico}} com {{prestador}} foi confirmada para {{data}} às {{horario}}. Em caso de dúvidas, entre em contato pelo app.',
  },
  {
    id: 2,
    tipo: 'Lembrete',
    canal: 'SMS',
    assunto: '',
    corpo: 'Unimed: lembrete de {{tipo_servico}} com {{prestador}} em {{data}} às {{horario}}. Dúvidas? Acesse o app.',
  },
  {
    id: 3,
    tipo: 'Cancelamento',
    canal: 'E-mail',
    assunto: 'Agendamento cancelado — Unimed',
    corpo: 'Olá {{beneficiario}}, seu agendamento com {{prestador}} em {{data}} foi cancelado. Reagende pelo app ou ligue para a central.',
  },
  {
    id: 4,
    tipo: 'Autorização',
    canal: 'Push',
    assunto: '',
    corpo: 'Sua solicitação de {{procedimento}} foi {{status_autorizacao}}. Acesse o app para mais detalhes.',
  },
]

const TIPO_COLOR: Record<string, string> = {
  'Confirmação':  'bg-green-100 text-green-700',
  'Lembrete':     'bg-yellow-100 text-yellow-700',
  'Cancelamento': 'bg-red-100 text-red-700',
  'Autorização':  'bg-teal-100 text-teal-700',
}

export default function Templates() {
  const [templates, setTemplates] = useState(TEMPLATES_INICIAIS)
  const [editando, setEditando] = useState<number | null>(null)
  const [corpoEdit, setCorpoEdit] = useState('')
  const [assuntoEdit, setAssuntoEdit] = useState('')

  function iniciarEdicao(t: typeof TEMPLATES_INICIAIS[0]) {
    setEditando(t.id)
    setCorpoEdit(t.corpo)
    setAssuntoEdit(t.assunto)
  }

  function salvarEdicao(id: number) {
    setTemplates(prev => prev.map(t => t.id === id ? { ...t, corpo: corpoEdit, assunto: assuntoEdit } : t))
    setEditando(null)
  }

  return (
    <div className="space-y-4 max-w-2xl">
      <div>
        <h2 className="font-semibold text-gray-700">Templates de Notificação</h2>
        <p className="text-sm text-gray-400 mt-0.5">
          Use <code className="bg-gray-100 px-1 rounded text-xs">{'{{variavel}}'}</code> para inserir dados dinâmicos.
        </p>
      </div>

      {templates.map(t => (
        <div key={t.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${TIPO_COLOR[t.tipo]}`}>{t.tipo}</span>
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">{t.canal}</span>
            </div>
            {editando !== t.id && (
              <button
                onClick={() => iniciarEdicao(t)}
                className="text-xs text-unimed-teal font-medium hover:underline"
              >
                Editar
              </button>
            )}
          </div>

          {editando === t.id ? (
            <div className="space-y-3">
              {t.canal === 'E-mail' && (
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1">Assunto</label>
                  <input
                    value={assuntoEdit}
                    onChange={e => setAssuntoEdit(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-unimed-teal transition-colors"
                  />
                </div>
              )}
              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1">Mensagem</label>
                <textarea
                  value={corpoEdit}
                  onChange={e => setCorpoEdit(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-unimed-teal transition-colors resize-none"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => salvarEdicao(t.id)}
                  className="px-4 py-1.5 bg-unimed-teal text-white rounded-lg text-xs font-medium hover:bg-unimed-green transition-colors"
                >
                  Salvar
                </button>
                <button
                  onClick={() => setEditando(null)}
                  className="px-4 py-1.5 border border-gray-200 text-gray-500 rounded-lg text-xs hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              {t.assunto && (
                <p className="text-xs text-gray-400">
                  <span className="font-medium">Assunto:</span> {t.assunto}
                </p>
              )}
              <p className="text-sm text-gray-600 leading-relaxed">{t.corpo}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

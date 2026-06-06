import React, { useEffect, useState, useCallback } from 'react'
import { listarNotificacoes, Notificacao } from '../api'

type CanalFiltro = 'todos' | 'EMAIL' | 'SMS' | 'PUSH'

const CANAL_ICON: Record<string, string> = { EMAIL: '✉', SMS: '✆', PUSH: '⬡' }
const CANAL_COLOR: Record<string, string> = {
  EMAIL: 'bg-blue-100 text-blue-700',
  SMS:   'bg-purple-100 text-purple-700',
  PUSH:  'bg-orange-100 text-orange-700',
}
const TIPO_LABEL: Record<string, string> = {
  CONFIRMACAO: 'Confirmação', LEMBRETE: 'Lembrete',
  CANCELAMENTO: 'Cancelamento', AUTORIZACAO: 'Autorização',
}
const TIPO_COLOR: Record<string, string> = {
  CONFIRMACAO:  'bg-green-100 text-green-700',
  LEMBRETE:     'bg-yellow-100 text-yellow-700',
  CANCELAMENTO: 'bg-red-100 text-red-700',
  AUTORIZACAO:  'bg-teal-100 text-teal-700',
}
const STATUS_INFO: Record<string, { txt: string; cls: string }> = {
  ENVIADA:  { txt: '✓ Enviada',  cls: 'text-green-600' },
  LIDA:     { txt: '✓ Lida',     cls: 'text-blue-600' },
  FALHOU:   { txt: '✗ Falhou',   cls: 'text-red-500' },
  PENDENTE: { txt: '⏳ Pendente', cls: 'text-gray-400' },
}

function formatData(d?: string | null) {
  if (!d) return '—'
  const dt = new Date(d)
  if (isNaN(dt.getTime())) return d
  return dt.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function HistoricoNotificacoes() {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')
  const [filtroCanal, setFiltroCanal] = useState<CanalFiltro>('todos')
  const [busca, setBusca] = useState('')
  const [expandido, setExpandido] = useState<number | null>(null)

  const carregar = useCallback(async () => {
    setLoading(true); setErro('')
    try {
      setNotificacoes(await listarNotificacoes())
    } catch (e: any) {
      setErro(e.message ?? 'Erro ao carregar')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { carregar() }, [carregar])

  const filtradas = notificacoes.filter(n => {
    const porCanal = filtroCanal === 'todos' || n.canal === filtroCanal
    const alvo = `${n.beneficiarioNome ?? ''} ${TIPO_LABEL[n.tipo] ?? ''}`.toLowerCase()
    return porCanal && alvo.includes(busca.toLowerCase())
  })

  const stats = {
    total:     notificacoes.length,
    enviadas:  notificacoes.filter(n => n.status === 'ENVIADA' || n.status === 'LIDA').length,
    falhas:    notificacoes.filter(n => n.status === 'FALHOU').length,
    pendentes: notificacoes.filter(n => n.status === 'PENDENTE').length,
  }

  if (loading) return <div className="text-center py-12 text-gray-400">Carregando notificações…</div>

  if (erro) return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-red-600 text-sm">
      {erro} — verifique se o BFF está rodando na porta 3000.
      <button onClick={carregar} className="ml-3 underline">Tentar novamente</button>
    </div>
  )

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Total enviadas', value: stats.total,     cor: 'border-l-gray-400'   },
          { label: 'Entregues',      value: stats.enviadas,  cor: 'border-l-green-500'  },
          { label: 'Falhas',         value: stats.falhas,    cor: 'border-l-red-400'    },
          { label: 'Pendentes',      value: stats.pendentes, cor: 'border-l-yellow-400' },
        ].map(({ label, value, cor }) => (
          <div key={label} className={`bg-white rounded-xl border border-gray-100 border-l-4 ${cor} shadow-sm px-4 py-3`}>
            <p className="text-2xl font-semibold text-gray-800">{value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <input
          value={busca}
          onChange={e => setBusca(e.target.value)}
          placeholder="Buscar por destinatário ou tipo..."
          className="border border-gray-200 rounded-xl px-4 py-2 text-sm w-72 focus:outline-none focus:border-unimed-teal transition-colors"
        />
        <div className="flex gap-1 bg-white rounded-xl p-1 border border-gray-100 shadow-sm">
          {(['todos','EMAIL','SMS','PUSH'] as CanalFiltro[]).map(c => (
            <button key={c} onClick={() => setFiltroCanal(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                filtroCanal === c ? 'bg-unimed-teal text-white' : 'text-gray-500 hover:bg-gray-50'
              }`}>
              {c === 'todos' ? 'Todos' : `${CANAL_ICON[c]} ${c}`}
            </button>
          ))}
        </div>
        <button onClick={carregar} className="text-xs text-unimed-teal hover:underline ml-auto">↻ Atualizar</button>
      </div>

      {/* List */}
      <div className="space-y-2">
        {filtradas.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">Nenhuma notificação encontrada.</div>
        )}
        {filtradas.map(n => {
          const st = STATUS_INFO[n.status ?? 'PENDENTE'] ?? STATUS_INFO.PENDENTE
          return (
            <div key={n.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <button
                onClick={() => setExpandido(expandido === n.id ? null : (n.id ?? null))}
                className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
              >
                <span className={`text-xs px-2 py-1 rounded-full font-medium w-16 text-center ${CANAL_COLOR[n.canal]}`}>
                  {CANAL_ICON[n.canal]} {n.canal}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${TIPO_COLOR[n.tipo]}`}>
                  {TIPO_LABEL[n.tipo] ?? n.tipo}
                </span>
                <span className="text-sm text-gray-700 flex-1 truncate">{n.beneficiarioNome}</span>
                <span className="text-xs text-gray-400 whitespace-nowrap">{formatData(n.enviadoEm ?? n.createdAt)}</span>
                <span className={`text-xs font-semibold whitespace-nowrap ${st.cls}`}>{st.txt}</span>
                <span className="text-gray-300 text-xs">{expandido === n.id ? '▲' : '▼'}</span>
              </button>
              {expandido === n.id && (
                <div className="px-5 pb-4 border-t border-gray-50">
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">{n.mensagem}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

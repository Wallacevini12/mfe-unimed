import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BFF_URL = (import.meta as any).env?.VITE_BFF_URL ?? 'http://localhost:3000'

const QUICK = [
  { label: 'Novo agendamento',    to: '/agendamento/novo',     icon: '＋', desc: 'Marcar consulta ou exame' },
  { label: 'Ver notificações',    to: '/notificacoes',         icon: '◎', desc: 'Histórico de comunicações' },
  { label: 'Fila de espera',      to: '/agendamento/fila',     icon: '≡',  desc: 'Gerenciar lista de espera' },
  { label: 'Pré-autorizações',    to: '/agendamento/autorizacao', icon: '✓', desc: 'Revisar pendências' },
]

interface Agendamento {
  id?: string; beneficiarioNome: string; prestadorNome: string
  data: string; horario: string; tipo: string; status: string
}

function statusLabel(s?: string) {
  switch (s) {
    case 'CONFIRMADO': return { txt: 'Confirmado', cls: 'bg-green-100 text-green-700' }
    case 'CANCELADO':  return { txt: 'Cancelado',  cls: 'bg-red-100 text-red-700' }
    case 'CONCLUIDO':  return { txt: 'Concluído',  cls: 'bg-blue-100 text-blue-700' }
    default:           return { txt: 'Pendente',   cls: 'bg-yellow-100 text-yellow-700' }
  }
}

function tipoLabel(t?: string) {
  return t === 'CONSULTA' ? 'Consulta' : t === 'EXAME' ? 'Exame' : t === 'PROCEDIMENTO' ? 'Procedimento' : t ?? ''
}

function formatData(data: string, horario?: string) {
  if (!data) return ''
  const iso = data.includes('T') ? data.split('T')[0] : data
  const [y, m, d] = iso.split('-')
  const dataBR = y && m && d ? `${d}/${m}` : data
  return horario ? `${dataBR} ${horario}` : dataBR
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({ agendamentos: 0, confirmados: 0, notificacoes: 0, pendentes: 0 })
  const [recentes, setRecentes] = useState<Agendamento[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${BFF_URL}/aggregated-data`)
        const json = await res.json()

        const ags: Agendamento[] = json.agendamentos?.data ?? json.agendamentos ?? []
        const notifs = json.notificacoes?.data ?? json.notificacoes ?? []

        setStats({
          agendamentos: ags.length,
          confirmados:  ags.filter(a => a.status === 'CONFIRMADO').length,
          notificacoes: Array.isArray(notifs) ? notifs.length : 0,
          pendentes:    ags.filter(a => a.status === 'PENDENTE').length,
        })
        setRecentes(ags.slice(0, 5))
      } catch {
        // silencioso — mostra zeros se BFF estiver fora
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const STAT_CARDS = [
    { label: 'Total de agendamentos', value: stats.agendamentos, delta: 'Via aggregated-data', color: 'bg-unimed-green' },
    { label: 'Confirmados',           value: stats.confirmados,  delta: 'Status CONFIRMADO',   color: 'bg-unimed-accent' },
    { label: 'Notificações',          value: stats.notificacoes, delta: 'Total no sistema',    color: 'bg-unimed-teal' },
    { label: 'Pendentes',             value: stats.pendentes,    delta: 'Aguardando confirmação', color: 'bg-gray-600' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl text-unimed-dark">Bom dia, Wallace ✦</h2>
        <p className="text-gray-500 text-sm mt-1">
          {loading ? 'Carregando dados do BFF…' : 'Aqui está o resumo de hoje (dados reais via /aggregated-data).'}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {STAT_CARDS.map(({ label, value, delta, color }) => (
          <div key={label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className={`w-2 h-2 rounded-full ${color} mb-3`} />
            <p className="text-3xl font-semibold text-gray-800">{value}</p>
            <p className="text-sm text-gray-500 mt-1">{label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{delta}</p>
          </div>
        ))}
      </div>

      {/* Quick access */}
      <div>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Acesso rápido</h3>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {QUICK.map(({ label, to, icon, desc }) => (
            <button key={to} onClick={() => navigate(to)}
              className="text-left bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:border-unimed-green hover:shadow-md transition-all group">
              <span className="text-2xl text-unimed-green group-hover:scale-110 inline-block transition-transform">{icon}</span>
              <p className="font-semibold text-gray-800 mt-3 text-sm">{label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent */}
      <div>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Agendamentos recentes</h3>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['Beneficiário', 'Prestador', 'Data', 'Tipo', 'Status'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentes.length === 0 && (
                <tr><td colSpan={5} className="px-5 py-6 text-center text-gray-400">
                  {loading ? 'Carregando…' : 'Nenhum agendamento ainda.'}
                </td></tr>
              )}
              {recentes.map((row, i) => {
                const st = statusLabel(row.status)
                return (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-gray-700">{row.beneficiarioNome}</td>
                    <td className="px-5 py-3 text-gray-500">{row.prestadorNome}</td>
                    <td className="px-5 py-3 text-gray-500">{formatData(row.data, row.horario)}</td>
                    <td className="px-5 py-3 text-gray-500">{tipoLabel(row.tipo)}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${st.cls}`}>{st.txt}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

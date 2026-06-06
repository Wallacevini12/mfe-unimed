// MeusAgendamentos.tsx — conectado ao BFF (GET / PUT / DELETE)
import React, { useEffect, useState, useCallback } from 'react'
import {
  listarAgendamentos, atualizarStatus, excluirAgendamento, Agendamento,
} from '../api'

function formatData(data: string, horario?: string) {
  // aceita "2026-06-11" + "09:00"  ->  "11/06/2026 09:00"
  if (!data) return ''
  const iso = data.includes('T') ? data.split('T')[0] : data
  const [y, m, d] = iso.split('-')
  const dataBR = y && m && d ? `${d}/${m}/${y}` : data
  return horario ? `${dataBR} ${horario}` : dataBR
}

function statusLabel(s?: string) {
  switch (s) {
    case 'CONFIRMADO': return { txt: 'Confirmado', cls: 'bg-green-100 text-green-700' }
    case 'CANCELADO':  return { txt: 'Cancelado',  cls: 'bg-red-100 text-red-700' }
    case 'CONCLUIDO':  return { txt: 'Concluído',  cls: 'bg-blue-100 text-blue-700' }
    default:           return { txt: 'Pendente',   cls: 'bg-yellow-100 text-yellow-700' }
  }
}

export default function MeusAgendamentos() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')

  const carregar = useCallback(async () => {
    setLoading(true); setErro('')
    try {
      setAgendamentos(await listarAgendamentos())
    } catch (e: any) {
      setErro(e.message ?? 'Erro ao carregar')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { carregar() }, [carregar])

  async function handleConfirmar(id: string) {
    await atualizarStatus(id, 'CONFIRMADO'); carregar()
  }
  async function handleCancelar(id: string) {
    await atualizarStatus(id, 'CANCELADO'); carregar()
  }
  async function handleExcluir(id: string) {
    await excluirAgendamento(id); carregar()
  }

  if (loading) return (
    <div className="text-center py-12 text-gray-400">Carregando agendamentos…</div>
  )

  if (erro) return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-red-600 text-sm">
      {erro} — verifique se o BFF está rodando na porta 3000.
      <button onClick={carregar} className="ml-3 underline">Tentar novamente</button>
    </div>
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-700">Meus Agendamentos</h2>
        <button onClick={carregar}
          className="text-xs text-unimed-green hover:text-unimed-dark transition-colors">
          ↻ Atualizar
        </button>
      </div>

      {agendamentos.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center text-gray-400 text-sm">
          Nenhum agendamento ainda. Crie um na aba “Novo Agendamento”.
        </div>
      )}

      {agendamentos.map(a => {
        const id = (a.id ?? a._id) as string
        const st = statusLabel(a.status)
        return (
          <div key={id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">
                {a.tipo === 'CONSULTA' ? 'Consulta' : a.tipo === 'EXAME' ? 'Exame' : 'Procedimento'} — {a.especialidade}
              </p>
              <p className="text-sm text-gray-500 mt-0.5">{a.prestadorNome}</p>
              <p className="text-sm text-gray-400 mt-0.5">{formatData(a.data, a.horario)}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${st.cls}`}>{st.txt}</span>
              {a.status !== 'CONFIRMADO' && a.status !== 'CANCELADO' && (
                <button onClick={() => handleConfirmar(id)}
                  className="text-xs text-green-500 hover:text-green-700 transition-colors">Confirmar</button>
              )}
              {a.status !== 'CANCELADO' && (
                <button onClick={() => handleCancelar(id)}
                  className="text-xs text-orange-400 hover:text-orange-600 transition-colors">Cancelar</button>
              )}
              <button onClick={() => handleExcluir(id)}
                className="text-xs text-red-400 hover:text-red-600 transition-colors">Excluir</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

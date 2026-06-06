// src/api.ts — cliente HTTP do MFE de Agendamento (fala com o BFF)
const BFF_URL = (import.meta as any).env?.VITE_BFF_URL ?? 'http://localhost:3000'

export interface Agendamento {
  id?: string
  beneficiarioId: string
  beneficiarioNome: string
  prestadorId: string
  prestadorNome: string
  especialidade: string
  tipo: 'CONSULTA' | 'EXAME' | 'PROCEDIMENTO'
  data: string
  horario: string
  status?: 'PENDENTE' | 'CONFIRMADO' | 'CANCELADO' | 'CONCLUIDO'
  observacoes?: string
}

export async function listarAgendamentos(): Promise<Agendamento[]> {
  const res = await fetch(`${BFF_URL}/agendamentos`)
  if (!res.ok) throw new Error('Falha ao listar agendamentos')
  const json = await res.json()
  return Array.isArray(json) ? json : (json.data ?? [])
}

/**
 * Retorna os horários já ocupados para um prestador numa data específica.
 * Usado para desabilitar horários indisponíveis na tela de novo agendamento.
 */
export async function horariosOcupados(prestadorId: string, data: string): Promise<string[]> {
  const todos = await listarAgendamentos()
  const alvo = data.includes('T') ? data.split('T')[0] : data
  return todos
    .filter(a => {
      if (a.prestadorId !== prestadorId) return false
      if (a.status === 'CANCELADO') return false
      const dataAg = typeof a.data === 'string'
        ? (a.data.includes('T') ? a.data.split('T')[0] : a.data)
        : a.data
      return dataAg === alvo
    })
    .map(a => a.horario)
}

export async function criarAgendamento(payload: Agendamento): Promise<Agendamento> {
  const res = await fetch(`${BFF_URL}/agendamentos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error ?? 'Falha ao criar agendamento')
  }
  const json = await res.json()
  return json.data ?? json
}

export async function atualizarStatus(id: string, status: 'CONFIRMADO' | 'CANCELADO'): Promise<void> {
  const res = await fetch(`${BFF_URL}/agendamentos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  })
  if (!res.ok) throw new Error('Falha ao atualizar agendamento')
}

export async function excluirAgendamento(id: string): Promise<void> {
  const res = await fetch(`${BFF_URL}/agendamentos/${id}`, { method: 'DELETE' })
  if (!res.ok && res.status !== 204) throw new Error('Falha ao excluir agendamento')
}
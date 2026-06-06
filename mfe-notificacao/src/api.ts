// src/api.ts — cliente HTTP do MFE de Notificação (fala com o BFF)
const BFF_URL = (import.meta as any).env?.VITE_BFF_URL ?? 'http://localhost:3000'

export interface Notificacao {
  id?: number
  agendamentoId: string
  beneficiarioId: string
  beneficiarioNome: string
  tipo: 'CONFIRMACAO' | 'LEMBRETE' | 'CANCELAMENTO' | 'AUTORIZACAO'
  canal: 'EMAIL' | 'SMS' | 'PUSH'
  mensagem: string
  status?: 'PENDENTE' | 'ENVIADA' | 'FALHOU' | 'LIDA'
  tentativas?: number
  enviadoEm?: string | null
  createdAt?: string
}

export async function listarNotificacoes(): Promise<Notificacao[]> {
  const res = await fetch(`${BFF_URL}/notificacoes`)
  if (!res.ok) throw new Error('Falha ao listar notificações')
  const json = await res.json()
  return Array.isArray(json) ? json : (json.data ?? [])
}

export async function criarNotificacao(payload: Notificacao): Promise<Notificacao> {
  const res = await fetch(`${BFF_URL}/notificacoes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error ?? 'Falha ao criar notificação')
  }
  const json = await res.json()
  return json.data ?? json
}

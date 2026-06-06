import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { criarAgendamento } from '../api'

const STEPS = ['Escolher serviço', 'Selecionar horário', 'Confirmar']

const ESPECIALIDADES = [
  'Clínico Geral', 'Cardiologia', 'Ortopedia', 'Dermatologia', 'Pediatria',
]
const PRESTADORES: Record<string, { id: string; nome: string }[]> = {
  'Clínico Geral':  [{ id: 'p1', nome: 'Dr. Carlos Mendes' }, { id: 'p2', nome: 'Dra. Ana Lima' }],
  'Cardiologia':    [{ id: 'p3', nome: 'Dr. Roberto Farias' }, { id: 'p4', nome: 'Dra. Paula Ramos' }],
  'Ortopedia':      [{ id: 'p5', nome: 'Dr. Marcos Alves' }],
  'Dermatologia':   [{ id: 'p6', nome: 'Dra. Fernanda Costa' }],
  'Pediatria':      [{ id: 'p7', nome: 'Dr. João Souza' }, { id: 'p8', nome: 'Dra. Cláudia Neves' }],
}
const HORARIOS = ['08:00','09:00','10:00','11:00','14:00','15:00','16:00','17:00']

// Beneficiário fixo (logado) — em produção viria do contexto de autenticação
const BENEFICIARIO = { id: 'b1', nome: 'Wallace Vinicius' }

export default function NovoAgendamento() {
  const navigate = useNavigate()
  const [step, setStep]             = useState(0)
  const [especialidade, setEsp]     = useState('')
  const [tipo, setTipo]             = useState<'consulta'|'exame'>('consulta')
  const [prestador, setPrestador]   = useState<{ id: string; nome: string } | null>(null)
  const [data, setData]             = useState('')
  const [horario, setHorario]       = useState('')
  const [confirmado, setConfirmado] = useState(false)
  const [salvando, setSalvando]     = useState(false)
  const [erro, setErro]             = useState('')

  const prestadores = especialidade ? PRESTADORES[especialidade] ?? [] : []

  async function handleConfirmar() {
    if (!prestador) return
    setSalvando(true); setErro('')
    try {
      await criarAgendamento({
        beneficiarioId:   BENEFICIARIO.id,
        beneficiarioNome: BENEFICIARIO.nome,
        prestadorId:      prestador.id,
        prestadorNome:    prestador.nome,
        especialidade,
        tipo: tipo === 'consulta' ? 'CONSULTA' : 'EXAME',
        data,
        horario,
      })
      setConfirmado(true)
    } catch (e: any) {
      setErro(e.message ?? 'Erro ao salvar agendamento')
    } finally {
      setSalvando(false)
    }
  }

  if (confirmado) return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center max-w-md mx-auto">
      <div className="w-16 h-16 rounded-full bg-unimed-light flex items-center justify-center mx-auto mb-4">
        <span className="text-3xl text-unimed-green">✓</span>
      </div>
      <h3 className="font-display text-xl text-unimed-dark mb-2">Agendamento confirmado!</h3>
      <p className="text-gray-500 text-sm">
        {tipo === 'consulta' ? 'Consulta' : 'Exame'} com <strong>{prestador?.nome}</strong><br/>
        em <strong>{data}</strong> às <strong>{horario}</strong>
      </p>
      <p className="text-xs text-gray-400 mt-4">Você receberá uma confirmação por e-mail e SMS.</p>
      <div className="flex gap-3 justify-center mt-6">
        <button
          onClick={() => { setConfirmado(false); setStep(0); setEsp(''); setPrestador(null); setData(''); setHorario('') }}
          className="px-6 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Novo agendamento
        </button>
        <button
          onClick={() => navigate('/agendamento')}
          className="px-6 py-2 bg-unimed-green text-white rounded-lg text-sm font-medium hover:bg-unimed-dark transition-colors"
        >
          Ver meus agendamentos
        </button>
      </div>
    </div>
  )

  return (
    <div className="max-w-2xl space-y-6">
      {/* Progress */}
      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => (
          <React.Fragment key={s}>
            <div className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              i === step ? 'text-unimed-green' : i < step ? 'text-gray-400' : 'text-gray-300'
            }`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                i < step ? 'bg-unimed-green text-white' :
                i === step ? 'border-2 border-unimed-green text-unimed-green' :
                'border-2 border-gray-200 text-gray-300'
              }`}>{i < step ? '✓' : i + 1}</span>
              {s}
            </div>
            {i < STEPS.length - 1 && <div className={`flex-1 h-px ${i < step ? 'bg-unimed-green' : 'bg-gray-200'}`} />}
          </React.Fragment>
        ))}
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">

        {/* Step 0 */}
        {step === 0 && (
          <>
            <h3 className="font-semibold text-gray-700">Tipo de serviço</h3>
            <div className="flex gap-3">
              {(['consulta','exame'] as const).map(t => (
                <button key={t} onClick={() => setTipo(t)}
                  className={`flex-1 py-3 rounded-xl border-2 text-sm font-medium capitalize transition-all ${
                    tipo === t ? 'border-unimed-green bg-unimed-light text-unimed-dark' : 'border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}>{t}</button>
              ))}
            </div>

            <h3 className="font-semibold text-gray-700">Especialidade</h3>
            <div className="grid grid-cols-2 gap-2">
              {ESPECIALIDADES.map(e => (
                <button key={e} onClick={() => { setEsp(e); setPrestador(null) }}
                  className={`py-2.5 px-3 rounded-xl border text-sm text-left transition-all ${
                    especialidade === e ? 'border-unimed-green bg-unimed-light text-unimed-dark font-medium' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}>{e}</button>
              ))}
            </div>

            {prestadores.length > 0 && (
              <>
                <h3 className="font-semibold text-gray-700">Prestador</h3>
                <div className="space-y-2">
                  {prestadores.map(p => (
                    <button key={p.id} onClick={() => setPrestador(p)}
                      className={`w-full py-2.5 px-4 rounded-xl border text-sm text-left transition-all ${
                        prestador?.id === p.id ? 'border-unimed-green bg-unimed-light text-unimed-dark font-medium' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}>{p.nome}</button>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* Step 1 */}
        {step === 1 && (
          <>
            <h3 className="font-semibold text-gray-700">Selecione a data</h3>
            <input type="date" value={data} onChange={e => setData(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-unimed-green transition-colors" />

            {data && (
              <>
                <h3 className="font-semibold text-gray-700">Horários disponíveis</h3>
                <div className="grid grid-cols-4 gap-2">
                  {HORARIOS.map(h => (
                    <button key={h} onClick={() => setHorario(h)}
                      className={`py-2 rounded-xl border text-sm font-medium transition-all ${
                        horario === h ? 'border-unimed-green bg-unimed-light text-unimed-dark' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}>{h}</button>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <>
            <h3 className="font-semibold text-gray-700">Confirme os dados</h3>
            <div className="bg-unimed-light rounded-xl p-4 space-y-2 text-sm">
              {[
                ['Tipo',        tipo === 'consulta' ? 'Consulta' : 'Exame'],
                ['Especialidade', especialidade],
                ['Prestador',   prestador?.nome ?? ''],
                ['Data',        data],
                ['Horário',     horario],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-gray-500">{k}</span>
                  <span className="font-medium text-unimed-dark">{v}</span>
                </div>
              ))}
            </div>
            {erro && <p className="text-sm text-red-500">{erro}</p>}
            <p className="text-xs text-gray-400">Ao confirmar, você receberá lembretes por e-mail e SMS.</p>
          </>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button onClick={() => setStep(s => s - 1)} disabled={step === 0 || salvando}
          className="px-5 py-2 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30 transition-colors">
          Voltar
        </button>
        {step < 2 ? (
          <button
            onClick={() => setStep(s => s + 1)}
            disabled={step === 0 ? !especialidade || !prestador : !data || !horario}
            className="px-6 py-2 bg-unimed-green text-white rounded-lg text-sm font-medium hover:bg-unimed-dark disabled:opacity-40 transition-colors">
            Próximo
          </button>
        ) : (
          <button onClick={handleConfirmar} disabled={salvando}
            className="px-6 py-2 bg-unimed-green text-white rounded-lg text-sm font-medium hover:bg-unimed-dark disabled:opacity-40 transition-colors">
            {salvando ? 'Salvando…' : 'Confirmar agendamento'}
          </button>
        )}
      </div>
    </div>
  )
}

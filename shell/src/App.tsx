import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Shell from './layout/Shell'
import Dashboard from './pages/Dashboard'

// Carregamento federado dos microfrontends
const AgendamentoApp = lazy(() => import('mfeAgendamento/App'))
const NotificacaoApp = lazy(() => import('mfeNotificacao/App'))

const Loader = () => (
  <div className="flex items-center justify-center h-64">
    <div className="w-8 h-8 rounded-full border-4 border-unimed-green border-t-transparent animate-spin" />
  </div>
)

export default function App() {
  return (
    <Shell>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/agendamento/*" element={<AgendamentoApp />} />
          <Route path="/notificacoes/*" element={<NotificacaoApp />} />
        </Routes>
      </Suspense>
    </Shell>
  )
}

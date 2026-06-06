import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import BuscarHorarios from './pages/BuscarHorarios'
import NovoAgendamento from './pages/NovoAgendamento'
import FilaEspera from './pages/FilaEspera'
import Autorizacao from './pages/Autorizacao'
import MeusAgendamentos from './pages/MeusAgendamentos'

const SUB_NAV = [
  { to: '/agendamento',              label: 'Meus Agendamentos', end: true },
  { to: '/agendamento/novo',         label: 'Novo Agendamento' },
  { to: '/agendamento/buscar',       label: 'Buscar Horários' },
  { to: '/agendamento/fila',         label: 'Fila de Espera' },
  { to: '/agendamento/autorizacao',  label: 'Pré-autorizações' },
]

export default function App() {
  return (
    <div className="space-y-6">
      {/* Sub-navigation */}
      <nav className="flex gap-1 bg-white rounded-xl p-1 border border-gray-100 shadow-sm w-fit">
        {SUB_NAV.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-unimed-green text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Sub-routes */}
      <Routes>
        <Route index                  element={<MeusAgendamentos />} />
        <Route path="novo"            element={<NovoAgendamento />} />
        <Route path="buscar"          element={<BuscarHorarios />} />
        <Route path="fila"            element={<FilaEspera />} />
        <Route path="autorizacao"     element={<Autorizacao />} />
      </Routes>
    </div>
  )
}

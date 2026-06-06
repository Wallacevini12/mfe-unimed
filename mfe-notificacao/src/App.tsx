import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import HistoricoNotificacoes from './pages/HistoricoNotificacoes'
import Preferencias from './pages/Preferencias'
import Templates from './pages/Templates'

const SUB_NAV = [
  { to: '/notificacoes',            label: 'Histórico',    end: true },
  { to: '/notificacoes/preferencias', label: 'Preferências de Canal' },
  { to: '/notificacoes/templates',    label: 'Templates' },
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
                  ? 'bg-unimed-teal text-white shadow-sm'
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
        <Route index            element={<HistoricoNotificacoes />} />
        <Route path="preferencias" element={<Preferencias />} />
        <Route path="templates"    element={<Templates />} />
      </Routes>
    </div>
  )
}

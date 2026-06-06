import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const NAV = [
  { to: '/dashboard',     label: 'Dashboard',      icon: '⬡' },
  { to: '/agendamento',   label: 'Agendamento',     icon: '◈' },
  { to: '/notificacoes',  label: 'Notificações',    icon: '◎' },
]

export default function Shell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  const pageTitle = NAV.find(n => location.pathname.startsWith(n.to))?.label ?? 'Unimed'

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`flex flex-col bg-unimed-dark transition-all duration-300 ${
          collapsed ? 'w-16' : 'w-60'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-unimed-green/30">
          <span className="text-2xl text-unimed-teal font-display select-none">✦</span>
          {!collapsed && (
            <span className="text-white font-display text-lg tracking-wide">Unimed</span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-6 flex flex-col gap-1 px-2">
          {NAV.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-unimed-green text-white'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <span className="text-lg leading-none">{icon}</span>
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(c => !c)}
          className="m-3 p-2 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition-colors text-xs"
        >
          {collapsed ? '▶' : '◀ Recolher'}
        </button>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl text-unimed-dark">{pageTitle}</h1>
            <p className="text-xs text-gray-400 mt-0.5">Sistema de Agendamento</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-unimed-light text-unimed-dark px-3 py-1 rounded-full font-medium">
              Beneficiário
            </span>
            <div className="w-8 h-8 rounded-full bg-unimed-green text-white text-xs flex items-center justify-center font-semibold">
              WV
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

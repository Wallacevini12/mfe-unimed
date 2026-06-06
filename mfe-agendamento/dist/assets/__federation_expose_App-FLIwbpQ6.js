import { importShared } from './__federation_fn_import-Cp8lnkdz.js';
import { j as jsxRuntimeExports, M as MeusAgendamentos, N as NovoAgendamento, B as BuscarHorarios, F as FilaEspera, A as Autorizacao } from './index-GvfB7L7e.js';

const {Routes,Route,NavLink} = await importShared('react-router-dom');
const SUB_NAV = [
  { to: "/agendamento", label: "Meus Agendamentos", end: true },
  { to: "/agendamento/novo", label: "Novo Agendamento" },
  { to: "/agendamento/buscar", label: "Buscar Horários" },
  { to: "/agendamento/fila", label: "Fila de Espera" },
  { to: "/agendamento/autorizacao", label: "Pré-autorizações" }
];
function AppRemote() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex gap-1 bg-white rounded-xl p-1 border border-gray-100 shadow-sm w-fit flex-wrap", children: SUB_NAV.map(({ to, label, end }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      NavLink,
      {
        to,
        end,
        className: ({ isActive }) => `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-green-700 text-white shadow-sm" : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"}`,
        children: label
      },
      to
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Routes, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { index: true, element: /* @__PURE__ */ jsxRuntimeExports.jsx(MeusAgendamentos, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "novo", element: /* @__PURE__ */ jsxRuntimeExports.jsx(NovoAgendamento, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "buscar", element: /* @__PURE__ */ jsxRuntimeExports.jsx(BuscarHorarios, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "fila", element: /* @__PURE__ */ jsxRuntimeExports.jsx(FilaEspera, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "autorizacao", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Autorizacao, {}) })
    ] })
  ] });
}

export { AppRemote as default };

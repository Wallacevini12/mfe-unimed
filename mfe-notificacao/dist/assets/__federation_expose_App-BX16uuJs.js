import { importShared } from './__federation_fn_import-Cp8lnkdz.js';
import { j as jsxRuntimeExports, H as HistoricoNotificacoes, P as Preferencias, T as Templates } from './index-TTegWvJr.js';

const {Routes,Route,NavLink} = await importShared('react-router-dom');
const SUB_NAV = [
  { to: "/notificacoes", label: "Histórico", end: true },
  { to: "/notificacoes/preferencias", label: "Preferências de Canal" },
  { to: "/notificacoes/templates", label: "Templates" }
];
function AppRemote() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex gap-1 bg-white rounded-xl p-1 border border-gray-100 shadow-sm w-fit flex-wrap", children: SUB_NAV.map(({ to, label, end }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      NavLink,
      {
        to,
        end,
        className: ({ isActive }) => `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-teal-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"}`,
        children: label
      },
      to
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Routes, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { index: true, element: /* @__PURE__ */ jsxRuntimeExports.jsx(HistoricoNotificacoes, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "preferencias", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Preferencias, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "templates", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Templates, {}) })
    ] })
  ] });
}

export { AppRemote as default };

import { importShared } from './__federation_fn_import-Cp8lnkdz.js';
import { j as jsxRuntimeExports, H as HistoricoNotificacoes, P as Preferencias, T as Templates } from './index-TTegWvJr.js';
import { r as reactDomExports } from './index-D9Af7wOI.js';

true&&(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
}());

var client = {};

var m = reactDomExports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}

const {Routes,Route,NavLink} = await importShared('react-router-dom');
const SUB_NAV = [
  { to: "/notificacoes", label: "Histórico", end: true },
  { to: "/notificacoes/preferencias", label: "Preferências de Canal" },
  { to: "/notificacoes/templates", label: "Templates" }
];
function App() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex gap-1 bg-white rounded-xl p-1 border border-gray-100 shadow-sm w-fit", children: SUB_NAV.map(({ to, label, end }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      NavLink,
      {
        to,
        end,
        className: ({ isActive }) => `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-unimed-teal text-white shadow-sm" : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"}`,
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

const React = await importShared('react');
const {BrowserRouter} = await importShared('react-router-dom');
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BrowserRouter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) }) })
);

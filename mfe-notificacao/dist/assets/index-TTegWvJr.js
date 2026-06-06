import { importShared } from './__federation_fn_import-Cp8lnkdz.js';
import { r as reactExports } from './index-Dm_EQZZA.js';

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production_min = {};

/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f=reactExports,k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:true,ref:true,__self:true,__source:true};
function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a) void 0===d[b]&&(d[b]=a[b]);return {$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}reactJsxRuntime_production_min.Fragment=l;reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;

{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}

var jsxRuntimeExports = jsxRuntime.exports;

const __vite_import_meta_env__ = {};
const BFF_URL = __vite_import_meta_env__?.VITE_BFF_URL ?? "http://localhost:3000";
async function listarNotificacoes() {
  const res = await fetch(`${BFF_URL}/notificacoes`);
  if (!res.ok) throw new Error("Falha ao listar notificações");
  const json = await res.json();
  return Array.isArray(json) ? json : json.data ?? [];
}

const {useEffect,useState: useState$2,useCallback} = await importShared('react');
const CANAL_ICON = { EMAIL: "✉", SMS: "✆", PUSH: "⬡" };
const CANAL_COLOR = {
  EMAIL: "bg-blue-100 text-blue-700",
  SMS: "bg-purple-100 text-purple-700",
  PUSH: "bg-orange-100 text-orange-700"
};
const TIPO_LABEL = {
  CONFIRMACAO: "Confirmação",
  LEMBRETE: "Lembrete",
  CANCELAMENTO: "Cancelamento",
  AUTORIZACAO: "Autorização"
};
const TIPO_COLOR$1 = {
  CONFIRMACAO: "bg-green-100 text-green-700",
  LEMBRETE: "bg-yellow-100 text-yellow-700",
  CANCELAMENTO: "bg-red-100 text-red-700",
  AUTORIZACAO: "bg-teal-100 text-teal-700"
};
const STATUS_INFO = {
  ENVIADA: { txt: "✓ Enviada", cls: "text-green-600" },
  LIDA: { txt: "✓ Lida", cls: "text-blue-600" },
  FALHOU: { txt: "✗ Falhou", cls: "text-red-500" },
  PENDENTE: { txt: "⏳ Pendente", cls: "text-gray-400" }
};
function formatData(d) {
  if (!d) return "—";
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return d;
  return dt.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}
function HistoricoNotificacoes() {
  const [notificacoes, setNotificacoes] = useState$2([]);
  const [loading, setLoading] = useState$2(true);
  const [erro, setErro] = useState$2("");
  const [filtroCanal, setFiltroCanal] = useState$2("todos");
  const [busca, setBusca] = useState$2("");
  const [expandido, setExpandido] = useState$2(null);
  const carregar = useCallback(async () => {
    setLoading(true);
    setErro("");
    try {
      setNotificacoes(await listarNotificacoes());
    } catch (e) {
      setErro(e.message ?? "Erro ao carregar");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    carregar();
  }, [carregar]);
  const filtradas = notificacoes.filter((n) => {
    const porCanal = filtroCanal === "todos" || n.canal === filtroCanal;
    const alvo = `${n.beneficiarioNome ?? ""} ${TIPO_LABEL[n.tipo] ?? ""}`.toLowerCase();
    return porCanal && alvo.includes(busca.toLowerCase());
  });
  const stats = {
    total: notificacoes.length,
    enviadas: notificacoes.filter((n) => n.status === "ENVIADA" || n.status === "LIDA").length,
    falhas: notificacoes.filter((n) => n.status === "FALHOU").length,
    pendentes: notificacoes.filter((n) => n.status === "PENDENTE").length
  };
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-gray-400", children: "Carregando notificações…" });
  if (erro) return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-50 border border-red-200 rounded-xl p-5 text-red-600 text-sm", children: [
    erro,
    " — verifique se o BFF está rodando na porta 3000.",
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: carregar, className: "ml-3 underline", children: "Tentar novamente" })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-3", children: [
      { label: "Total enviadas", value: stats.total, cor: "border-l-gray-400" },
      { label: "Entregues", value: stats.enviadas, cor: "border-l-green-500" },
      { label: "Falhas", value: stats.falhas, cor: "border-l-red-400" },
      { label: "Pendentes", value: stats.pendentes, cor: "border-l-yellow-400" }
    ].map(({ label, value, cor }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `bg-white rounded-xl border border-gray-100 border-l-4 ${cor} shadow-sm px-4 py-3`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-semibold text-gray-800", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-0.5", children: label })
    ] }, label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: busca,
          onChange: (e) => setBusca(e.target.value),
          placeholder: "Buscar por destinatário ou tipo...",
          className: "border border-gray-200 rounded-xl px-4 py-2 text-sm w-72 focus:outline-none focus:border-unimed-teal transition-colors"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 bg-white rounded-xl p-1 border border-gray-100 shadow-sm", children: ["todos", "EMAIL", "SMS", "PUSH"].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setFiltroCanal(c),
          className: `px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${filtroCanal === c ? "bg-unimed-teal text-white" : "text-gray-500 hover:bg-gray-50"}`,
          children: c === "todos" ? "Todos" : `${CANAL_ICON[c]} ${c}`
        },
        c
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: carregar, className: "text-xs text-unimed-teal hover:underline ml-auto", children: "↻ Atualizar" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      filtradas.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-gray-400 text-sm", children: "Nenhuma notificação encontrada." }),
      filtradas.map((n) => {
        const st = STATUS_INFO[n.status ?? "PENDENTE"] ?? STATUS_INFO.PENDENTE;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setExpandido(expandido === n.id ? null : n.id ?? null),
              className: "w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-xs px-2 py-1 rounded-full font-medium w-16 text-center ${CANAL_COLOR[n.canal]}`, children: [
                  CANAL_ICON[n.canal],
                  " ",
                  n.canal
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs px-2 py-1 rounded-full font-medium ${TIPO_COLOR$1[n.tipo]}`, children: TIPO_LABEL[n.tipo] ?? n.tipo }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-700 flex-1 truncate", children: n.beneficiarioNome }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400 whitespace-nowrap", children: formatData(n.enviadoEm ?? n.createdAt) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-semibold whitespace-nowrap ${st.cls}`, children: st.txt }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-300 text-xs", children: expandido === n.id ? "▲" : "▼" })
              ]
            }
          ),
          expandido === n.id && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-4 border-t border-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 mt-3 leading-relaxed", children: n.mensagem }) })
        ] }, n.id);
      })
    ] })
  ] });
}

const {useState: useState$1} = await importShared('react');

const EVENTOS_INICIAIS = [
  { evento: "Confirmação de agendamento", canais: ["email", "push"] },
  { evento: "Lembrete 48h antes", canais: ["sms"] },
  { evento: "Lembrete 24h antes", canais: ["sms", "push"] },
  { evento: "Cancelamento", canais: ["email", "sms"] },
  { evento: "Resultado de pré-autorização", canais: ["email"] }
];
function Preferencias() {
  const [prefs, setPrefs] = useState$1(EVENTOS_INICIAIS);
  const [salvo, setSalvo] = useState$1(false);
  function toggle(eventoIdx, canal) {
    setPrefs((prev) => prev.map((p, i) => {
      if (i !== eventoIdx) return p;
      const has = p.canais.includes(canal);
      return { ...p, canais: has ? p.canais.filter((c) => c !== canal) : [...p.canais, canal] };
    }));
    setSalvo(false);
  }
  function salvar() {
    setSalvo(true);
    setTimeout(() => setSalvo(false), 2500);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-gray-700", children: "Preferências de Canal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400 mt-0.5", children: "Escolha como deseja receber cada tipo de notificação." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-4 px-5 py-3 border-b border-gray-100 bg-gray-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-gray-400 uppercase tracking-wide col-span-1", children: "Evento" }),
        ["email", "sms", "push"].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-gray-400 uppercase tracking-wide text-center", children: c }, c))
      ] }),
      prefs.map((pref, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `grid grid-cols-4 px-5 py-4 items-center ${i < prefs.length - 1 ? "border-b border-gray-50" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-700 col-span-1 pr-4", children: pref.evento }),
        ["email", "sms", "push"].map((canal) => {
          const ativo = pref.canais.includes(canal);
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => toggle(i, canal),
              "aria-label": `${ativo ? "Desativar" : "Ativar"} ${canal} para ${pref.evento}`,
              className: `w-10 h-6 rounded-full transition-all relative ${ativo ? "bg-unimed-teal" : "bg-gray-200"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${ativo ? "left-5" : "left-1"}` })
            }
          ) }, canal);
        })
      ] }, pref.evento))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: salvar,
          className: "px-6 py-2.5 bg-unimed-teal text-white rounded-xl text-sm font-medium hover:bg-unimed-green transition-colors",
          children: "Salvar preferências"
        }
      ),
      salvo && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-green-600 font-medium animate-pulse", children: "✓ Preferências salvas!" })
    ] })
  ] });
}

const {useState} = await importShared('react');

const TEMPLATES_INICIAIS = [
  {
    id: 1,
    tipo: "Confirmação",
    canal: "E-mail",
    assunto: "Agendamento confirmado — Unimed",
    corpo: "Olá {{beneficiario}}, sua {{tipo_servico}} com {{prestador}} foi confirmada para {{data}} às {{horario}}. Em caso de dúvidas, entre em contato pelo app."
  },
  {
    id: 2,
    tipo: "Lembrete",
    canal: "SMS",
    assunto: "",
    corpo: "Unimed: lembrete de {{tipo_servico}} com {{prestador}} em {{data}} às {{horario}}. Dúvidas? Acesse o app."
  },
  {
    id: 3,
    tipo: "Cancelamento",
    canal: "E-mail",
    assunto: "Agendamento cancelado — Unimed",
    corpo: "Olá {{beneficiario}}, seu agendamento com {{prestador}} em {{data}} foi cancelado. Reagende pelo app ou ligue para a central."
  },
  {
    id: 4,
    tipo: "Autorização",
    canal: "Push",
    assunto: "",
    corpo: "Sua solicitação de {{procedimento}} foi {{status_autorizacao}}. Acesse o app para mais detalhes."
  }
];
const TIPO_COLOR = {
  "Confirmação": "bg-green-100 text-green-700",
  "Lembrete": "bg-yellow-100 text-yellow-700",
  "Cancelamento": "bg-red-100 text-red-700",
  "Autorização": "bg-teal-100 text-teal-700"
};
function Templates() {
  const [templates, setTemplates] = useState(TEMPLATES_INICIAIS);
  const [editando, setEditando] = useState(null);
  const [corpoEdit, setCorpoEdit] = useState("");
  const [assuntoEdit, setAssuntoEdit] = useState("");
  function iniciarEdicao(t) {
    setEditando(t.id);
    setCorpoEdit(t.corpo);
    setAssuntoEdit(t.assunto);
  }
  function salvarEdicao(id) {
    setTemplates((prev) => prev.map((t) => t.id === id ? { ...t, corpo: corpoEdit, assunto: assuntoEdit } : t));
    setEditando(null);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-gray-700", children: "Templates de Notificação" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-400 mt-0.5", children: [
        "Use ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "bg-gray-100 px-1 rounded text-xs", children: "{{variavel}}" }),
        " para inserir dados dinâmicos."
      ] })
    ] }),
    templates.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs px-2 py-1 rounded-full font-medium ${TIPO_COLOR[t.tipo]}`, children: t.tipo }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full", children: t.canal })
        ] }),
        editando !== t.id && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => iniciarEdicao(t),
            className: "text-xs text-unimed-teal font-medium hover:underline",
            children: "Editar"
          }
        )
      ] }),
      editando === t.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        t.canal === "E-mail" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-medium text-gray-500 block mb-1", children: "Assunto" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: assuntoEdit,
              onChange: (e) => setAssuntoEdit(e.target.value),
              className: "w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-unimed-teal transition-colors"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-medium text-gray-500 block mb-1", children: "Mensagem" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              value: corpoEdit,
              onChange: (e) => setCorpoEdit(e.target.value),
              rows: 4,
              className: "w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-unimed-teal transition-colors resize-none"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => salvarEdicao(t.id),
              className: "px-4 py-1.5 bg-unimed-teal text-white rounded-lg text-xs font-medium hover:bg-unimed-green transition-colors",
              children: "Salvar"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setEditando(null),
              className: "px-4 py-1.5 border border-gray-200 text-gray-500 rounded-lg text-xs hover:bg-gray-50 transition-colors",
              children: "Cancelar"
            }
          )
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        t.assunto && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Assunto:" }),
          " ",
          t.assunto
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 leading-relaxed", children: t.corpo })
      ] })
    ] }, t.id))
  ] });
}

export { HistoricoNotificacoes as H, Preferencias as P, Templates as T, jsxRuntimeExports as j };

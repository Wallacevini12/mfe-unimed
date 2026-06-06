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

const {useState: useState$3} = await importShared('react');

function BuscarHorarios() {
  const [q, setQ] = useState$3("");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-w-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-gray-700", children: "Buscar Horários Disponíveis" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        value: q,
        onChange: (e) => setQ(e.target.value),
        placeholder: "Buscar por especialidade, médico ou clínica...",
        className: "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-unimed-green transition-colors"
      }
    ),
    q.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50", children: ["Dr. Carlos Mendes — Clínico Geral", "Clínica Saúde+ — Exames", "Dra. Ana Lima — Clínico Geral"].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-700", children: r }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "text-xs text-unimed-green font-medium hover:underline", children: "Ver horários" })
    ] }, r)) })
  ] });
}

const __vite_import_meta_env__ = {};
const BFF_URL = __vite_import_meta_env__?.VITE_BFF_URL ?? "http://localhost:3000";
async function listarAgendamentos() {
  const res = await fetch(`${BFF_URL}/agendamentos`);
  if (!res.ok) throw new Error("Falha ao listar agendamentos");
  const json = await res.json();
  return Array.isArray(json) ? json : json.data ?? [];
}
async function horariosOcupados(prestadorId, data) {
  const todos = await listarAgendamentos();
  const alvo = data.includes("T") ? data.split("T")[0] : data;
  return todos.filter((a) => {
    if (a.prestadorId !== prestadorId) return false;
    if (a.status === "CANCELADO") return false;
    const dataAg = typeof a.data === "string" ? a.data.includes("T") ? a.data.split("T")[0] : a.data : a.data;
    return dataAg === alvo;
  }).map((a) => a.horario);
}
async function criarAgendamento(payload) {
  const res = await fetch(`${BFF_URL}/agendamentos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? "Falha ao criar agendamento");
  }
  const json = await res.json();
  return json.data ?? json;
}
async function atualizarStatus(id, status) {
  const res = await fetch(`${BFF_URL}/agendamentos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });
  if (!res.ok) throw new Error("Falha ao atualizar agendamento");
}
async function excluirAgendamento(id) {
  const res = await fetch(`${BFF_URL}/agendamentos/${id}`, { method: "DELETE" });
  if (!res.ok && res.status !== 204) throw new Error("Falha ao excluir agendamento");
}

const React = await importShared('react');
const {useState: useState$2,useEffect: useEffect$1} = React;

const {useNavigate} = await importShared('react-router-dom');
const STEPS = ["Escolher serviço", "Selecionar horário", "Confirmar"];
const ESPECIALIDADES = [
  "Clínico Geral",
  "Cardiologia",
  "Ortopedia",
  "Dermatologia",
  "Pediatria"
];
const PRESTADORES = {
  "Clínico Geral": [{ id: "p1", nome: "Dr. Carlos Mendes" }, { id: "p2", nome: "Dra. Ana Lima" }],
  "Cardiologia": [{ id: "p3", nome: "Dr. Roberto Farias" }, { id: "p4", nome: "Dra. Paula Ramos" }],
  "Ortopedia": [{ id: "p5", nome: "Dr. Marcos Alves" }],
  "Dermatologia": [{ id: "p6", nome: "Dra. Fernanda Costa" }],
  "Pediatria": [{ id: "p7", nome: "Dr. João Souza" }, { id: "p8", nome: "Dra. Cláudia Neves" }]
};
const HORARIOS = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];
const BENEFICIARIO = { id: "b1", nome: "Wallace Vinicius" };
function NovoAgendamento() {
  const navigate = useNavigate();
  const [step, setStep] = useState$2(0);
  const [especialidade, setEsp] = useState$2("");
  const [tipo, setTipo] = useState$2("consulta");
  const [prestador, setPrestador] = useState$2(null);
  const [data, setData] = useState$2("");
  const [horario, setHorario] = useState$2("");
  const [confirmado, setConfirmado] = useState$2(false);
  const [salvando, setSalvando] = useState$2(false);
  const [erro, setErro] = useState$2("");
  const [ocupados, setOcupados] = useState$2([]);
  const [carregandoHorarios, setCarregandoHorarios] = useState$2(false);
  const prestadores = especialidade ? PRESTADORES[especialidade] ?? [] : [];
  useEffect$1(() => {
    if (!prestador || !data) {
      setOcupados([]);
      return;
    }
    let ativo = true;
    setCarregandoHorarios(true);
    horariosOcupados(prestador.id, data).then((h) => {
      if (ativo) setOcupados(h);
    }).catch(() => {
      if (ativo) setOcupados([]);
    }).finally(() => {
      if (ativo) setCarregandoHorarios(false);
    });
    return () => {
      ativo = false;
    };
  }, [prestador, data]);
  useEffect$1(() => {
    if (horario && ocupados.includes(horario)) setHorario("");
  }, [ocupados, horario]);
  async function handleConfirmar() {
    if (!prestador) return;
    setSalvando(true);
    setErro("");
    try {
      await criarAgendamento({
        beneficiarioId: BENEFICIARIO.id,
        beneficiarioNome: BENEFICIARIO.nome,
        prestadorId: prestador.id,
        prestadorNome: prestador.nome,
        especialidade,
        tipo: tipo === "consulta" ? "CONSULTA" : "EXAME",
        data,
        horario
      });
      setConfirmado(true);
    } catch (e) {
      setErro(e.message ?? "Erro ao salvar agendamento");
    } finally {
      setSalvando(false);
    }
  }
  if (confirmado) return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center max-w-md mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-unimed-light flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl text-unimed-green", children: "✓" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl text-unimed-dark mb-2", children: "Agendamento confirmado!" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-500 text-sm", children: [
      tipo === "consulta" ? "Consulta" : "Exame",
      " com ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: prestador?.nome }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      "em ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: data }),
      " às ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: horario })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-4", children: "Você receberá uma confirmação por e-mail e SMS." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-center mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            setConfirmado(false);
            setStep(0);
            setEsp("");
            setPrestador(null);
            setData("");
            setHorario("");
          },
          className: "px-6 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors",
          children: "Novo agendamento"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => navigate("/agendamento"),
          className: "px-6 py-2 bg-unimed-green text-white rounded-lg text-sm font-medium hover:bg-unimed-dark transition-colors",
          children: "Ver meus agendamentos"
        }
      )
    ] })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: STEPS.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(React.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-2 text-sm font-medium transition-colors ${i === step ? "text-unimed-green" : i < step ? "text-gray-400" : "text-gray-300"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-6 h-6 rounded-full flex items-center justify-center text-xs ${i < step ? "bg-unimed-green text-white" : i === step ? "border-2 border-unimed-green text-unimed-green" : "border-2 border-gray-200 text-gray-300"}`, children: i < step ? "✓" : i + 1 }),
        s
      ] }),
      i < STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex-1 h-px ${i < step ? "bg-unimed-green" : "bg-gray-200"}` })
    ] }, s)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5", children: [
      step === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-700", children: "Tipo de serviço" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: ["consulta", "exame"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setTipo(t),
            className: `flex-1 py-3 rounded-xl border-2 text-sm font-medium capitalize transition-all ${tipo === t ? "border-unimed-green bg-unimed-light text-unimed-dark" : "border-gray-200 text-gray-500 hover:border-gray-300"}`,
            children: t
          },
          t
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-700", children: "Especialidade" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: ESPECIALIDADES.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => {
              setEsp(e);
              setPrestador(null);
            },
            className: `py-2.5 px-3 rounded-xl border text-sm text-left transition-all ${especialidade === e ? "border-unimed-green bg-unimed-light text-unimed-dark font-medium" : "border-gray-200 text-gray-600 hover:border-gray-300"}`,
            children: e
          },
          e
        )) }),
        prestadores.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-700", children: "Prestador" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: prestadores.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setPrestador(p),
              className: `w-full py-2.5 px-4 rounded-xl border text-sm text-left transition-all ${prestador?.id === p.id ? "border-unimed-green bg-unimed-light text-unimed-dark font-medium" : "border-gray-200 text-gray-600 hover:border-gray-300"}`,
              children: p.nome
            },
            p.id
          )) })
        ] })
      ] }),
      step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-700", children: "Selecione a data" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "date",
            value: data,
            onChange: (e) => setData(e.target.value),
            min: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
            className: "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-unimed-green transition-colors"
          }
        ),
        data && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-700", children: "Horários disponíveis" }),
            carregandoHorarios && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: "verificando disponibilidade…" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2", children: HORARIOS.map((h) => {
            const indisponivel = ocupados.includes(h);
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => !indisponivel && setHorario(h),
                disabled: indisponivel,
                title: indisponivel ? "Horário já ocupado para este prestador" : "",
                className: `py-2 rounded-xl border text-sm font-medium transition-all relative ${indisponivel ? "border-gray-100 bg-gray-100 text-gray-300 cursor-not-allowed line-through" : horario === h ? "border-unimed-green bg-unimed-light text-unimed-dark" : "border-gray-200 text-gray-600 hover:border-gray-300"}`,
                children: h
              },
              h
            );
          }) }),
          ocupados.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400", children: [
            "Horários riscados já estão ocupados para ",
            prestador?.nome,
            " nesta data."
          ] })
        ] })
      ] }),
      step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-700", children: "Confirme os dados" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-unimed-light rounded-xl p-4 space-y-2 text-sm", children: [
          ["Tipo", tipo === "consulta" ? "Consulta" : "Exame"],
          ["Especialidade", especialidade],
          ["Prestador", prestador?.nome ?? ""],
          ["Data", data],
          ["Horário", horario]
        ].map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: k }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-unimed-dark", children: v })
        ] }, k)) }),
        erro && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-500", children: erro }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400", children: "Ao confirmar, você receberá lembretes por e-mail e SMS." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setStep((s) => s - 1),
          disabled: step === 0 || salvando,
          className: "px-5 py-2 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30 transition-colors",
          children: "Voltar"
        }
      ),
      step < 2 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setStep((s) => s + 1),
          disabled: step === 0 ? !especialidade || !prestador : !data || !horario,
          className: "px-6 py-2 bg-unimed-green text-white rounded-lg text-sm font-medium hover:bg-unimed-dark disabled:opacity-40 transition-colors",
          children: "Próximo"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleConfirmar,
          disabled: salvando,
          className: "px-6 py-2 bg-unimed-green text-white rounded-lg text-sm font-medium hover:bg-unimed-dark disabled:opacity-40 transition-colors",
          children: salvando ? "Salvando…" : "Confirmar agendamento"
        }
      )
    ] })
  ] });
}

const FILA = [
  { id: 1, ben: "Paulo Ferreira", esp: "Cardiologia", entrada: "28/03/2026", posicao: 1 },
  { id: 2, ben: "Luiza Martins", esp: "Ortopedia", entrada: "29/03/2026", posicao: 2 },
  { id: 3, ben: "Carlos Nunes", esp: "Cardiologia", entrada: "30/03/2026", posicao: 3 }
];
function FilaEspera() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-gray-700", children: "Fila de Espera" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-gray-100", children: ["Posição", "Beneficiário", "Especialidade", "Data de entrada", "Ação"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide", children: h }, h)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: FILA.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-50 hover:bg-gray-50 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-7 h-7 rounded-full bg-unimed-light text-unimed-dark text-xs font-semibold flex items-center justify-center", children: f.posicao }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 font-medium text-gray-700", children: f.ben }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-gray-500", children: f.esp }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-gray-500", children: f.entrada }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "text-xs text-unimed-green font-medium hover:underline", children: "Agendar" }) })
      ] }, f.id)) })
    ] }) })
  ] });
}

const {useState: useState$1} = await importShared('react');

const PENDENCIAS = [
  { id: 1, ben: "Maria Silva", proc: "Ressonância Magnética", data: "30/03/2026", urgencia: "Alta" },
  { id: 2, ben: "João Oliveira", proc: "Colonoscopia", data: "29/03/2026", urgencia: "Normal" }
];
function Autorizacao() {
  const [aprovados, setAprovados] = useState$1([]);
  const [recusados, setRecusados] = useState$1([]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-gray-700", children: "Pré-autorizações Pendentes" }),
    PENDENCIAS.map((p) => {
      const aprovado = aprovados.includes(p.id);
      const recusado = recusados.includes(p.id);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `bg-white rounded-2xl border shadow-sm p-5 transition-all ${aprovado ? "border-green-200" : recusado ? "border-red-200" : "border-gray-100"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-gray-800", children: p.proc }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-500 mt-0.5", children: [
              "Beneficiário: ",
              p.ben
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400 mt-0.5", children: [
              "Solicitado em ",
              p.data
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs px-2 py-1 rounded-full font-medium ${p.urgencia === "Alta" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600"}`, children: p.urgencia })
        ] }),
        !aprovado && !recusado && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setAprovados((a) => [...a, p.id]),
              className: "px-4 py-2 bg-unimed-green text-white rounded-lg text-xs font-medium hover:bg-unimed-dark transition-colors",
              children: "Autorizar"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setRecusados((r) => [...r, p.id]),
              className: "px-4 py-2 border border-red-200 text-red-500 rounded-lg text-xs font-medium hover:bg-red-50 transition-colors",
              children: "Recusar"
            }
          )
        ] }),
        aprovado && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-green-600 font-medium", children: "✓ Autorizado" }),
        recusado && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-red-500 font-medium", children: "✗ Recusado" })
      ] }, p.id);
    })
  ] });
}

const {useEffect,useState,useCallback} = await importShared('react');
function formatData(data, horario) {
  if (!data) return "";
  const iso = data.includes("T") ? data.split("T")[0] : data;
  const [y, m, d] = iso.split("-");
  const dataBR = y && m && d ? `${d}/${m}/${y}` : data;
  return horario ? `${dataBR} ${horario}` : dataBR;
}
function statusLabel(s) {
  switch (s) {
    case "CONFIRMADO":
      return { txt: "Confirmado", cls: "bg-green-100 text-green-700" };
    case "CANCELADO":
      return { txt: "Cancelado", cls: "bg-red-100 text-red-700" };
    case "CONCLUIDO":
      return { txt: "Concluído", cls: "bg-blue-100 text-blue-700" };
    default:
      return { txt: "Pendente", cls: "bg-yellow-100 text-yellow-700" };
  }
}
function MeusAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const carregar = useCallback(async () => {
    setLoading(true);
    setErro("");
    try {
      setAgendamentos(await listarAgendamentos());
    } catch (e) {
      setErro(e.message ?? "Erro ao carregar");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    carregar();
  }, [carregar]);
  async function handleConfirmar(id) {
    await atualizarStatus(id, "CONFIRMADO");
    carregar();
  }
  async function handleCancelar(id) {
    await atualizarStatus(id, "CANCELADO");
    carregar();
  }
  async function handleExcluir(id) {
    await excluirAgendamento(id);
    carregar();
  }
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-gray-400", children: "Carregando agendamentos…" });
  if (erro) return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-50 border border-red-200 rounded-xl p-5 text-red-600 text-sm", children: [
    erro,
    " — verifique se o BFF está rodando na porta 3000.",
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: carregar, className: "ml-3 underline", children: "Tentar novamente" })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-gray-700", children: "Meus Agendamentos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: carregar,
          className: "text-xs text-unimed-green hover:text-unimed-dark transition-colors",
          children: "↻ Atualizar"
        }
      )
    ] }),
    agendamentos.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center text-gray-400 text-sm", children: "Nenhum agendamento ainda. Crie um na aba “Novo Agendamento”." }),
    agendamentos.map((a) => {
      const id = a.id ?? a._id;
      const st = statusLabel(a.status);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center justify-between",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-gray-800", children: [
                a.tipo === "CONSULTA" ? "Consulta" : a.tipo === "EXAME" ? "Exame" : "Procedimento",
                " — ",
                a.especialidade
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mt-0.5", children: a.prestadorNome }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400 mt-0.5", children: formatData(a.data, a.horario) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs px-3 py-1 rounded-full font-medium ${st.cls}`, children: st.txt }),
              a.status !== "CONFIRMADO" && a.status !== "CANCELADO" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => handleConfirmar(id),
                  className: "text-xs text-green-500 hover:text-green-700 transition-colors",
                  children: "Confirmar"
                }
              ),
              a.status !== "CANCELADO" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => handleCancelar(id),
                  className: "text-xs text-orange-400 hover:text-orange-600 transition-colors",
                  children: "Cancelar"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => handleExcluir(id),
                  className: "text-xs text-red-400 hover:text-red-600 transition-colors",
                  children: "Excluir"
                }
              )
            ] })
          ]
        },
        id
      );
    })
  ] });
}

export { Autorizacao as A, BuscarHorarios as B, FilaEspera as F, MeusAgendamentos as M, NovoAgendamento as N, jsxRuntimeExports as j };

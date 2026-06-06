# Unimed — Sistema de Agendamento (Microfrontends)

> **Stack:** React 18 · Vite 5 · Tailwind CSS 3 · Module Federation (`@originjs/vite-plugin-federation`)

---

## 1. Visão Geral da Solução

A solução é composta por **três aplicações Vite independentes** que colaboram em tempo de execução via **Module Federation**:

| App | Porta | Papel |
|-----|-------|-------|
| `shell` | 5000 | Host/orquestrador — layout, roteamento global, autenticação |
| `mfe-agendamento` | 5001 | Remote — Domínio de Agendamento |
| `mfe-notificacao` | 5002 | Remote — Domínio de Notificação e Comunicação |

---

## 2. Arquitetura de Microfrontends

```
                        ┌─────────────────────────────┐
                        │         Browser              │
                        └──────────────┬──────────────┘
                                       │
                        ┌──────────────▼──────────────┐
                        │   Shell (Host) — porta 5000  │
                        │  ┌─────────────────────────┐ │
                        │  │  Layout (Sidebar+Header) │ │
                        │  │  BrowserRouter           │ │
                        │  │  AuthContext             │ │
                        │  └──────────┬──────────────┘ │
                        └────────────┼────────────────-┘
                 ┌───────────────────┼──────────────────┐
                 ▼                                       ▼
  ┌──────────────────────────┐         ┌──────────────────────────┐
  │  mfe-agendamento (5001)  │         │  mfe-notificacao  (5002)  │
  │  expõe: ./App            │         │  expõe: ./App             │
  │  rotas: /agendamento/*   │         │  rotas: /notificacoes/*   │
  └──────────────────────────┘         └──────────────────────────┘
```

### Como o Module Federation funciona aqui

- Cada MFE usa `@originjs/vite-plugin-federation` para **expor** seu `App.tsx` como `remoteEntry.js`.
- O Shell declara os dois remotes e os **importa dinamicamente** via `React.lazy()`.
- As bibliotecas `react`, `react-dom` e `react-router-dom` são marcadas como **shared** — carregadas apenas uma vez pelo Shell.
- O Shell passa o `BrowserRouter` para ambos os MFEs. Cada MFE usa apenas `Routes` internamente (sem `BrowserRouter` próprio), evitando conflito de contexto de roteamento.

---

## 3. Estrutura de Pastas

```
unimed-mfe/
├── shell/                          # Host
│   ├── index.html
│   ├── vite.config.ts              # Module Federation (remotes)
│   ├── tailwind.config.ts
│   └── src/
│       ├── main.tsx                # Entrypoint
│       ├── App.tsx                 # Rotas globais + lazy imports
│       ├── index.css
│       ├── remotes.d.ts            # Tipos TypeScript dos remotes
│       ├── layout/
│       │   └── Shell.tsx           # Sidebar + Header
│       └── pages/
│           └── Dashboard.tsx       # Tela inicial
│
├── mfe-agendamento/                # Remote — Domínio Agendamento
│   ├── vite.config.ts              # Module Federation (exposes)
│   ├── tailwind.config.ts
│   └── src/
│       ├── App.tsx                 # Sub-rotas do domínio
│       ├── index.css
│       └── pages/
│           ├── MeusAgendamentos.tsx
│           ├── NovoAgendamento.tsx  # Wizard 3 etapas
│           ├── BuscarHorarios.tsx
│           ├── FilaEspera.tsx
│           └── Autorizacao.tsx
│
└── mfe-notificacao/                # Remote — Domínio Notificação
    ├── vite.config.ts
    ├── tailwind.config.ts
    └── src/
        ├── App.tsx
        ├── index.css
        └── pages/
            ├── HistoricoNotificacoes.tsx
            ├── Preferencias.tsx
            └── Templates.tsx
```

---

## 4. Tecnologias e Justificativas

| Tecnologia | Justificativa |
|---|---|
| **React 18** | Componentes funcionais, Suspense para lazy loading dos MFEs |
| **Vite 5** | Build ultra-rápido, suporte nativo a ESM — exigido pelo Module Federation |
| **Tailwind CSS 3** | Utilitários compartilhados via configuração idêntica nos três projetos |
| **@originjs/vite-plugin-federation** | Implementação de Module Federation para Vite |
| **React Router v6** | Roteamento declarativo; Shell controla o `BrowserRouter`, MFEs usam `Routes` |

---

## 5. Exemplos de Configuração

### Shell — `vite.config.ts`
```ts
federation({
  name: 'shell',
  remotes: {
    mfeAgendamento: 'http://localhost:5001/assets/remoteEntry.js',
    mfeNotificacao: 'http://localhost:5002/assets/remoteEntry.js',
  },
  shared: ['react', 'react-dom', 'react-router-dom'],
})
```

### MFE Remote — `vite.config.ts`
```ts
federation({
  name: 'mfeAgendamento',
  filename: 'remoteEntry.js',
  exposes: { './App': './src/App' },
  shared: ['react', 'react-dom', 'react-router-dom'],
})
```

### Carregamento federado no Shell
```tsx
const AgendamentoApp = lazy(() => import('mfeAgendamento/App'))
const NotificacaoApp = lazy(() => import('mfeNotificacao/App'))

<Suspense fallback={<Loader />}>
  <Routes>
    <Route path="/agendamento/*" element={<AgendamentoApp />} />
    <Route path="/notificacoes/*" element={<NotificacaoApp />} />
  </Routes>
</Suspense>
```

### Declaração de tipos TypeScript (`remotes.d.ts`)
```ts
declare module 'mfeAgendamento/App' {
  const App: React.ComponentType
  export default App
}
declare module 'mfeNotificacao/App' {
  const App: React.ComponentType
  export default App
}
```

---

## 6. Como executar localmente

> **Pré-requisito:** Node.js 18+ e npm 9+

### Instalar dependências (em cada pasta)

```bash
# Terminal 1 — Shell
cd shell && npm install && npm run dev

# Terminal 2 — MFE Agendamento
cd mfe-agendamento && npm install && npm run dev

# Terminal 3 — MFE Notificação
cd mfe-notificacao && npm install && npm run dev
```

### Acessar

| URL | O que abre |
|-----|-----------|
| http://localhost:5000 | Aplicação completa (Shell + MFEs) |
| http://localhost:5001 | MFE Agendamento isolado |
| http://localhost:5002 | MFE Notificação isolado |

> **Importante:** em desenvolvimento, o Module Federation usa os remotes em `http://localhost:500X`.  
> Em produção, substitua as URLs pelos endereços de deploy de cada MFE no `vite.config.ts` do Shell.

---

## 7. Telas por Domínio

### Shell
| Rota | Tela |
|------|------|
| `/dashboard` | Dashboard com estatísticas e acesso rápido |

### Domínio Agendamento (`/agendamento/*`)
| Rota | Tela |
|------|------|
| `/agendamento` | Lista de agendamentos do beneficiário |
| `/agendamento/novo` | Wizard 3 etapas: tipo → horário → confirmação |
| `/agendamento/buscar` | Busca de horários por prestador/especialidade |
| `/agendamento/fila` | Fila de espera gerenciada pelo operador |
| `/agendamento/autorizacao` | Pré-autorizações pendentes (Auditor Médico) |

### Domínio Notificação (`/notificacoes/*`)
| Rota | Tela |
|------|------|
| `/notificacoes` | Histórico com filtros por canal e status |
| `/notificacoes/preferencias` | Toggles de canal por tipo de evento |
| `/notificacoes/templates` | Edição de templates por evento e canal |

---

## 8. Boas Práticas Aplicadas

### Organização por domínio
Cada MFE é uma unidade de deploy independente. Mudanças no domínio de Notificação não impactam o Shell ou o Agendamento.

### Compartilhamento de componentes
Bibliotecas core (`react`, `react-dom`, `react-router-dom`) são declaradas como `shared` no Module Federation, garantindo uma única instância em runtime — evita o problema do "React múltiplo".

### Comunicação entre MFEs
Prefira **URL state** (parâmetros de rota) e **Custom Events** do browser para comunicação entre MFEs. Evite compartilhar estado via store global na versão inicial — introduza apenas se houver necessidade comprovada.

### Autenticação
O Shell é o único responsável por autenticação (OAuth 2.0 / SSO). O token JWT deve ser armazenado em memória ou cookie `httpOnly` e repassado aos MFEs via `Context` ou cabeçalho HTTP nas chamadas de API — nunca via `localStorage`.

### Estratégia para evolução
- Cada MFE tem seu próprio `package.json` e ciclo de release independente.
- Adicionar um novo domínio (ex: `mfe-relatorios`) é tão simples quanto criar uma nova pasta, declarar o remote no Shell e adicionar a rota.
- Para produção, use um CDN (ex: CloudFront) para servir cada `remoteEntry.js` com cache adequado.

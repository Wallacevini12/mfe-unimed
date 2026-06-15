# MFE Unimed — Microfrontend — Sistema de Agendamento Unimed

Camada de apresentação do Sistema de Agendamento Unimed, construída como **Microfrontend** com **React + Vite + Module Federation**. Um Shell (host) carrega dois microfrontends remotos de forma independente. O frontend consome exclusivamente o **BFF** — nunca acessa os microsserviços diretamente.

## 🏗️ Arquitetura

```
unimed-mfe/
├── shell/             # Host (porta 5000) — layout, navegação e Dashboard
│   └── src/pages/            → Dashboard (consome GET /aggregated-data)
├── mfe-agendamento/   # Microfrontend remoto (porta 5001)
│   └── src/
│       ├── api.ts            → cliente HTTP do BFF
│       └── pages/            → MeusAgendamentos, NovoAgendamento
└── mfe-notificacao/   # Microfrontend remoto (porta 5002)
    └── src/
        ├── api.ts            → cliente HTTP do BFF
        └── pages/            → HistoricoNotificacoes, Preferencias, Templates
```

### Module Federation
O Shell consome dinamicamente os MFEs remotos via `remoteEntry.js`. Cada microfrontend é construído e implantado de forma independente, permitindo evolução isolada por domínio.

### Funcionalidades
- **Dashboard** — resumo com dados reais agregados (GET /aggregated-data)
- **Agendamentos** — CRUD completo: criar (wizard de 3 etapas), listar, confirmar, cancelar e excluir
- **Bloqueio de horários** — na seleção, horários já ocupados para o prestador aparecem desabilitados
- **Notificações** — histórico (Azure SQL), preferências de canal e templates

## 🛠️ Tecnologias

- **React** + **TypeScript**
- **Vite** + **@originjs/vite-plugin-federation** (Module Federation)
- **React Router** (navegação)
- **Tailwind CSS** (estilização)
- **Fetch API** (consumo do BFF)

## ▶️ Como rodar localmente

Cada projeto roda separadamente. Em **três terminais**:

```bash
# Terminal 1 — Shell (host)
cd shell
npm install
npm run dev      # http://localhost:5000

# Terminal 2 — MFE Agendamento
cd mfe-agendamento
npm install
npm run build && npm run preview   # http://localhost:5001

# Terminal 3 — MFE Notificação
cd mfe-notificacao
npm install
npm run build && npm run preview   # http://localhost:5002
```

Acesse a aplicação em **http://localhost:5000**.

### Configuração da URL do BFF (opcional)
Por padrão o frontend aponta para `http://localhost:3000`. Para alterar, crie um arquivo `.env` em cada MFE:
```
VITE_BFF_URL=http://localhost:3000
```

> Pré-requisito: o BFF (porta 3000) e os microsserviços devem estar rodando.

## 🎥 Vídeo de demonstração
https://youtu.be/yXW6vKhXH8o

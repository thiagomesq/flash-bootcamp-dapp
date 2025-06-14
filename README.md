# Task Manager DApp

A decentralized application (DApp) for personal task management with ETH staking system, built with Next.js, TypeScript, Wagmi and Tailwind CSS.

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm or bun
- MetaMask or another Web3 wallet
- Anvil (for local development)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd dapp
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Configure environment variables**
```bash
cp .env.example .env.local
```

Edit the `.env.local` file:
```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_INFURA_API_KEY=your_api_key_here
```

4. **Start Anvil (local development)**
```bash
anvil
```

5. **Deploy contract (if necessary)**
```bash
# In another terminal, in the contract folder
forge script script/Deploy.s.sol --rpc-url http://localhost:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast
```

6. **Start the application**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Access [http://localhost:3000](http://localhost:3000) in your browser.

### Wallet Configuration

1. Add the local Anvil network to MetaMask:
   - **Network Name**: Anvil Local
   - **RPC URL**: http://localhost:8545
   - **Chain ID**: 31337
   - **Symbol**: ETH

2. Import a test account from Anvil using one of the provided private keys.

## Summary

The Task Manager DApp is a Web3 application that allows users to:

- ✅ **Create tasks** with ETH stake as incentive
- 🎯 **Complete tasks** and receive the stake back
- 👁️ **View tasks** organized by status (pending/completed)
- 🔄 **Monitor events** in real-time from the blockchain
- 🌐 **Connect multiple networks** (Ethereum, Polygon, Sepolia, Anvil)
- 🌙 **Toggle theme** light/dark
- 📱 **Responsive interface** for mobile and desktop

### Technologies Used

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Web3**: Wagmi v2, Viem, WalletConnect
- **UI**: Radix UI, Lucide Icons
- **Blockchain**: Solidity, Anvil, Foundry
- **State**: React Hooks, Context API

## Description

### Project Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Main layout
│   ├── page.tsx           # Home page
│   ├── providers.tsx      # Web3 and Theme providers
│   └── globals.css        # Global styles
├── components/            
│   ├── ui/                # Base components (shadcn/ui)
│   │   ├── transactionModal.tsx
│   │   ├── TransactionStatusContent.tsx
│   │   └── TransactionHashDisplay.tsx
│   ├── comons/            # Reusable components
│   │   ├── taskCard.tsx
│   │   ├── stakeCard.tsx
│   │   └── modeToggle.tsx
│   ├── icons/             # Custom icons
│   ├── Header.tsx         # Application header
│   ├── Dashboard.tsx      # Dashboard with statistics
│   ├── TaskList.tsx       # Task list
│   ├── NewTaskForm.tsx    # New task form
│   ├── EventsLog.tsx      # Events log
│   └── ConnectButton.tsx  # Web3 connection button
├── hooks/                 # Custom hooks
│   ├── useTaskTransaction.ts
│   ├── useTaskEvents.ts
│   ├── useTasks.ts
│   ├── useTransactionModal.ts
│   └── useHydrated.ts
├── types/                 # TypeScript definitions
│   └── transaction.ts
├── constants/             # Constants and configurations
│   ├── transactionContents.ts
│   └── index.ts
├── utils/                 # Utility functions
│   ├── errorHandler/
│   ├── timestampToDate/
│   └── index.ts
└── config.ts             # Wagmi configuration
```

### Main Features

#### 1. Task Management
- **Creation**: Modal form with complete validation
- **Stake System**: User deposits ETH as guarantee
- **Completion**: Automatic stake recovery upon completion
- **Validation**: Only the creator can complete their tasks

#### 2. User Interface
- **Dashboard**: General statistics and task summary
- **Task List**: Responsive grid with status separation
- **Real-time Events**: Blockchain activity log
- **Transaction Modals**: Visual feedback for all operations

#### 3. Web3 Connectivity
- **Multi-chain**: Support for 5 different networks
- **Auto-switch**: Automatic network switching
- **State Management**: Real-time synchronization
- **Error Handling**: User-friendly error messages

#### 4. User Experience
- **Adaptive Theme**: Dark/Light mode with persistence
- **Loading States**: Visual indicators in all operations
- **Responsiveness**: Layout optimized for all screens
- **Accessibility**: Components with screen reader support

### Custom Hooks

#### `useTaskTransaction`
Manages all contract operations (create/complete tasks):
```typescript
const {
  createTask,
  completeTask,
  transactionStatus,
  errorMessage,
  isTransactionInProgress,
  chainId
} = useTaskTransaction();
```

#### `useTaskEvents`
Centralized blockchain events system:
```typescript
const {
  taskCreatedEvents,
  taskCompletedEvents,
  onTaskCreated,
  onTaskCompleted,
  clearEvents
} = useTaskEvents();
```

#### `useTasks`
Task state management:
```typescript
const {
  tasksData,
  isLoading,
  refetchTasks,
  taskManagerAddress
} = useTasks();
```

### Main Components

#### `TransactionModal`
Flexible modal for transaction feedback:
- Distinct visual states (pending, confirming, success, error)
- Customizable content by operation type
- Integration with blockchain explorers
- Intelligent error handling by category

#### `TaskCard`
Interactive card for task display:
- Differentiated visual by status (pending/completed)
- Contextual action button
- Complete task information
- Dark/light theme support

#### `EventsLog`
Real-time events monitor:
- Event combination and sorting
- Automatic history limitation (10 events)
- Clean and informative interface
- Manual cleanup control

### Theme System

Robust dark/light mode implementation:
- Use of `next-themes` for persistence
- CSS Variables for dynamic colors
- Smooth transitions between themes
- Automatic system mode support

### Event Architecture

Event-driven system for synchronization:
- Listening to `TaskCreated` and `TaskCompleted` events
- Centralized callbacks for state updates
- Automatic data refetch when events occur
- Automatic cleanup to prevent memory leaks

## Final Considerations

### Strengths

1. **Clean Architecture**: Clear separation of responsibilities with custom hooks
2. **Type Safety**: TypeScript throughout the application ensuring robustness
3. **Modern UX**: Intuitive interface with complete visual feedback
4. **Web3 Native**: Deep integration with modern ecosystem tools
5. **Scalability**: Structure prepared for new features
6. **Performance**: Re-render optimizations and intelligent state management

### Future Improvements

1. **Features**:
   - Category system for tasks
   - Deadline definition with automatic penalties
   - Ranking and gamification with scoring
   - Public task sharing
   - Push notification system

2. **Technical**:
   - Automated testing (Jest, Cypress, Playwright)
   - PWA for offline use
   - Bundle optimization and lazy loading
   - Intelligent caching with React Query
   - Monitoring and analytics

3. **Web3**:
   - Support for more networks (Arbitrum, Optimism, Base)
   - IPFS integration for metadata
   - ERC-20 token reward system
   - DAO features for governance
   - Multi-signature for collaborative tasks

### Challenges Overcome

1. **Complex State Management**: UI and blockchain synchronization using events
2. **Web3 UX**: Smooth transitions between transaction states with adequate feedback
3. **Performance**: Optimization of re-renders and unnecessary blockchain calls
4. **Responsiveness**: Adaptive layout that works on all devices
5. **SSR Hydration**: Prevention of mismatches during hydration

### Lessons Learned

- **Wagmi v2**: Maximum leverage of new features and hooks
- **Event-Driven Architecture**: Event-based architecture for real-time sync
- **Component Composition**: Efficient component reuse with flexible props
- **Error Handling**: Graceful Web3 error handling with categorization
- **User Experience**: Importance of visual feedback in blockchain operations

### Project Metrics

- **Components**: 20+ reusable components
- **Custom Hooks**: 5 specialized hooks
- **Supported Networks**: 5 different blockchains
- **TypeScript Coverage**: 100% type safety
- **Responsive**: Mobile-first design

This application demonstrates best practices for modern DApp development, combining excellent user experience with the robustness and decentralization of blockchain technology.

---

**Developed with ❤️ for the Web3 ecosystem**

Uma aplicação descentralizada (DApp) para gerenciamento de tarefas pessoais com sistema de stake em ETH, construída com Next.js, TypeScript, Wagmi e Tailwind CSS.

## Getting Started

### Pré-requisitos

- Node.js 18+ instalado
- npm, yarn, pnpm ou bun
- MetaMask ou outra carteira Web3
- Anvil (para desenvolvimento local)

### Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd dapp
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local`:
```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=seu_project_id_aqui
NEXT_PUBLIC_INFURA_API_KEY=sua_api_key_aqui
```

4. **Inicie o Anvil (desenvolvimento local)**
```bash
anvil
```

5. **Deploy do contrato (se necessário)**
```bash
# Em outro terminal, na pasta do contrato
forge script script/Deploy.s.sol --rpc-url http://localhost:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast
```

6. **Inicie a aplicação**
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

### Configuração da Carteira

1. Adicione a rede Anvil local no MetaMask:
   - **Nome da Rede**: Anvil Local
   - **RPC URL**: http://localhost:8545
   - **Chain ID**: 31337
   - **Símbolo**: ETH

2. Importe uma conta de teste do Anvil usando uma das chaves privadas fornecidas.

## Resumo

O Task Manager DApp é uma aplicação Web3 que permite aos usuários:

- ✅ **Criar tarefas** com stake em ETH como incentivo
- 🎯 **Completar tarefas** e receber o stake de volta
- 👁️ **Visualizar tarefas** organizadas por status (pendentes/completadas)
- 🔄 **Monitorar eventos** em tempo real da blockchain
- 🌐 **Conectar múltiplas redes** (Ethereum, Polygon, Sepolia, Anvil)
- 🌙 **Alternar tema** claro/escuro
- 📱 **Interface responsiva** para mobile e desktop

### Tecnologias Utilizadas

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Web3**: Wagmi v2, Viem, WalletConnect
- **UI**: Radix UI, Lucide Icons
- **Blockchain**: Solidity, Anvil, Foundry
- **Estado**: React Hooks, Context API

## Descrição

### Arquitetura do Projeto

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página inicial
│   ├── providers.tsx      # Providers Web3 e Tema
│   └── globals.css        # Estilos globais
├── components/            
│   ├── ui/                # Componentes base (shadcn/ui)
│   │   ├── transactionModal.tsx
│   │   ├── TransactionStatusContent.tsx
│   │   └── TransactionHashDisplay.tsx
│   ├── comons/            # Componentes reutilizáveis
│   │   ├── taskCard.tsx
│   │   ├── stakeCard.tsx
│   │   └── modeToggle.tsx
│   ├── icons/             # Ícones customizados
│   ├── Header.tsx         # Cabeçalho da aplicação
│   ├── Dashboard.tsx      # Dashboard com estatísticas
│   ├── TaskList.tsx       # Lista de tarefas
│   ├── NewTaskForm.tsx    # Formulário de nova tarefa
│   ├── EventsLog.tsx      # Log de eventos
│   └── ConnectButton.tsx  # Botão de conexão Web3
├── hooks/                 # Custom hooks
│   ├── useTaskTransaction.ts
│   ├── useTaskEvents.ts
│   ├── useTasks.ts
│   ├── useTransactionModal.ts
│   └── useHydrated.ts
├── types/                 # Definições TypeScript
│   └── transaction.ts
├── constants/             # Constantes e configurações
│   ├── transactionContents.ts
│   └── index.ts
├── utils/                 # Funções utilitárias
│   ├── errorHandler/
│   ├── timestampToDate/
│   └── index.ts
└── config.ts             # Configuração Wagmi
```

### Funcionalidades Principais

#### 1. Gestão de Tarefas
- **Criação**: Formulário modal com validação completa
- **Stake System**: Usuário deposita ETH como garantia
- **Conclusão**: Recuperação automática do stake ao completar
- **Validação**: Apenas o criador pode completar suas tarefas

#### 2. Interface de Usuário
- **Dashboard**: Estatísticas gerais e resumo das tarefas
- **Lista de Tarefas**: Grid responsivo com separação por status
- **Eventos em Tempo Real**: Log de atividades da blockchain
- **Modais de Transação**: Feedback visual para todas as operações

#### 3. Conectividade Web3
- **Multi-chain**: Suporte a 5 redes diferentes
- **Auto-switch**: Troca automática de rede
- **Gestão de Estado**: Sincronização em tempo real
- **Tratamento de Erros**: Mensagens amigáveis para usuários

#### 4. Experiência do Usuário
- **Tema Adaptativo**: Dark/Light mode com persistência
- **Loading States**: Indicadores visuais em todas as operações
- **Responsividade**: Layout otimizado para todas as telas
- **Acessibilidade**: Componentes com suporte a screen readers

### Hooks Customizados

#### `useTaskTransaction`
Gerencia todas as operações de contrato (criar/completar tarefas):
```typescript
const {
  createTask,
  completeTask,
  transactionStatus,
  errorMessage,
  isTransactionInProgress,
  chainId
} = useTaskTransaction();
```

#### `useTaskEvents`
Sistema centralizado de eventos da blockchain:
```typescript
const {
  taskCreatedEvents,
  taskCompletedEvents,
  onTaskCreated,
  onTaskCompleted,
  clearEvents
} = useTaskEvents();
```

#### `useTasks`
Gerenciamento de estado das tarefas:
```typescript
const {
  tasksData,
  isLoading,
  refetchTasks,
  taskManagerAddress
} = useTasks();
```

### Componentes Principais

#### `TransactionModal`
Modal flexível para feedback de transações:
- Estados visuais distintos (pending, confirming, success, error)
- Conteúdo customizável por tipo de operação
- Integração com explorers de blockchain
- Tratamento inteligente de erros por categoria

#### `TaskCard`
Cartão interativo para exibição de tarefas:
- Visual diferenciado por status (pendente/completada)
- Botão de ação contextual
- Informações completas da tarefa
- Suporte a temas dark/light

#### `EventsLog`
Monitor de eventos em tempo real:
- Combinação e ordenação de eventos
- Limitação automática de histórico (10 eventos)
- Interface limpa e informativa
- Controle de limpeza manual

### Sistema de Temas

Implementação robusta de dark/light mode:
- Uso do `next-themes` para persistência
- CSS Variables para cores dinâmicas
- Transições suaves entre temas
- Suporte a modo sistema automático

### Arquitetura de Eventos

Sistema event-driven para sincronização:
- Escuta de eventos `TaskCreated` e `TaskCompleted`
- Callbacks centralizados para atualização de estado
- Refetch automático de dados quando eventos ocorrem
- Cleanup automático para evitar memory leaks

## Considerações Finais

### Pontos Fortes

1. **Arquitetura Limpa**: Separação clara de responsabilidades com hooks customizados
2. **Type Safety**: TypeScript em toda a aplicação garantindo robustez
3. **UX Moderna**: Interface intuitiva com feedback visual completo
4. **Web3 Nativo**: Integração profunda com ferramentas modernas do ecossistema
5. **Escalabilidade**: Estrutura preparada para novas funcionalidades
6. **Performance**: Otimizações de re-render e gestão inteligente de estado

### Melhorias Futuras

1. **Funcionalidades**:
   - Sistema de categorias para tarefas
   - Definição de prazos com penalties automáticos
   - Ranking e gamificação com pontuações
   - Compartilhamento de tarefas públicas
   - Sistema de notificações push

2. **Técnicas**:
   - Testes automatizados (Jest, Cypress, Playwright)
   - PWA para uso offline
   - Otimização de bundle e lazy loading
   - Cache inteligente com React Query
   - Monitoring e analytics

3. **Web3**:
   - Suporte a mais redes (Arbitrum, Optimism, Base)
   - Integração com IPFS para metadados
   - Sistema de recompensas com tokens ERC-20
   - Funcionalidades DAO para governança
   - Multi-signature para tarefas colaborativas

### Desafios Superados

1. **Gestão de Estado Complexa**: Sincronização entre UI e blockchain usando eventos
2. **UX Web3**: Transições suaves entre estados de transação com feedback adequado
3. **Performance**: Otimização de re-renders e calls desnecessárias à blockchain
4. **Responsividade**: Layout adaptativo que funciona em todos os dispositivos
5. **Hidratação SSR**: Prevenção de mismatches durante hidratação

### Lições Aprendidas

- **Wagmi v2**: Aproveitamento máximo das novas funcionalidades e hooks
- **Event-Driven Architecture**: Arquitetura baseada em eventos para sync em tempo real
- **Component Composition**: Reutilização eficiente de componentes com props flexíveis
- **Error Handling**: Tratamento gracioso de erros Web3 com categorização
- **User Experience**: Importância de feedback visual em operações blockchain

### Métricas do Projeto

- **Componentes**: 20+ componentes reutilizáveis
- **Hooks Customizados**: 5 hooks especializados
- **Redes Suportadas**: 5 blockchains diferentes
- **TypeScript Coverage**: 100% type safety
- **Responsive**: Mobile-first design

Esta aplicação demonstra as melhores práticas para desenvolvimento de DApps modernas, combinando uma excelente experiência de usuário com a robustez e descentralização da tecnologia blockchain.

---

**Desenvolvido com ❤️ para o ecossistema Web3**

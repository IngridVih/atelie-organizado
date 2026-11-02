# Ateliê Organizado 🧶

Aplicativo Web Progressivo (PWA) desenvolvido sob medida para artesãs de crochê autônomas gerenciarem seus pedidos, controlarem estoques de materiais e calcularem preços justos com base em custos de materiais, horas de trabalho e margem de lucro.

---

## 📱 Contexto do Projeto
Desenvolvido para atender a realidade de produção artesanal (como o trabalho autônomo no Jardim Melvi, Praia Grande/SP), otimizando o fluxo de controle que antes dependia de cadernos e mensagens espalhadas no WhatsApp. O projeto alinha-se diretamente aos Objetivos de Desenvolvimento Sustentável da ONU (**ODS 8 - Trabalho Decente e Crescimento Econômico**, meta **8.3**).

---

## 🛠️ Stack Tecnológica e Arquitetura
- **Framework:** Angular (versão estável mais recente) com componentes Standalone, Signals e novo Control Flow (`@if`/`@for`).
- **Linguagem:** TypeScript estrito.
- **PWA:** Suporte a `@angular/pwa` (Manifest e Service Worker).
- **Banco de Dados / Backend:** Firebase (Authentication e Firestore) via SDK modular.
- **Testes Automatizados:** Vitest + jsdom executados via `ng test`.
- **Arquitetura em Camadas:** Telas ➔ Serviços de Regra ➔ Repositórios Abstratos.

---

## 🚀 Como Executar o Projeto Localmente

1. **Clonar o repositório:**
   ```bash
   git clone [https://github.com/IngridVih/atelie-organizado.git](https://github.com/IngridVih/atelie-organizado.git)
   cd atelie-organizado

---

## 🔑 Acesso ao Sistema (Login)

Para testar o **Ateliê Organizado**, podes aceder utilizando as credenciais de teste abaixo ou utilizar o modo de demonstração:

* **E-mail:** `vitoria@atelie.com`
* **Senha:** `atelie2026`

> **Nota:** Se preferires saltar a autenticação manual, clica no botão **"Acessar Modo Demonstração"** na tela de login para ir diretamente para o painel de pedidos.

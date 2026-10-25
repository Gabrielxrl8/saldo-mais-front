# Saldo+ — Front-end (React + TypeScript + Vite)

Sistema de gestão financeira pessoal. Protótipo de interface criado a partir de um design do Figma, com 6 telas navegáveis e dados fictícios de exemplo.

> Este projeto ainda **não tem back-end**: tudo roda no navegador e os dados voltam ao padrão ao recarregar a página.

## Telas

| Tela | O que faz |
|---|---|
| Login | Entrar ou criar conta, mostrar/ocultar senha |
| Painel | Saldo, receitas, despesas, últimas transações e score financeiro |
| Transações | Lista com busca e filtros; criar, editar e excluir transações |
| Orçamentos | Limite mensal por categoria; criar, editar e excluir |
| Metas | Metas com progresso; registrar progresso, criar, editar e excluir |
| Relatórios | Receitas x despesas, gastos por categoria, comparação com o mês anterior e score |

## Tecnologias

React 19, TypeScript, Vite, CSS puro (`src/index.css`, fonte DM Sans) e ESLint.

## Como rodar

Pré-requisito: [Node.js](https://nodejs.org) 20.19 ou superior (LTS).

```bash
git clone https://github.com/Gabrielxrl8/saldo-mais-front.git
cd saldo-mais-front
npm install
npm run dev
```

O app abre em `http://localhost:5173` (se a porta estiver ocupada, o Vite usa a próxima e mostra o endereço no terminal).

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Confere o TypeScript e gera a pasta `dist` |
| `npm run preview` | Abre a versão gerada pelo build |
| `npm run lint` | Verifica o código com o ESLint |

## Estrutura

```
src/
  main.tsx            ponto de entrada
  App.tsx             controla qual tela aparece e guarda transações, orçamentos e metas
  index.css           estilos globais
  tipos/              tipos TypeScript (Screen, Transaction, Budget, Goal, IconName)
  dados/              dados fictícios (transacoes, orcamentos, metas)
  utilitarios/        formatacao (dinheiro, %), calculos (totais do mês) e datas
  componentes/        peças reutilizáveis
    Icone, Botao, Campo, Selecao, Cartao, CartaoEstatistica, TituloSecao,
    Marca, BarraLateral, Cabecalho, ListaTransacoes, LinhaOrcamento,
    GraficoRosca, Aviso
  paginas/            uma por tela
    Login, Painel, Transacoes, Orcamentos, Metas, Relatorios
public/               favicon e ícones
```

## Como funciona a navegação

Não há rotas nem URLs por tela. O `App.tsx` guarda a tela atual em um estado (`login`, `dashboard`, `transactions`, `budgets`, `goals` ou `reports`) e mostra o menu lateral junto com a tela escolhida, exceto no login.

As listas de transações, orçamentos e metas ficam no `App.tsx` e descem para as páginas por props. O Painel e os Relatórios calculam receitas, despesas e saldo a partir das transações de outubro.

## O que ainda não existe

- Back-end / API conectada (os dados vêm de `src/dados/`).
- Autenticação real: o login só troca de tela, sem validar e-mail e senha.
- Persistência: ao recarregar, os dados voltam ao padrão.
- Versão para celular e tablet: o layout foi pensado para telas a partir de 1100 px.
- Botões sem ação: Configurações, sino de notificações, "Esqueci minha senha", "Lembrar de mim", paginação, Mensal/Anual e seletor de mês.
- Valores fixos: saldo, +12,8%, score 82, gráficos e comparações com o mês anterior. "Este mês" é sempre outubro de 2026.

## Próximos passos

1. Integrar com a API (back-end) e trocar os dados fictícios pelos reais.
2. Validar o login e tratar erros de formulário.
3. Salvar os dados (API ou armazenamento local).
4. Criar versão responsiva para celular.
5. Adicionar rotas (por exemplo, React Router) para ter um endereço por tela.

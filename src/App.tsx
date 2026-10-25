import { useMemo, useState, type FormEvent, type ReactNode } from "react"

type Screen = "login" | "dashboard" | "transactions" | "budgets" | "goals" | "reports"
type IconName = "arrow-down" | "arrow-up" | "bell" | "calendar" | "chart" | "check" | "chevron" | "dashboard" | "eye" | "flag" | "food" | "goal" | "home" | "logout" | "menu" | "plus" | "report" | "search" | "settings" | "shopping" | "transaction" | "transport" | "wallet" | "x"
type Transaction = {
  id: number
  title: string
  category: string
  date: string
  amount: number
  type: "income" | "expense"
  icon: IconName
}

const iconPaths: Record<IconName, ReactNode> = {
  "arrow-down": <path d="m7 10 5 5 5-5M12 15V4" />,
  "arrow-up": <path d="m7 9 5-5 5 5M12 4v11" />,
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </>
  ),
  chart: (
    <>
      <path d="M4 19V9M10 19V5M16 19v-7M22 19H2" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  chevron: <path d="m9 18 6-6-6-6" />,
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="2" />
      <rect x="14" y="3" width="7" height="7" rx="2" />
      <rect x="3" y="14" width="7" height="7" rx="2" />
      <rect x="14" y="14" width="7" height="7" rx="2" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12" />
      <circle cx="12" cy="12" r="2.5" />
    </>
  ),
  flag: (
    <>
      <path d="M5 21V4" />
      <path d="M5 5h11l-2 4 2 4H5" />
    </>
  ),
  food: (
    <>
      <path d="M7 3v8M4 3v5a3 3 0 0 0 6 0V3M7 11v10M16 3v18M16 3c3 2 4 5 4 8h-4" />
    </>
  ),
  goal: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  home: (
    <>
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v11h14V10M9 21v-7h6v7" />
    </>
  ),
  logout: (
    <>
      <path d="M10 17l5-5-5-5M15 12H3" />
      <path d="M15 4h5v16h-5" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  plus: <path d="M12 5v14M5 12h14" />,
  report: (
    <>
      <path d="M5 21V10M12 21V3M19 21v-6" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" />
    </>
  ),
  shopping: (
    <>
      <path d="M4 8h16l-1 13H5L4 8Z" />
      <path d="M9 8a3 3 0 0 1 6 0" />
    </>
  ),
  transaction: (
    <>
      <path d="M5 7h14M15 3l4 4-4 4M19 17H5M9 13l-4 4 4 4" />
    </>
  ),
  transport: (
    <>
      <rect x="4" y="5" width="16" height="13" rx="3" />
      <path d="M7 18v3M17 18v3M4 12h16M8 9h.01M16 9h.01" />
    </>
  ),
  wallet: (
    <>
      <path d="M3 6h16a2 2 0 0 1 2 2v11H5a2 2 0 0 1-2-2V6Z" />
      <path d="M3 6V5a2 2 0 0 1 2-2h12v3M16 11h5v4h-5a2 2 0 0 1 0-4Z" />
    </>
  ),
  x: <path d="m6 6 12 12M18 6 6 18" />,
}

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      className="shrink-0"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconPaths[name]}
    </svg>
  )
}

function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost"
}) {
  return (
    <button className={`button button-${variant} ${className}`} {...props}>
      {children}
    </button>
  )
}

function Field({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="field-label">
      <span>{label}</span>
      <input className="field" {...props} />
    </label>
  )
}

function Select({
  label,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string }) {
  return (
    <label className={label ? "field-label" : ""}>
      {label && <span>{label}</span>}
      <span className="select-wrap">
        <select className="field select-field" {...props}>
          {children}
        </select>
        <Icon name="chevron" size={15} />
      </span>
    </label>
  )
}

const transactions: Transaction[] = [
  {
    id: 1,
    title: "Salário mensal",
    category: "Receita",
    date: "05 Out 2026",
    amount: 8200,
    type: "income",
    icon: "wallet" as IconName,
  },
  {
    id: 2,
    title: "Supermercado Pão de Açúcar",
    category: "Alimentação",
    date: "04 Out 2026",
    amount: -486.2,
    type: "expense",
    icon: "food" as IconName,
  },
  {
    id: 3,
    title: "Aluguel",
    category: "Moradia",
    date: "03 Out 2026",
    amount: -2100,
    type: "expense",
    icon: "home" as IconName,
  },
  {
    id: 4,
    title: "Projeto freelance",
    category: "Receita",
    date: "02 Out 2026",
    amount: 1850,
    type: "income",
    icon: "wallet" as IconName,
  },
  {
    id: 5,
    title: "Uber",
    category: "Transporte",
    date: "01 Out 2026",
    amount: -42.8,
    type: "expense",
    icon: "transport" as IconName,
  },
  {
    id: 6,
    title: "Livraria Cultura",
    category: "Compras",
    date: "30 Set 2026",
    amount: -129.9,
    type: "expense",
    icon: "shopping" as IconName,
  },
  {
    id: 7,
    title: "Conta de energia",
    category: "Moradia",
    date: "26 Set 2026",
    amount: -238.4,
    type: "expense",
    icon: "home",
  },
  {
    id: 8,
    title: "Restaurante",
    category: "Alimentação",
    date: "22 Set 2026",
    amount: -184.9,
    type: "expense",
    icon: "food",
  },
  {
    id: 9,
    title: "Rendimento de investimento",
    category: "Receita",
    date: "18 Set 2026",
    amount: 342.7,
    type: "income",
    icon: "wallet",
  },
  {
    id: 10,
    title: "Combustível",
    category: "Transporte",
    date: "12 Set 2026",
    amount: -250,
    type: "expense",
    icon: "transport",
  },
  {
    id: 11,
    title: "Assinatura de streaming",
    category: "Outros",
    date: "08 Set 2026",
    amount: -55.9,
    type: "expense",
    icon: "wallet",
  },
  {
    id: 12,
    title: "Farmácia",
    category: "Outros",
    date: "03 Set 2026",
    amount: -96.5,
    type: "expense",
    icon: "shopping",
  },
]

const budgetData = [
  {
    category: "Alimentação",
    icon: "food" as IconName,
    spent: 1710,
    limit: 1800,
    color: "orange",
  },
  {
    category: "Moradia",
    icon: "home" as IconName,
    spent: 2410,
    limit: 2800,
    color: "green",
  },
  {
    category: "Transporte",
    icon: "transport" as IconName,
    spent: 720,
    limit: 1000,
    color: "blue",
  },
  {
    category: "Compras",
    icon: "shopping" as IconName,
    spent: 490,
    limit: 900,
    color: "purple",
  },
]

const goals = [
  {
    name: "Reserva de emergência",
    icon: "flag" as IconName,
    saved: 12500,
    target: 30000,
    deadline: "Dez 2027",
    color: "green",
  },
  {
    name: "Viagem para Portugal",
    icon: "goal" as IconName,
    saved: 6800,
    target: 15000,
    deadline: "Set 2027",
    color: "blue",
  },
]

const money = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    Math.abs(value),
  )

const round2 = (value: number) => Math.round(value * 100) / 100
const moneySigned = (value: number) => (value < 0 ? "- " : "") + money(value)
const parseMoneyValue = (value: FormDataEntryValue | null) =>
  Number(
    String(value ?? "")
      .replace(/\./g, "")
      .replace(",", ".")
      .replace(/[^\d.]/g, ""),
  )
const pct = (current: number, previous: number) => {
  const value = previous ? ((current - previous) / previous) * 100 : 0
  return `${value >= 0 ? "+" : "-"}${Math.abs(value).toFixed(1).replace(".", ",")}%`
}
const octTotal = (
  list: Transaction[],
  kind: "income" | "expense",
  category?: string,
) =>
  list
    .filter(
      (t) =>
        t.date.includes("Out") &&
        t.type === kind &&
        (!category || t.category === category),
    )
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)
const summary = (list: Transaction[]) => {
  const income = round2(
    10050 + octTotal(list, "income") - octTotal(transactions, "income"),
  )
  const expense = round2(
    6284.3 + octTotal(list, "expense") - octTotal(transactions, "expense"),
  )
  return {
    income,
    expense,
    balance: round2(12480.5 + (income - 10050) - (expense - 6284.3)),
    period: round2(income - expense),
    prevIncome: 9290,
    prevExpense: 6504.8,
    prevPeriod: 2785.2,
  }
}

function Brand({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`brand ${dark ? "brand-dark" : ""}`}>
      <span className="brand-mark">
        <Icon name="chart" size={22} />
      </span>
      <span>Saldo</span>
      <b>+</b>
    </div>
  )
}

function Sidebar({
  screen,
  setScreen,
}: {
  screen: Screen
  setScreen: (screen: Screen) => void
}) {
  const links: { id: Screen; label: string; icon: IconName }[] = [
    { id: "dashboard", label: "Painel", icon: "dashboard" },
    { id: "transactions", label: "Transações", icon: "transaction" },
    { id: "budgets", label: "Orçamentos", icon: "wallet" },
    { id: "goals", label: "Metas", icon: "goal" },
    { id: "reports", label: "Relatórios", icon: "report" },
  ]
  return (
    <aside className="sidebar">
      <Brand dark />
      <nav className="side-nav" aria-label="Navegação principal">
        <p className="nav-label">MENU PRINCIPAL</p>
        {links.map((link) => (
          <button
            key={link.id}
            className={`nav-link ${screen === link.id ? "active" : ""}`}
            onClick={() => setScreen(link.id)}
          >
            <Icon name={link.icon} size={19} />
            <span>{link.label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <button className="nav-link">
          <Icon name="settings" size={19} />
          <span>Configurações</span>
        </button>
        <button className="nav-link" onClick={() => setScreen("login")}>
          <Icon name="logout" size={19} />
          <span>Sair</span>
        </button>
        <div className="profile">
          <span className="avatar">AM</span>
          <span>
            <strong>Ana Martins</strong>
            <small>ana@email.com</small>
          </span>
        </div>
      </div>
    </aside>
  )
}

function Header({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="topbar">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="top-actions">
        <button className="icon-button" aria-label="Notificações">
          <Icon name="bell" />
        </button>
        <span className="mini-avatar">AM</span>
      </div>
    </header>
  )
}

function Card({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return <section className={`card ${className}`}>{children}</section>
}

function StatCard({
  label,
  value,
  trend,
  icon,
  tone = "green",
}: {
  label: string
  value: string
  trend: string
  icon: IconName
  tone?: string
}) {
  return (
    <Card className="stat-card">
      <div className={`stat-icon ${tone}`}>
        <Icon name={icon} />
      </div>
      <div className="stat-copy">
        <span>{label}</span>
        <strong>{value}</strong>
        <small className={trend.startsWith("+") ? "positive" : "negative"}>
          <Icon
            name={trend.startsWith("+") ? "arrow-up" : "arrow-down"}
            size={14}
          />
          {trend} <em>vs. mês anterior</em>
        </small>
      </div>
    </Card>
  )
}

function SectionTitle({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      {action}
    </div>
  )
}

function Login({ onLogin }: { onLogin: () => void }) {
  const [create, setCreate] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const submit = (event: FormEvent) => {
    event.preventDefault()
    onLogin()
  }
  return (
    <main className="login-page">
      <div className="login-art">
        <Brand dark />
        <div className="login-message">
          <span className="eyebrow">SUA VIDA FINANCEIRA, MAIS LEVE</span>
          <h1>Clareza para cuidar do seu dinheiro.</h1>
          <p>
            Organize suas finanças, acompanhe seus objetivos e tome decisões
            melhores todos os dias.
          </p>
          <div className="balance-preview">
            <div className="balance-head">
              <div>
                <span>Saldo disponível</span>
                <strong>R$ 12.480,50</strong>
              </div>
              <span className="growth-pill">
                <Icon name="arrow-up" size={14} /> +12,8%
              </span>
            </div>
            <svg
              viewBox="0 0 390 96"
              role="img"
              aria-label="Evolução positiva do saldo"
            >
              <defs>
                <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                  <stop stopColor="#2dd4bf" stopOpacity=".28" />
                  <stop offset="1" stopColor="#2dd4bf" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                className="chart-area"
                d="M0 83 C45 75,56 53,99 62 S161 49,190 55 S235 29,273 38 S335 22,390 7 V96 H0Z"
              />
              <path
                className="chart-line"
                d="M0 83 C45 75,56 53,99 62 S161 49,190 55 S235 29,273 38 S335 22,390 7"
              />
            </svg>
          </div>
        </div>
        <p className="login-foot">
          Seus dados protegidos e sempre sob o seu controle
        </p>
      </div>
      <div className="login-form-wrap">
        <form className="login-form" onSubmit={submit}>
          <div className="mobile-brand">
            <Brand />
          </div>
          <span className="eyebrow green">
            {create ? "COMECE AGORA" : "BEM-VINDO DE VOLTA"}
          </span>
          <h2>{create ? "Crie sua conta" : "Acesse sua conta"}</h2>
          <p>
            {create
              ? "Dê o primeiro passo para uma vida financeira mais tranquila."
              : "Entre para continuar cuidando da sua vida financeira."}
          </p>
          {create && (
            <Field
              label="Nome completo"
              placeholder="Como podemos chamar você?"
              autoComplete="name"
            />
          )}
          <Field
            label="E-mail"
            type="email"
            placeholder="seu@email.com"
            autoComplete="email"
          />
          <label className="field-label">
            <span>Senha</span>
            <span className="password-wrap">
              <input
                className="field"
                type={showPassword ? "text" : "password"}
                placeholder="Sua senha"
                autoComplete={create ? "new-password" : "current-password"}
              />
              <button
                type="button"
                aria-label="Mostrar senha"
                onClick={() => setShowPassword(!showPassword)}
              >
                <Icon name="eye" size={19} />
              </button>
            </span>
          </label>
          {!create && (
            <div className="form-options">
              <label>
                <input type="checkbox" /> Lembrar de mim
              </label>
              <button type="button">Esqueci minha senha</button>
            </div>
          )}
          <Button type="submit" className="login-button">
            {create ? "Criar minha conta" : "Entrar"}
            <Icon name="chevron" size={17} />
          </Button>
          <div className="divider">
            <span>ou</span>
          </div>
          <p className="switch-account">
            {create ? "Já tem uma conta?" : "Ainda não tem uma conta?"}{" "}
            <button type="button" onClick={() => setCreate(!create)}>
              {create ? "Entrar" : "Criar conta grátis"}
            </button>
          </p>
        </form>
      </div>
    </main>
  )
}

function Dashboard({
  navigate,
  items,
}: {
  navigate: (screen: Screen) => void
  items: Transaction[]
}) {
  const totals = summary(items)
  return (
    <>
      <Header
        title="Olá, Ana!"
        subtitle="Aqui está o resumo das suas finanças em outubro."
      />
      <div className="page-content">
        <div className="stats-grid">
          <StatCard
            label="Saldo atual"
            value={moneySigned(totals.balance)}
            trend="+12,8%"
            icon="wallet"
          />
          <StatCard
            label="Receitas"
            value={money(totals.income)}
            trend={pct(totals.income, totals.prevIncome)}
            icon="arrow-up"
          />
          <StatCard
            label="Despesas"
            value={money(totals.expense)}
            trend={pct(totals.expense, totals.prevExpense)}
            icon="arrow-down"
            tone="orange"
          />
        </div>
        <div className="dashboard-grid">
          <Card className="recent-card">
            <SectionTitle
              title="Últimas transações"
              action={
                <button
                  className="text-button"
                  onClick={() => navigate("transactions")}
                >
                  Ver todas <Icon name="chevron" size={14} />
                </button>
              }
            />
            <TransactionList items={items.slice(0, 3)} />
          </Card>
          <Card className="score-card">
            <SectionTitle title="Saúde financeira" />
            <div className="score-ring">
              <svg viewBox="0 0 120 120">
                <circle className="score-bg" cx="60" cy="60" r="50" />
                <circle
                  className="score-value"
                  cx="60"
                  cy="60"
                  r="50"
                  pathLength="100"
                />
              </svg>
              <div>
                <strong>82</strong>
                <span>de 100</span>
              </div>
            </div>
            <b>Muito bem!</b>
            <p>Seu score melhorou 6 pontos este mês.</p>
            <div className="score-status">
              <Icon name="check" size={16} /> Finanças saudáveis
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}

function TransactionList({
  items = transactions,
  onEdit,
  onDelete,
}: {
  items?: Transaction[]
  onEdit?: (item: Transaction) => void
  onDelete?: (item: Transaction) => void
}) {
  const [openId, setOpenId] = useState<number | null>(null)
  const hasMenu = Boolean(onEdit || onDelete)
  return (
    <div className="transaction-list">
      {items.map((item) => (
        <div className="transaction-row" key={item.id}>
          <div className="transaction-main">
            <span className={`transaction-icon ${item.type}`}>
              <Icon name={item.icon} />
            </span>
            <div className="transaction-name">
              <strong>{item.title}</strong>
              <span>{item.type === "income" ? "Entrada" : "Saída"}</span>
            </div>
          </div>
          <span className="category-label">{item.category}</span>
          <span className="transaction-date">{item.date}</span>
          <strong className={item.amount > 0 ? "positive" : "negative"}>
            {item.amount > 0 ? "+" : "-"} {money(item.amount)}
          </strong>
          {hasMenu ? (
            <div className="row-menu-wrap">
              <button
                className="more-button"
                aria-label={`Opções para ${item.title}`}
                aria-haspopup="menu"
                aria-expanded={openId === item.id}
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
              >
                •••
              </button>
              {openId === item.id && (
                <div className="row-menu" role="menu">
                  <button
                    role="menuitem"
                    onClick={() => {
                      setOpenId(null)
                      onEdit?.(item)
                    }}
                  >
                    Editar
                  </button>
                  <button
                    role="menuitem"
                    className="danger"
                    onClick={() => {
                      setOpenId(null)
                      onDelete?.(item)
                    }}
                  >
                    Excluir
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="more-button"
              aria-label={`Opções para ${item.title}`}
            >
              •••
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

const monthNumbers: Record<string, string> = {
  Jan: "01",
  Fev: "02",
  Mar: "03",
  Abr: "04",
  Mai: "05",
  Jun: "06",
  Jul: "07",
  Ago: "08",
  Set: "09",
  Out: "10",
  Nov: "11",
  Dez: "12",
}
const monthNames: Record<string, string> = Object.fromEntries(
  Object.entries(monthNumbers).map(([name, number]) => [number, name]),
)
const toInputDate = (date: string) => {
  const [day, month, year] = date.split(" ")
  return `${year}-${monthNumbers[month] ?? "10"}-${day.padStart(2, "0")}`
}
const toInputValue = (amount: number) =>
  Math.abs(amount).toFixed(2).replace(".", ",")

function Transactions({
  items,
  setItems,
}: {
  items: Transaction[]
  setItems: React.Dispatch<React.SetStateAction<Transaction[]>>
}) {
  const [type, setType] = useState("all")
  const [category, setCategory] = useState("all")
  const [period, setPeriod] = useState("month")
  const [search, setSearch] = useState("")
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState<Transaction | null>(null)
  const [deleting, setDeleting] = useState<Transaction | null>(null)
  const filtered = useMemo(
    () =>
      items.filter(
        (item) =>
          (type === "all" || item.type === type) &&
          (category === "all" || item.category === category) &&
          (period === "year" ||
            (period === "month" && item.date.includes("Out")) ||
            (period === "last" && item.date.includes("Set"))) &&
          item.title.toLowerCase().includes(search.toLowerCase()),
      ),
    [items, type, category, period, search],
  )
  const closeForm = () => {
    setModal(false)
    setEditing(null)
  }
  return (
    <>
      <Header
        title="Transações"
        subtitle="Acompanhe todas as movimentações da sua conta."
      />
      <div className="page-content">
        <div className="page-heading-actions">
          <div className="search-box">
            <Icon name="search" size={18} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar transação..."
            />
          </div>
          <Button onClick={() => setModal(true)}>
            <Icon name="plus" size={18} /> Nova transação
          </Button>
        </div>
        <Card className="filters-card">
          <span className="filter-title">Filtrar por</span>
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="all">Todos os tipos</option>
            <option value="income">Receitas</option>
            <option value="expense">Despesas</option>
          </Select>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">Todas as categorias</option>
            <option>Alimentação</option>
            <option>Moradia</option>
            <option>Transporte</option>
            <option>Compras</option>
            <option>Receita</option>
          </Select>
          <Select value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="month">Este mês</option>
            <option value="last">Mês anterior</option>
            <option value="year">Este ano</option>
          </Select>
          <button
            className="clear-filter"
            onClick={() => {
              setType("all")
              setCategory("all")
              setPeriod("month")
              setSearch("")
            }}
          >
            Limpar filtros
          </button>
        </Card>
        <Card className="table-card">
          <div className="table-header">
            <span>Descrição</span>
            <span>Categoria</span>
            <span>Data</span>
            <span>Valor</span>
            <span />
          </div>
          {filtered.length ? (
            <TransactionList
              items={filtered}
              onEdit={(item) => setEditing(item)}
              onDelete={(item) => setDeleting(item)}
            />
          ) : (
            <div className="empty-state">Nenhuma transação encontrada.</div>
          )}
          <div className="table-footer">
            <span>
              Mostrando {filtered.length} de {items.length} transações
            </span>
            <div>
              <button disabled>‹</button>
              <button className="current">1</button>
              <button>2</button>
              <button>›</button>
            </div>
          </div>
        </Card>
      </div>
      {(modal || editing) && (
        <div className="modal-backdrop" onMouseDown={closeForm}>
          <Card className="modal">
            <div onMouseDown={(e) => e.stopPropagation()}>
              <SectionTitle
                title={editing ? "Editar transação" : "Nova transação"}
                action={
                  <button className="icon-button" onClick={closeForm}>
                    <Icon name="x" />
                  </button>
                }
              />
              <form
                key={editing ? editing.id : "new"}
                onSubmit={(e) => {
                  e.preventDefault()
                  const form = new FormData(e.currentTarget)
                  const transactionType = form.get("type") as
                    | "income"
                    | "expense"
                  const numericValue = Number(
                    String(form.get("value") ?? "")
                      .replace(/\./g, "")
                      .replace(",", ".")
                      .replace(/[^\d.]/g, ""),
                  )
                  const formCategory = String(form.get("category") ?? "Outros")
                  const dateValue = String(form.get("date") ?? "2026-10-06")
                  const [year, month, day] = dateValue.split("-")
                  const saved: Transaction = {
                    id: editing ? editing.id : Date.now(),
                    title: String(form.get("description")),
                    category: formCategory,
                    date: `${day} ${monthNames[month] ?? "Out"} ${year}`,
                    amount:
                      transactionType === "expense"
                        ? -Math.abs(numericValue)
                        : Math.abs(numericValue),
                    type: transactionType,
                    icon:
                      transactionType === "income"
                        ? "wallet"
                        : formCategory === "Alimentação"
                          ? "food"
                          : formCategory === "Moradia"
                            ? "home"
                            : formCategory === "Transporte"
                              ? "transport"
                              : "shopping",
                  }
                  setItems((current) =>
                    editing
                      ? current.map((item) =>
                          item.id === saved.id ? saved : item,
                        )
                      : [saved, ...current],
                  )
                  closeForm()
                }}
              >
                <Field
                  label="Descrição"
                  name="description"
                  placeholder="Ex.: Compra no mercado"
                  defaultValue={editing?.title ?? ""}
                  required
                />
                <div className="two-fields">
                  <Select
                    label="Tipo"
                    name="type"
                    defaultValue={editing?.type ?? "expense"}
                    required
                  >
                    <option value="expense">Despesa</option>
                    <option value="income">Receita</option>
                  </Select>
                  <Field
                    label="Valor"
                    name="value"
                    inputMode="decimal"
                    placeholder="R$ 0,00"
                    defaultValue={editing ? toInputValue(editing.amount) : ""}
                    required
                  />
                </div>
                <div className="two-fields">
                  <Select
                    label="Categoria"
                    name="category"
                    defaultValue={editing?.category ?? "Alimentação"}
                  >
                    <option>Alimentação</option>
                    <option>Moradia</option>
                    <option>Transporte</option>
                    <option>Compras</option>
                    <option>Receita</option>
                    <option>Outros</option>
                  </Select>
                  <Field
                    label="Data"
                    name="date"
                    type="date"
                    defaultValue={
                      editing ? toInputDate(editing.date) : "2026-10-06"
                    }
                    required
                  />
                </div>
                <div className="modal-actions">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={closeForm}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">
                    {editing ? "Salvar alterações" : "Salvar transação"}
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}
      {deleting && (
        <div className="modal-backdrop" onMouseDown={() => setDeleting(null)}>
          <Card className="modal">
            <div
              role="dialog"
              aria-label="Excluir transação"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <SectionTitle title="Excluir transação" />
              <p style={{ margin: "8px 0 22px", color: "#64727b" }}>
                Excluir "{deleting.title}"? Essa ação não pode ser desfeita.
              </p>
              <div className="modal-actions">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setDeleting(null)}
                >
                  Cancelar
                </Button>
                <Button
                  type="button"
                  style={{ background: "#b45309" }}
                  onClick={() => {
                    setItems((current) =>
                      current.filter((item) => item.id !== deleting.id),
                    )
                    setDeleting(null)
                  }}
                >
                  Excluir
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}

type Budget = {
  id: number
  category: string
  icon: IconName
  spent: number
  baseline: number
  limit: number
  color: string
}

const initialBudgets: Budget[] = budgetData.map((budget, index) => ({
  ...budget,
  id: index + 1,
  baseline: octTotal(transactions, "expense", budget.category),
}))
const initialGoals: Goal[] = goals.map((goal, index) => ({
  ...goal,
  id: index + 1,
}))
const budgetCategories = [
  "Alimentação",
  "Moradia",
  "Transporte",
  "Compras",
  "Lazer",
  "Saúde",
  "Educação",
  "Outros",
]
const budgetIcons: Record<string, IconName> = {
  Alimentação: "food",
  Moradia: "home",
  Transporte: "transport",
  Compras: "shopping",
}
const budgetColors = ["blue", "purple", "green", "orange"]

function BudgetRow({
  item,
  compact = false,
}: {
  item: Budget
  compact?: boolean
}) {
  const percent = Math.round((item.spent / item.limit) * 100)
  return (
    <div className={`budget-row ${compact ? "compact" : ""}`}>
      <div className="budget-info">
        <span className={`category-icon ${item.color}`}>
          <Icon name={item.icon} size={19} />
        </span>
        <div>
          <strong>{item.category}</strong>
          {!compact && <span>Orçamento mensal</span>}
        </div>
      </div>
      <div className="budget-numbers">
        <span>
          <strong>{money(item.spent)}</strong> de {money(item.limit)}
        </span>
        <b className={percent > 90 ? "warning-text" : ""}>{percent}%</b>
      </div>
      <div className="progress">
        <i
          className={`${item.color} ${percent > 90 ? "warning" : ""}`}
          style={{ width: `${Math.min(100, percent)}%` }}
        />
      </div>
    </div>
  )
}

function Budgets({
  items,
  setItems,
  transactionItems,
}: {
  items: Budget[]
  setItems: React.Dispatch<React.SetStateAction<Budget[]>>
  transactionItems: Transaction[]
}) {
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Budget | null>(null)
  const [deleting, setDeleting] = useState<Budget | null>(null)
  const [openId, setOpenId] = useState<number | null>(null)
  const [toast, setToast] = useState<{ title: string; text: string } | null>(
    null,
  )
  const closeForm = () => {
    setFormOpen(false)
    setEditing(null)
  }
  const withSpent = items.map((budget) => ({
    ...budget,
    spent: round2(
      budget.spent +
        octTotal(transactionItems, "expense", budget.category) -
        budget.baseline,
    ),
  }))
  const available = budgetCategories.filter(
    (name) => !items.some((budget) => budget.category === name),
  )
  const totalSpent = withSpent.reduce((total, b) => total + b.spent, 0)
  const totalLimit = withSpent.reduce((total, b) => total + b.limit, 0)
  const overall = totalLimit ? Math.round((totalSpent / totalLimit) * 100) : 0
  const remaining = totalLimit - totalSpent
  const food = items.find((budget) => budget.category === "Alimentação")
  return (
    <>
      <Header
        title="Orçamentos"
        subtitle="Planeje seus gastos e mantenha o controle do mês."
      />
      <div className="page-content">
        <div className="page-heading-actions">
          <div>
            <span className="month-label">ORÇAMENTO DE OUTUBRO</span>
            <h2 className="content-title">
              {money(totalSpent)} <small>gastos de {money(totalLimit)}</small>
            </h2>
          </div>
          <Button
            onClick={() => setFormOpen(true)}
            disabled={available.length === 0}
          >
            <Icon name="plus" size={18} /> Criar orçamento
          </Button>
        </div>
        <Card className="overall-budget">
          <div>
            <strong>{overall}%</strong>
            <span>do orçamento utilizado</span>
          </div>
          <div className="progress large">
            <i
              className={overall > 90 ? "orange warning" : "green"}
              style={{ width: `${Math.min(100, overall)}%` }}
            />
          </div>
          <p>
            {remaining >= 0 ? (
              <>
                Você ainda tem <strong>{money(remaining)}</strong> disponíveis
                para este mês.
              </>
            ) : (
              <>
                Você ultrapassou o orçamento em{" "}
                <strong>{money(remaining)}</strong>.
              </>
            )}
          </p>
        </Card>
        {withSpent.length ? (
          <div className="budget-grid">
            {withSpent.map((item) => (
              <Card key={item.id} className="budget-detail">
                <BudgetRow item={item} />
                <div className="budget-footer">
                  <span>
                    {item.limit >= item.spent ? "Restam " : "Excedeu "}
                    <strong>{money(item.limit - item.spent)}</strong>
                  </span>
                  <div className="row-menu-wrap">
                    <button
                      className="more-button"
                      aria-label={`Opções para ${item.category}`}
                      aria-haspopup="menu"
                      aria-expanded={openId === item.id}
                      onClick={() =>
                        setOpenId(openId === item.id ? null : item.id)
                      }
                    >
                      •••
                    </button>
                    {openId === item.id && (
                      <div
                        className="row-menu"
                        role="menu"
                        style={{
                          top: "auto",
                          bottom: "calc(100% + 4px)",
                          right: 0,
                          transform: "none",
                        }}
                      >
                        <button
                          role="menuitem"
                          onClick={() => {
                            setOpenId(null)
                            setEditing(items.find((b) => b.id === item.id) ?? null)
                          }}
                        >
                          Editar
                        </button>
                        <button
                          role="menuitem"
                          className="danger"
                          onClick={() => {
                            setOpenId(null)
                            setDeleting(items.find((b) => b.id === item.id) ?? null)
                          }}
                        >
                          Excluir
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            Nenhum orçamento ainda. Clique em "Criar orçamento" para começar.
          </div>
        )}
        <Card className="budget-tip">
          <span className="tip-icon">
            <Icon name="chart" />
          </span>
          <div>
            <strong>Dica para o seu orçamento</strong>
            <p>
              Seus gastos com alimentação subiram 14% em relação ao mês passado.
              Que tal revisar esse limite?
            </p>
          </div>
          <Button
            variant="secondary"
            disabled={!food}
            onClick={() => food && setEditing(food)}
          >
            Revisar orçamento
          </Button>
        </Card>
      </div>
      {(formOpen || editing) && (
        <div className="modal-backdrop" onMouseDown={closeForm}>
          <Card className="modal">
            <div onMouseDown={(e) => e.stopPropagation()}>
              <SectionTitle
                title={editing ? "Editar orçamento" : "Criar orçamento"}
                action={
                  <button className="icon-button" onClick={closeForm}>
                    <Icon name="x" />
                  </button>
                }
              />
              <form
                key={editing ? editing.id : "new"}
                onSubmit={(e) => {
                  e.preventDefault()
                  const form = new FormData(e.currentTarget)
                  const limit = Math.abs(parseMoneyValue(form.get("limit")))
                  if (!limit) return
                  if (editing) {
                    setItems((current) =>
                      current.map((budget) =>
                        budget.id === editing.id ? { ...budget, limit } : budget,
                      ),
                    )
                    setToast({
                      title: "Orçamento atualizado",
                      text: `O limite de ${editing.category} foi atualizado.`,
                    })
                  } else {
                    const category = String(form.get("category") ?? "Outros")
                    const budget: Budget = {
                      id: Date.now(),
                      category,
                      icon: budgetIcons[category] ?? "wallet",
                      spent: 0,
                      baseline: 0,
                      limit,
                      color: budgetColors[items.length % budgetColors.length],
                    }
                    setItems((current) => [...current, budget])
                    setToast({
                      title: "Orçamento criado",
                      text: `O orçamento de ${category} foi adicionado.`,
                    })
                  }
                  closeForm()
                }}
              >
                {editing ? (
                  <Field
                    label="Categoria"
                    value={editing.category}
                    readOnly
                  />
                ) : (
                  <Select label="Categoria" name="category">
                    {available.map((name) => (
                      <option key={name}>{name}</option>
                    ))}
                  </Select>
                )}
                <Field
                  label="Limite mensal"
                  name="limit"
                  inputMode="decimal"
                  placeholder="R$ 0,00"
                  defaultValue={editing ? toInputValue(editing.limit) : ""}
                  required
                />
                <div className="modal-actions">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={closeForm}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">
                    {editing ? "Salvar alterações" : "Criar orçamento"}
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}
      {deleting && (
        <div className="modal-backdrop" onMouseDown={() => setDeleting(null)}>
          <Card className="modal">
            <div
              role="dialog"
              aria-label="Excluir orçamento"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <SectionTitle title="Excluir orçamento" />
              <p style={{ margin: "8px 0 22px", color: "#64727b" }}>
                Excluir o orçamento de "{deleting.category}"? Essa ação não pode
                ser desfeita.
              </p>
              <div className="modal-actions">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setDeleting(null)}
                >
                  Cancelar
                </Button>
                <Button
                  type="button"
                  style={{ background: "#b45309" }}
                  onClick={() => {
                    setItems((current) =>
                      current.filter((budget) => budget.id !== deleting.id),
                    )
                    setToast({
                      title: "Orçamento excluído",
                      text: `O orçamento de ${deleting.category} foi removido.`,
                    })
                    setDeleting(null)
                  }}
                >
                  Excluir
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
      {toast && (
        <div className="toast">
          <span className="toast-check">
            <Icon name="check" size={16} />
          </span>
          <div>
            <strong>{toast.title}</strong>
            <p>{toast.text}</p>
          </div>
          <button onClick={() => setToast(null)}>
            <Icon name="x" size={17} />
          </button>
        </div>
      )}
    </>
  )
}

type Goal = {
  id: number
  name: string
  icon: IconName
  saved: number
  target: number
  deadline: string
  color: string
}

const toMonthInput = (deadline: string) => {
  const [month, year] = deadline.split(" ")
  return `${year}-${monthNumbers[month] ?? "12"}`
}

function Goals({
  items,
  setItems,
}: {
  items: Goal[]
  setItems: React.Dispatch<React.SetStateAction<Goal[]>>
}) {
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Goal | null>(null)
  const [deleting, setDeleting] = useState<Goal | null>(null)
  const [openId, setOpenId] = useState<number | null>(null)
  const [toast, setToast] = useState<{ title: string; text: string } | null>(
    null,
  )
  const closeForm = () => {
    setFormOpen(false)
    setEditing(null)
  }
  const registerProgress = (goal: Goal) => {
    setItems((current) =>
      current.map((item) =>
        item.id === goal.id
          ? { ...item, saved: Math.min(item.saved + 500, item.target) }
          : item,
      ),
    )
    setToast({
      title: "Progresso registrado",
      text: `${goal.name} foi atualizada com sucesso.`,
    })
  }
  const parseMoney = (value: FormDataEntryValue | null) =>
    Number(
      String(value ?? "")
        .replace(/\./g, "")
        .replace(",", ".")
        .replace(/[^\d.]/g, ""),
    )
  const totalSaved = items.reduce((total, goal) => total + goal.saved, 0)
  const totalTarget = items.reduce((total, goal) => total + goal.target, 0)
  const overall = totalTarget
    ? Math.round((totalSaved / totalTarget) * 100)
    : 0
  return (
    <>
      <Header title="Metas" subtitle="Transforme seus planos em conquistas." />
      <div className="page-content">
        <div className="page-heading-actions">
          <div>
            <span className="month-label">SEUS OBJETIVOS</span>
            <h2 className="content-title">
              {money(totalSaved)}{" "}
              <small>
                economizados em {items.length}{" "}
                {items.length === 1 ? "meta" : "metas"}
              </small>
            </h2>
          </div>
          <Button onClick={() => setFormOpen(true)}>
            <Icon name="plus" size={18} /> Nova meta
          </Button>
        </div>
        {items.length ? (
          <div className="goals-grid">
            {items.map((goal) => {
              const percent = Math.round((goal.saved / goal.target) * 100)
              return (
                <Card className="goal-card" key={goal.id}>
                  <div className="goal-top">
                    <span className={`goal-icon ${goal.color}`}>
                      <Icon name={goal.icon} />
                    </span>
                    <div className="row-menu-wrap">
                      <button
                        className="more-button"
                        aria-label={`Opções para ${goal.name}`}
                        aria-haspopup="menu"
                        aria-expanded={openId === goal.id}
                        onClick={() =>
                          setOpenId(openId === goal.id ? null : goal.id)
                        }
                      >
                        •••
                      </button>
                      {openId === goal.id && (
                        <div className="row-menu" role="menu">
                          <button
                            role="menuitem"
                            onClick={() => {
                              setOpenId(null)
                              setEditing(goal)
                            }}
                          >
                            Editar
                          </button>
                          <button
                            role="menuitem"
                            className="danger"
                            onClick={() => {
                              setOpenId(null)
                              setDeleting(goal)
                            }}
                          >
                            Excluir
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <h3>{goal.name}</h3>
                  <div className="goal-amount">
                    <strong>{money(goal.saved)}</strong>
                    <span>de {money(goal.target)}</span>
                  </div>
                  <div className="progress">
                    <i
                      className={goal.color}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <div className="goal-meta">
                    <span>
                      <small>PROGRESSO</small>
                      <strong>{percent}%</strong>
                    </span>
                    <span>
                      <small>VALOR RESTANTE</small>
                      <strong>{money(goal.target - goal.saved)}</strong>
                    </span>
                    <span>
                      <small>PRAZO</small>
                      <strong>{goal.deadline}</strong>
                    </span>
                  </div>
                  <Button
                    variant="secondary"
                    onClick={() => registerProgress(goal)}
                  >
                    <Icon name="plus" size={17} /> Registrar progresso
                  </Button>
                </Card>
              )
            })}
          </div>
        ) : (
          <div className="empty-state">
            Nenhuma meta ainda. Clique em "Nova meta" para começar.
          </div>
        )}
        <Card className="goals-summary">
          <div className="summary-illustration">
            <Icon name="goal" size={34} />
          </div>
          <div>
            <span>Progresso geral</span>
            <strong>{overall}% do valor total das metas alcançado</strong>
            <p>Continue assim! Você está cada vez mais perto.</p>
          </div>
          <div className="summary-number">
            <strong>{money(totalSaved)}</strong>
            <span>de {money(totalTarget)}</span>
          </div>
        </Card>
      </div>
      {(formOpen || editing) && (
        <div className="modal-backdrop" onMouseDown={closeForm}>
          <Card className="modal">
            <div onMouseDown={(e) => e.stopPropagation()}>
              <SectionTitle
                title={editing ? "Editar meta" : "Nova meta"}
                action={
                  <button className="icon-button" onClick={closeForm}>
                    <Icon name="x" />
                  </button>
                }
              />
              <form
                key={editing ? editing.id : "new"}
                onSubmit={(e) => {
                  e.preventDefault()
                  const form = new FormData(e.currentTarget)
                  const target = Math.abs(parseMoney(form.get("target")))
                  const savedValue = Math.abs(parseMoney(form.get("saved")))
                  if (!target) return
                  const [year, month] = String(
                    form.get("deadline") ?? "2027-12",
                  ).split("-")
                  const goal: Goal = {
                    id: editing ? editing.id : Date.now(),
                    name: String(form.get("name")),
                    icon: editing ? editing.icon : "goal",
                    saved: Math.min(savedValue || 0, target),
                    target,
                    deadline: `${monthNames[month] ?? "Dez"} ${year}`,
                    color: editing
                      ? editing.color
                      : items.length % 2 === 0
                        ? "green"
                        : "blue",
                  }
                  setItems((current) =>
                    editing
                      ? current.map((item) =>
                          item.id === goal.id ? goal : item,
                        )
                      : [...current, goal],
                  )
                  setToast({
                    title: editing ? "Meta atualizada" : "Meta criada",
                    text: `${goal.name} foi ${editing ? "atualizada" : "adicionada"} com sucesso.`,
                  })
                  closeForm()
                }}
              >
                <Field
                  label="Nome da meta"
                  name="name"
                  placeholder="Ex.: Comprar um notebook"
                  defaultValue={editing?.name ?? ""}
                  required
                />
                <div className="two-fields">
                  <Field
                    label="Valor da meta"
                    name="target"
                    inputMode="decimal"
                    placeholder="R$ 0,00"
                    defaultValue={editing ? toInputValue(editing.target) : ""}
                    required
                  />
                  <Field
                    label="Já guardado"
                    name="saved"
                    inputMode="decimal"
                    placeholder="R$ 0,00"
                    defaultValue={editing ? toInputValue(editing.saved) : "0,00"}
                  />
                </div>
                <Field
                  label="Prazo"
                  name="deadline"
                  type="month"
                  defaultValue={
                    editing ? toMonthInput(editing.deadline) : "2027-12"
                  }
                  required
                />
                <div className="modal-actions">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={closeForm}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">
                    {editing ? "Salvar alterações" : "Criar meta"}
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}
      {deleting && (
        <div className="modal-backdrop" onMouseDown={() => setDeleting(null)}>
          <Card className="modal">
            <div
              role="dialog"
              aria-label="Excluir meta"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <SectionTitle title="Excluir meta" />
              <p style={{ margin: "8px 0 22px", color: "#64727b" }}>
                Excluir a meta "{deleting.name}"? Essa ação não pode ser
                desfeita.
              </p>
              <div className="modal-actions">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setDeleting(null)}
                >
                  Cancelar
                </Button>
                <Button
                  type="button"
                  style={{ background: "#b45309" }}
                  onClick={() => {
                    setItems((current) =>
                      current.filter((item) => item.id !== deleting.id),
                    )
                    setToast({
                      title: "Meta excluída",
                      text: `${deleting.name} foi removida.`,
                    })
                    setDeleting(null)
                  }}
                >
                  Excluir
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
      {toast && (
        <div className="toast">
          <span className="toast-check">
            <Icon name="check" size={16} />
          </span>
          <div>
            <strong>{toast.title}</strong>
            <p>{toast.text}</p>
          </div>
          <button onClick={() => setToast(null)}>
            <Icon name="x" size={17} />
          </button>
        </div>
      )}
    </>
  )
}

function DonutChart() {
  return (
    <div className="donut-wrap">
      <div className="donut">
        <div>
          <strong>R$ 6.284</strong>
          <span>Total gasto</span>
        </div>
      </div>
      <div className="donut-legend">
        {[
          ["Moradia", "38,3%", "green"],
          ["Alimentação", "27,2%", "orange"],
          ["Transporte", "11,5%", "blue"],
          ["Compras", "7,8%", "purple"],
          ["Outras", "15,2%", "gray"],
        ].map(([name, value, color]) => (
          <div key={name}>
            <span>
              <i className={`dot ${color}-dot`} />
              {name}
            </span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
    </div>
  )
}

function Reports({ items }: { items: Transaction[] }) {
  const totals = summary(items)
  const deltas = [
    {
      label: "Receitas",
      value: totals.income,
      diff: round2(totals.income - totals.prevIncome),
      up: true,
    },
    {
      label: "Despesas",
      value: totals.expense,
      diff: round2(totals.expense - totals.prevExpense),
      up: false,
    },
    {
      label: "Economia",
      value: totals.period,
      diff: round2(totals.period - totals.prevPeriod),
      up: true,
    },
  ].map((item) => ({
    ...item,
    good: item.up ? item.diff >= 0 : item.diff <= 0,
  }))
  return (
    <>
      <Header
        title="Relatórios"
        subtitle="Entenda seus hábitos e acompanhe sua evolução financeira."
      />
      <div className="page-content">
        <div className="page-heading-actions report-filters">
          <div className="segmented">
            <button className="active">Mensal</button>
            <button>Anual</button>
          </div>
          <Select defaultValue="out">
            <option value="out">Outubro de 2026</option>
            <option value="set">Setembro de 2026</option>
          </Select>
        </div>
        <div className="stats-grid report-stats">
          <StatCard
            label="Receitas totais"
            value={money(totals.income)}
            trend={pct(totals.income, totals.prevIncome)}
            icon="arrow-up"
          />
          <StatCard
            label="Despesas totais"
            value={money(totals.expense)}
            trend={pct(totals.expense, totals.prevExpense)}
            icon="arrow-down"
            tone="orange"
          />
          <StatCard
            label="Saldo do período"
            value={moneySigned(totals.period)}
            trend={pct(totals.period, totals.prevPeriod)}
            icon="wallet"
          />
        </div>
        <div className="reports-grid">
          <Card>
            <SectionTitle
              title="Receitas x despesas"
              action={<span className="comparison">Comparativo mensal</span>}
            />
            <div className="line-chart">
              <div className="axis-labels">
                <span>R$ 12 mil</span>
                <span>R$ 8 mil</span>
                <span>R$ 4 mil</span>
                <span>R$ 0</span>
              </div>
              <svg viewBox="0 0 620 210" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="reportArea" x1="0" y1="0" x2="0" y2="1">
                    <stop stopColor="#0f766e" stopOpacity=".16" />
                    <stop offset="1" stopColor="#0f766e" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  className="grid-line"
                  d="M0 15H620M0 75H620M0 135H620M0 195H620"
                />
                <path
                  className="report-area"
                  d="M0 120 C80 113 102 96 155 101 S244 66 310 82 S411 54 465 61 S550 29 620 37 V195H0Z"
                />
                <path
                  className="income-line"
                  d="M0 120 C80 113 102 96 155 101 S244 66 310 82 S411 54 465 61 S550 29 620 37"
                />
                <path
                  className="expense-line"
                  d="M0 148 C67 138 100 145 155 132 S252 125 310 139 S402 111 465 118 S552 102 620 109"
                />
              </svg>
              <div className="chart-months">
                <span>Mai</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Ago</span>
                <span>Set</span>
                <span>Out</span>
              </div>
            </div>
            <div className="chart-legend centered">
              <span>
                <i className="dot green-dot" />
                Receitas
              </span>
              <span>
                <i className="dot orange-dot" />
                Despesas
              </span>
            </div>
          </Card>
          <Card>
            <SectionTitle title="Gastos por categoria" />
            <DonutChart />
          </Card>
          <Card className="comparison-card">
            <SectionTitle title="Comparação com setembro" />
            <div className="comparison-grid">
              {deltas.map((item) => (
                <div key={item.label}>
                  <span>{item.label}</span>
                  <strong>{moneySigned(item.value)}</strong>
                  <small className={item.good ? "positive" : "negative"}>
                    <Icon
                      name={item.diff >= 0 ? "arrow-up" : "arrow-down"}
                      size={14}
                    />{" "}
                    {money(item.diff)}
                  </small>
                </div>
              ))}
            </div>
          </Card>
          <Card className="report-score">
            <div className="score-copy">
              <span className="month-label">SCORE FINANCEIRO</span>
              <h3>Suas finanças estão saudáveis</h3>
              <p>
                Você evoluiu em organização e economia neste mês. Mantenha a
                consistência para chegar ainda mais longe.
              </p>
              <span className="score-status">
                <Icon name="arrow-up" size={15} /> 6 pontos desde setembro
              </span>
            </div>
            <div className="mini-score">
              <strong>82</strong>
              <span>/ 100</span>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("login")
  const [transactionItems, setTransactionItems] =
    useState<Transaction[]>(transactions)
  const [budgetItems, setBudgetItems] = useState<Budget[]>(initialBudgets)
  const [goalItems, setGoalItems] = useState<Goal[]>(initialGoals)
  if (screen === "login")
    return <Login onLogin={() => setScreen("dashboard")} />
  return (
    <div className="app-shell">
      <Sidebar screen={screen} setScreen={setScreen} />
      <main className="main-area">
        {screen === "dashboard" && (
          <Dashboard navigate={setScreen} items={transactionItems} />
        )}
        {screen === "transactions" && (
          <Transactions
            items={transactionItems}
            setItems={setTransactionItems}
          />
        )}
        {screen === "budgets" && (
          <Budgets
            items={budgetItems}
            setItems={setBudgetItems}
            transactionItems={transactionItems}
          />
        )}
        {screen === "goals" && (
          <Goals items={goalItems} setItems={setGoalItems} />
        )}
        {screen === "reports" && <Reports items={transactionItems} />}
      </main>
    </div>
  )
}

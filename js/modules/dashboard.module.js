import { getTasks, getTransactions } from "../services/storage.service.js"
import { isTaskOverdue } from "./tasks.module.js"

function money(value) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 2,
  }).format(value)
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

function formatDate(value) {
  if (!value) return ""
  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`))
}

function renderMetrics() {
  const transactions = getTransactions()
  const tasks = getTasks()
  const income = transactions.filter((item) => item.type === "income").reduce((sum, item) => sum + item.amount, 0)
  const expense = transactions.filter((item) => item.type === "expense").reduce((sum, item) => sum + item.amount, 0)
  const pending = tasks.filter((task) => task.status !== "completed").length
  const overdue = tasks.filter(isTaskOverdue).length

  const elBalance = document.querySelector("#metric-balance")
  if (elBalance) elBalance.textContent = money(income - expense)

  const elIncome = document.querySelector("#metric-income")
  if (elIncome) elIncome.textContent = money(income)

  const elExpense = document.querySelector("#metric-expense")
  if (elExpense) elExpense.textContent = money(expense)

  const elPending = document.querySelector("#metric-pending")
  if (elPending) elPending.textContent = pending

  const elOverdue = document.querySelector("#metric-overdue")
  if (elOverdue) elOverdue.textContent = overdue

  const elTotalTasks = document.querySelector("#analytics-total-tasks")
  if (elTotalTasks) elTotalTasks.textContent = tasks.length

  const elCompleted = document.querySelector("#analytics-completed")
  if (elCompleted) elCompleted.textContent = tasks.filter((task) => task.status === "completed").length

  const elSavingRate = document.querySelector("#analytics-saving-rate")
  if (elSavingRate) elSavingRate.textContent = income > 0 ? `${Math.round(((income - expense) / income) * 100)}%` : "0%"

  const expenseByCategory = transactions
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.amount
      return acc
    }, {})
  const topCategory = Object.entries(expenseByCategory).sort((a, b) => b[1] - a[1])[0]
  const elTopCategory = document.querySelector("#analytics-top-category")
  if (elTopCategory) elTopCategory.textContent = topCategory ? topCategory[0] : "Sin datos"
}

function renderUpcomingTasks() {
  const container = document.querySelector("#dashboard-task-list")
  if (!container) return

  const tasks = getTasks()
    .filter((task) => task.status !== "completed")
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 4)

  if (!tasks.length) {
    container.innerHTML = '<div class="empty-state">No tienes tareas pendientes.</div>'
    return
  }

  container.innerHTML = tasks
    .map(
      (task) => `
    <article class="list-item">
      <div class="list-item-main">
        <p class="list-item-title">${escapeHtml(task.title)}</p>
        <p class="list-item-meta">${escapeHtml(task.category)} · ${formatDate(task.dueDate)}</p>
      </div>
      <span class="badge ${isTaskOverdue(task) ? "badge-overdue" : `badge-${task.priority}`}">${isTaskOverdue(task) ? "Vencida" : task.priority}</span>
    </article>
  `
    )
    .join("")
}

export function refreshDashboard() {
  renderMetrics()
  renderUpcomingTasks()
}

export function renderDashboardVisual() {
  refreshDashboard()
}

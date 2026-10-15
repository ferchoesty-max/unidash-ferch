import { getTasks, saveTasks } from "../services/storage.service.js"

const priorityLabels = {
  low: "Baja",
  medium: "Media",
  high: "Alta",
}

let onChange = () => {}

const todayISO = () => {
  const date = new Date()
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
}

export function isTaskOverdue(task) {
  return task.status !== "completed" && task.dueDate < todayISO()
}
export const isTaskOverDue = isTaskOverdue

function taskBadge(task) {
  if (task.status === "completed") {
    return `<span class="badge badge-completed">Completada</span>`
  }
  if (isTaskOverdue(task)) {
    return `<span class="badge badge-overdue">Vencida</span>`
  }
  return `<span class="badge badge-${task.priority}">${priorityLabels[task.priority] || task.priority}</span>`
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

const renderTaskList = (filter = "all") => {
  const container = document.querySelector("#task-list")
  if (!container) return

  const tasks = getTasks()
    .filter((task) => {
      if (filter === "all") return true
      if (filter === "completed") return task.status === "completed"
      if (filter === "pending") return task.status !== "completed" && !isTaskOverdue(task)
      if (filter === "overdue") return isTaskOverdue(task)
      return true
    })
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))

  if (!tasks.length) {
    container.innerHTML = `<div class="empty-state">No hay tareas para el filtro</div>`
    return
  }

  container.innerHTML = tasks
    .map(
      (task) => `
    <article class="list-item">
      <div class="list-item-main">
        <div class="flex flex-wrap items-center gap-2">
          <p class="list-item-title">${escapeHtml(task.title)}</p>
          ${taskBadge(task)}
        </div>
        <p class="list-item-meta">
          ${escapeHtml(task.category)} · Vence ${formatDate(task.dueDate)}
        </p>
        ${task.description ? `<p class="list-item-description">${escapeHtml(task.description)}</p>` : ""}
      </div>
      <div class="list-actions">
        <button class="mini-button" data-task-action="toggle" data-id="${task.id}">
          ${task.status === "completed" ? "Reabrir" : "Completar"}
        </button>
        <button class="mini-button" data-task-action="edit" data-id="${task.id}">
          Editar
        </button>
        <button class="mini-button" data-task-action="delete" data-id="${task.id}">
          Eliminar
        </button>
      </div>
    </article>`
    )
    .join("")
}

export function renderDashboardTasks() {
  const upcoming = document.querySelector("#dashboard-task-list")
  if (!upcoming) return

  const tasks = getTasks()
    .filter((t) => t.status !== "completed")
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 4)

  if (!tasks.length) {
    upcoming.innerHTML = `<div class="empty-state">No hay tareas pendientes</div>`
    return
  }

  upcoming.innerHTML = tasks
    .map(
      (task) => `
    <article class="list-item">
      <div class="list-item-main">
        <p class="list-item-title">${escapeHtml(task.title)}</p>
        <p class="list-item-meta">${escapeHtml(task.category)} · Vence ${formatDate(task.dueDate)}</p>
      </div>
      ${taskBadge(task)}
    </article>`
    )
    .join("")
}

function resetForm() {
  const form = document.querySelector("#task-form")
  if (form) form.reset()

  const idInput = document.querySelector("#task-id")
  if (idInput) idInput.value = ""

  const submitBtn = document.querySelector("#task-submit-button")
  if (submitBtn) submitBtn.textContent = "Guardar tarea"

  const cancelBtn = document.querySelector("#task-cancel-button")
  if (cancelBtn) cancelBtn.classList.add("hidden")

  const dateInput = document.querySelector("#task-due-date")
  if (dateInput) dateInput.value = todayISO()
}

function startEdit(taskId) {
  const task = getTasks().find((item) => item.id === taskId)
  if (!task) return

  document.querySelector("#task-id").value = task.id
  document.querySelector("#task-title").value = task.title
  document.querySelector("#task-description").value = task.description || ""
  document.querySelector("#task-category").value = task.category
  document.querySelector("#task-priority").value = task.priority
  document.querySelector("#task-due-date").value = task.dueDate
  document.querySelector("#task-submit-button").textContent = "Actualizar tarea"
  document.querySelector("#task-cancel-button").classList.remove("hidden")
  document.querySelector("#task-title").focus()
}

function saveTask(event) {
  event.preventDefault()

  const id = document.querySelector("#task-id").value
  const tasks = getTasks()
  const taskData = {
    title: document.querySelector("#task-title").value.trim(),
    description: document.querySelector("#task-description").value.trim(),
    category: document.querySelector("#task-category").value,
    priority: document.querySelector("#task-priority").value,
    dueDate: document.querySelector("#task-due-date").value,
  }

  if (!taskData.title || !taskData.dueDate) return

  if (id) {
    const index = tasks.findIndex((task) => task.id === id)
    if (index >= 0) {
      tasks[index] = { ...tasks[index], ...taskData }
    }
  } else {
    tasks.push({
      id: crypto.randomUUID(),
      ...taskData,
      status: "pending",
      createdAt: new Date().toISOString(),
    })
  }

  saveTasks(tasks)
  resetForm()
  refreshTasks()
  onChange(getTasks())
}

function handleTaskAction(event) {
  const button = event.target.closest("[data-task-action]")
  if (!button) return

  const { taskAction, id } = button.dataset
  const tasks = getTasks()
  const task = tasks.find((item) => item.id === id)
  if (!task && taskAction !== "delete") return

  if (taskAction === "toggle") {
    task.status = task.status === "completed" ? "pending" : "completed"
    saveTasks(tasks)
  }

  if (taskAction === "delete") {
    saveTasks(tasks.filter((item) => item.id !== id))
  }

  if (taskAction === "edit") {
    startEdit(id)
    return
  }

  refreshTasks()
  onChange(getTasks())
}

export function refreshTasks() {
  const filter = document.querySelector("#task-filter")?.value || "all"
  renderTaskList(filter)
  renderDashboardTasks()
}

export function initTasksModule(callback = () => {}) {
  onChange = typeof callback === "function" ? callback : () => {}

  const form = document.querySelector("#task-form")
  const list = document.querySelector("#task-list")
  const filter = document.querySelector("#task-filter")
  const cancelBtn = document.querySelector("#task-cancel-button")

  if (form) form.addEventListener("submit", saveTask)
  if (list) list.addEventListener("click", handleTaskAction)
  if (filter) filter.addEventListener("change", refreshTasks)
  if (cancelBtn) cancelBtn.addEventListener("click", resetForm)

  resetForm()
  refreshTasks()
}

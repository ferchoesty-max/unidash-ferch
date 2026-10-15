const STORAGE_KEYS = {
  tasks: "unidash360.tasks",
  transactions: "unidash360.transactions",
  preferences: "unidash360.preferences",
  tasksSeeded: "unidash360.tasksSeeded",
  transactionsSeeded: "unidash360.transactionsSeeded",
}

const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

const write = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getTasks() {
  const data = read(STORAGE_KEYS.tasks, [])
  return Array.isArray(data) ? data : []
}

export function saveTasks(tasks) {
  write(STORAGE_KEYS.tasks, tasks)
}

export function getTransactions() {
  const data = read(STORAGE_KEYS.transactions, [])
  return Array.isArray(data) ? data : []
}

export function saveTransactions(transactions) {
  write(STORAGE_KEYS.transactions, transactions)
}

export function getPreferences() {
  return read(STORAGE_KEYS.preferences, {
    baseCurrency: "MXN",
    newsCategory: "general",
    location: null,
  })
}

export function savePreferences(preferences) {
  write(STORAGE_KEYS.preferences, preferences)
}

export function seedDemoData() {
  const today = new Date()
  const localDate = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`

  const addDays = (days) => {
    const date = new Date(today)
    date.setDate(date.getDate() + days)
    return localDate(date)
  }

  const existingTasks = localStorage.getItem(STORAGE_KEYS.tasks)
  const tasksCorrupted = existingTasks === "true" || !Array.isArray(getTasks()) || getTasks().length === 0

  if (!localStorage.getItem(STORAGE_KEYS.tasksSeeded) || tasksCorrupted) {
    saveTasks([
      {
        id: crypto.randomUUID(),
        title: "Entregar avance de proyecto",
        description: "Revisar documentación y subir repositorio.",
        category: "Universidad",
        priority: "high",
        status: "pending",
        dueDate: addDays(2),
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        title: "Estudiar para examen",
        description: "Repasar unidades 2 y 3.",
        category: "Universidad",
        priority: "medium",
        status: "pending",
        dueDate: addDays(5),
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        title: "Actualizar CV",
        description: "Agregar proyecto más reciente.",
        category: "Personal",
        priority: "low",
        status: "completed",
        dueDate: addDays(-1),
        createdAt: new Date().toISOString(),
      },
    ])
    localStorage.setItem(STORAGE_KEYS.tasksSeeded, "true")
  }

  const existingTx = localStorage.getItem(STORAGE_KEYS.transactions)
  const txCorrupted = existingTx === "true" || !Array.isArray(getTransactions()) || getTransactions().length === 0

  if (!localStorage.getItem(STORAGE_KEYS.transactionsSeeded) || txCorrupted) {
    const currentMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`

    saveTransactions([
      {
        id: crypto.randomUUID(),
        description: "Beca",
        type: "income",
        amount: 4500,
        category: "Beca",
        date: `${currentMonth}-03`,
      },
      {
        id: crypto.randomUUID(),
        description: "Freelance",
        type: "income",
        amount: 3200,
        category: "Trabajo",
        date: `${currentMonth}-11`,
      },
      {
        id: crypto.randomUUID(),
        description: "Comida",
        type: "expense",
        amount: 860,
        category: "Comida",
        date: `${currentMonth}-08`,
      },
      {
        id: crypto.randomUUID(),
        description: "Transporte",
        type: "expense",
        amount: 520,
        category: "Transporte",
        date: `${currentMonth}-14`,
      },
      {
        id: crypto.randomUUID(),
        description: "Suscripciones",
        type: "expense",
        amount: 399,
        category: "Suscripciones",
        date: `${currentMonth}-18`,
      },
    ])
    localStorage.setItem(STORAGE_KEYS.transactionsSeeded, "true")
  }
}
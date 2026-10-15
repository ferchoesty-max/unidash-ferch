# UniDash 360 — Finance module

[📘 Sesión](./README.md) · [📚 Documentación](../README.md)

---

Render visual de movimientos financieros.

**Ruta:** `js/modules/finance.module.js`

```javascript
import { mockTransactions } from "../data/mock.data.js"

function money(value) {
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(value)
}

export function renderFinanceVisual() {
  const list = document.querySelector("#transaction-list")
  list.innerHTML = mockTransactions.map((item) => `
    <article class="list-item">
      <div class="list-item-main"><p class="list-item-title">${item.description}</p><p class="list-item-meta">${item.category} · ${item.date}</p></div>
      <strong class="${item.type === "income" ? "text-emerald-400" : "text-rose-400"}">${item.type === "income" ? "+" : "-"}${money(item.amount)}</strong>
    </article>`).join("")
}

export function initFinanceVisualDemo() {
  renderFinanceVisual()
  document.querySelector("#transaction-form")?.addEventListener("submit", (event) => {
    event.preventDefault()
    alert("Sesión 1: el formulario ya está diseñado. La persistencia se implementa en la Sesión 2.")
  })
}
```

## Validación rápida

1. Guarda el archivo exactamente en la ruta indicada.
2. Recarga Live Server.
3. Revisa DevTools y confirma que no existen errores en consola.

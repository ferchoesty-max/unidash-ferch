# UniDash 360 — Charts module

[📘 Sesión](./README.md) · [📚 Documentación](../README.md)

---

Construye gráficas con Chart.js y series simuladas.

**Ruta:** `js/modules/charts.module.js`

```javascript
import { mockFinanceSeries, mockTransactions } from "../data/mock.data.js"
let dashboardChart, financeChart, expenseChart
const chartText = "#cbd5e1"
const grid = "rgba(148, 163, 184, 0.08)"

function baseOptions() { return { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: chartText } } }, scales: { x: { ticks:{color:chartText}, grid:{display:false} }, y:{ticks:{color:chartText},grid:{color:grid}} } } }

function createOrReplace(current, canvas, config) { if (current) current.destroy(); return new Chart(canvas, config) }

export function renderVisualCharts() {
  const barData = { labels: mockFinanceSeries.labels, datasets: [ { label:"Ingresos", data:mockFinanceSeries.income, backgroundColor:"rgba(34,211,238,.72)" }, { label:"Egresos", data:mockFinanceSeries.expense, backgroundColor:"rgba(244,63,94,.72)" } ] }
  dashboardChart = createOrReplace(dashboardChart, document.querySelector("#dashboard-finance-chart"), { type:"bar", data:barData, options:baseOptions() })
  financeChart = createOrReplace(financeChart, document.querySelector("#monthly-finance-chart"), { type:"line", data:{ labels:mockFinanceSeries.labels, datasets:[ {label:"Ingresos",data:mockFinanceSeries.income,borderColor:"#22d3ee",tension:.3}, {label:"Egresos",data:mockFinanceSeries.expense,borderColor:"#fb7185",tension:.3} ] }, options:baseOptions() })
  const expenses = mockTransactions.filter((x)=>x.type === "expense")
  const grouped = expenses.reduce((acc,x)=>{acc[x.category]=(acc[x.category]||0)+x.amount;return acc},{})
  expenseChart = createOrReplace(expenseChart, document.querySelector("#expense-category-chart"), { type:"doughnut", data:{labels:Object.keys(grouped),datasets:[{data:Object.values(grouped)}]}, options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:chartText}}}} })
}
```

## Validación rápida

1. Guarda el archivo exactamente en la ruta indicada.
2. Recarga Live Server.
3. Revisa DevTools y confirma que no existen errores en consola.

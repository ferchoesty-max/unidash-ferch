# UniDash 360 — App JS

[📘 Sesión](./README.md) · [📚 Documentación](../README.md)

---

Bootstrap y navegación principal.

**Ruta:** `sesion-01-v0.1.0/js/app.js`

```javascript
import { initTasksVisualDemo } from "./modules/tasks.module.js"
import { initFinanceVisualDemo } from "./modules/finance.module.js"
import { renderDashboardVisual } from "./modules/dashboard.module.js"
import { renderVisualCharts } from "./modules/charts.module.js"
import { initExternalVisualDemo } from "./modules/external.module.js"

const viewTitles={dashboard:["Resumen visual","Dashboard"],tasks:["Componente visual","Tareas"],finance:["Componente visual","Finanzas"],analytics:["Visualización","Estadísticas"],currency:["Componente visual","Divisas"],news:["Componente visual","Noticias"]}
function showView(name){document.querySelectorAll(".view-section").forEach(s=>s.classList.remove("active"));document.querySelector(`#view-${name}`)?.classList.add("active");document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.view===name));const [e,t]=viewTitles[name]||viewTitles.dashboard;document.querySelector("#page-eyebrow").textContent=e;document.querySelector("#page-title").textContent=t;document.querySelector("#sidebar").classList.remove("open")}
function initNavigation(){document.querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",()=>showView(b.dataset.view)));document.querySelectorAll("[data-go-view]").forEach(b=>b.addEventListener("click",()=>showView(b.dataset.goView)));document.querySelector("#mobile-menu-button").addEventListener("click",()=>document.querySelector("#sidebar").classList.toggle("open"))}
function bootstrap(){initNavigation();initTasksVisualDemo();initFinanceVisualDemo();renderDashboardVisual();renderVisualCharts();initExternalVisualDemo();document.querySelector("#toast").textContent="Sesión 1 · UI completa con datos mock"}
bootstrap()
```

## Validación rápida

1. Guarda el archivo exactamente en la ruta indicada.
2. Recarga Live Server.
3. Revisa DevTools y confirma que no existen errores en consola.

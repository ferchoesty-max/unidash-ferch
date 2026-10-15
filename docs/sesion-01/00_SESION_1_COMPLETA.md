# UniDash 360 — Sesión 1 completa

[📘 Sesión 1](./README.md) · [📚 Documentación](../README.md)

## Objetivo

Construir el **100 % del contrato visual** de la aplicación. La sesión termina con una aplicación que parece completa, aunque todavía no persista ni consulte datos reales.

## Resultado esperado

- Sidebar responsive.
- Header y ubicación simulada.
- Dashboard con métricas.
- Formularios visuales de tareas y movimientos.
- Listas de tareas y finanzas.
- Estadísticas y gráficas.
- Widget de clima simulado.
- Tipos de cambio simulados.
- Histórico visual de divisas.
- Noticias simuladas.
- Navegación entre todas las vistas.

## Flujo

```text
mock.data.js
   ├── tasks.module.js
   ├── finance.module.js
   ├── dashboard.module.js
   ├── charts.module.js
   └── external.module.js
              ↓
            app.js
              ↓
             DOM
```

## Distribución sugerida

| Tiempo | Actividad |
|---:|---|
| 0–15 min | estructura + AppShell + navegación |
| 15–40 min | dashboard + tareas + finanzas |
| 40–60 min | divisas + noticias + clima |
| 60–75 min | Chart.js + mock data |
| 75–90 min | responsive + Git + validación |

## Rama

```bash
git checkout -b feature/unidash-session-01-ui
```

## Commit final

```bash
git add .
git commit -m "feat: build complete UniDash visual interface with mock data"
git tag -a v0.1.0 -m "UniDash 360 session 1 UI first"
```

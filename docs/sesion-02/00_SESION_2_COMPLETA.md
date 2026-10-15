# UniDash 360 — Sesión 2 completa

## Objetivo

Reemplazar el origen mock de **tareas y finanzas** por una capa local persistente sin modificar el diseño construido en la sesión anterior.

## Evolución

```text
Sesión 1                 Sesión 2
mockTasks       ───────► LocalStorage.tasks
mockTransactions ──────► LocalStorage.transactions
                            │
                    ┌───────┴────────┐
                    ▼                ▼
                 Dashboard         Charts
```

Divisas, clima y noticias continúan en modo mock y serán sustituidos en Sesión 3.

## Funcionalidad nueva

- Crear, editar, completar y eliminar tareas.
- Filtrar tareas.
- Registrar ingresos y egresos.
- Eliminar movimientos.
- Recalcular balance y métricas.
- Recalcular gráficas.
- Conservar información después de recargar.

## Rama

```bash
git checkout -b feature/unidash-session-02-local-state
```

## Commit

```bash
git add .
git commit -m "feat: connect tasks and finance modules to local storage"
git tag -a v0.2.0 -m "UniDash 360 session 2 local persistence"
```

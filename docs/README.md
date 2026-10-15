# UniDash 360 — Documentación

[⬅ Proyecto](../README.md) · [🏠 Índice general](../../../README.md)

---

## Ruta de aprendizaje

### Sesión 1 — UI completa antes de las conexiones

Construimos AppShell, Sidebar, Header, Dashboard, formularios, listas, widgets, gráficas y vistas completas con datos mock. **No LocalStorage. No Fetch. No geolocalización.**

[📘 Abrir Sesión 1](./sesion-01/README.md)

### Sesión 2 — Estado local y persistencia

Los mismos componentes dejan de depender de mocks para tareas y finanzas. Se implementan CRUD, LocalStorage y métricas calculadas. Divisas, clima y noticias continúan simuladas.

[📘 Abrir Sesión 2](./sesion-02/README.md)

### Sesión 3 — APIs reales

Los widgets externos conservan su interfaz y cambian su fuente de datos: Browser Geolocation + BigDataCloud + Open-Meteo + Frankfurter + GNews.

[📘 Abrir Sesión 3](./sesion-03/README.md)

## Arquitectura evolutiva

```text
Componentes UI
     │
     ├── Sesión 1 → mock.data.js
     │
     ├── Sesión 2 → LocalStorage (tareas + finanzas)
     │
     └── Sesión 3 → REST APIs (ubicación + clima + divisas + noticias)
```

La regla central es: **el componente no se rediseña porque cambie la fuente de datos**.

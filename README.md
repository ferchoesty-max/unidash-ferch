# UniDash 360

[⬅ Índice general](../../README.md) · [📚 Documentación](./docs/README.md)

---

## Dashboard personal universitario

**Duración:** 3 sesiones de 1 hora 30 minutos  
**Estrategia:** UI-first + integración evolutiva  
**Versión final:** `v1.0.0`

UniDash 360 concentra en una sola aplicación:

- tareas;
- ingresos y egresos;
- estadísticas;
- tipos de cambio;
- conversor de divisas;
- ubicación;
- clima;
- noticias recientes.

![Referencia visual de UniDash 360](./docs/assets/unidash360-ui-componentes.png)

## Principio del proyecto

No se inicia conectando APIs. Primero se construye **todo lo que el usuario verá** y se define el contrato visual de cada componente. Después se reemplazan progresivamente los datos simulados por datos persistidos y finalmente por información remota.

```text
SESIÓN 1
UI completa + componentes + datos mock
             ↓
SESIÓN 2
CRUD + estado local + LocalStorage + gráficas calculadas
             ↓
SESIÓN 3
Geolocalización + Open-Meteo + Frankfurter + GNews
```

## Sesiones

| Sesión | Versión | Enfoque | Resultado |
|---:|---|---|---|
| 1 | `v0.1.0` | Todo lo visual | App completa navegable con datos mock |
| 2 | `v0.2.0` | Conexiones locales | Tareas y finanzas reales en LocalStorage |
| 3 | `v1.0.0` | Conexiones externas | Ubicación, clima, divisas y noticias reales |

[▶ Iniciar documentación](./docs/README.md)

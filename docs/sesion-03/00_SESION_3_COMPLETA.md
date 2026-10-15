# UniDash 360 — Sesión 3 completa

## Objetivo

Cambiar la fuente de los widgets externos sin alterar su interfaz.

```text
ANTES                         DESPUÉS
mockLocation     ───────────► navigator.geolocation + BigDataCloud
mockWeather      ───────────► Open-Meteo
mockRates        ───────────► Frankfurter
mockCurrencyHistory ────────► Frankfurter histórico
mockNews         ───────────► GNews
```

## Conceptos

- `fetch`;
- `async/await`;
- query strings;
- códigos HTTP;
- errores de red;
- fallback;
- API key;
- adaptación de respuestas;
- actualización del DOM con datos remotos.

## Rama y versión

```bash
git checkout -b feature/unidash-session-03-apis
git add .
git commit -m "feat: connect UniDash widgets to public APIs"
git tag -a v1.0.0 -m "UniDash 360 complete"
```

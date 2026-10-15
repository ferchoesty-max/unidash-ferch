# APIs y contratos

| Necesidad | Fuente | Credencial |
|---|---|---|
| Coordenadas | Browser Geolocation | No |
| Ciudad/país | BigDataCloud reverse-geocode-client | No |
| Clima | Open-Meteo | No |
| Divisas e histórico | Frankfurter v2 | No |
| Noticias | GNews | Sí |

## Flujo

```text
Usuario permite ubicación
          ↓
latitude / longitude
          ↓
BigDataCloud ──► ciudad + país + countryCode
          │
          ├────► Open-Meteo ──► clima
          │
          ├────► countryCode ──► moneda base
          │                         ↓
          │                    Frankfurter
          │
          └────► countryCode + idioma ──► GNews
```

## Fallback

Si el usuario rechaza GPS, la implementación intenta una ubicación aproximada usando el endpoint cliente de BigDataCloud.

# Validación — Sesión 1

- [ ] Todas las vistas existen desde el menú.
- [ ] Dashboard tiene contenido.
- [ ] Tareas muestran registros mock.
- [ ] Finanzas muestran movimientos mock.
- [ ] Gráficas aparecen.
- [ ] Clima indica DEMO.
- [ ] Divisas muestran valores DEMO.
- [ ] Noticias están marcadas como simuladas.
- [ ] No existe `localStorage.setItem` en el código de la sesión.
- [ ] No existe `fetch(` en el código de la sesión.
- [ ] No existen errores de consola.
- [ ] Responsive correcto.

### Comprobación rápida

```bash
grep -R "fetch(" js || true
grep -R "localStorage" js || true
```

Ambas búsquedas deben quedar vacías en la Sesión 1.

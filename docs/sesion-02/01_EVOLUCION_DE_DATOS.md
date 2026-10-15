# Evolución de datos

## Antes

```javascript
import { mockTasks } from "../data/mock.data.js"
```

## Después

```javascript
import { getTasks, saveTasks } from "../services/storage.service.js"
```

El componente visual sigue usando objetos con `title`, `category`, `priority`, `status` y `dueDate`. Cambia únicamente la fuente y las operaciones CRUD.

### Módulos que ya son “reales”

- tareas;
- finanzas;
- métricas del dashboard;
- gráficas derivadas.

### Módulos que siguen mock

- ubicación;
- clima;
- divisas;
- noticias.

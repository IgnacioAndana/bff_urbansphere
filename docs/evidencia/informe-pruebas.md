# Informe de pruebas — BFF UrbanSphere

> Generado automáticamente el **2026-07-05 20:27:20 UTC**.  
> Comando: `npm run test:report`

## Resumen ejecutivo

| Indicador | Valor |
|-----------|-------|
| Estado | **APROBADO** |
| Suites | 8 / 8 |
| Tests | 36 / 36 |
| Cobertura líneas (global) | **98.1%** (155/158) |
| Cobertura funciones (global) | 93.75% |
| Cobertura ramas (global) | 91.48% |

## Cobertura global

| Métrica | Porcentaje | Cubierto / Total |
|---------|------------|------------------|
| Statements | 98.25% | 169/172 |
| Branches | 91.48% | 43/47 |
| Functions | 93.75% | 30/32 |
| Lines | 98.1% | 155/158 |

## Cobertura por módulo (como reporte HTML de Jest)

| Módulo / capa | Statements | Branches | Functions | Lines |
|---------------|------------|----------|-----------|-------|
| `common/filters/filtro-excepciones-http.filter.ts` | 100% | 83.33% | 100% | 100% |
| `common/utils/es-multipart.util.ts` | 100% | 100% | 100% | 100% |
| `modules/agregacion/controllers` | 100% | 100% | 100% | 100% |
| `modules/agregacion/services` | 100% | 100% | 100% | 100% |
| `modules/project-images/controllers` | 100% | 100% | 100% | 100% |
| `modules/projects/controllers` | 100% | 100% | 100% | 100% |
| `modules/solicitudes-contacto/controllers` | 100% | 100% | 100% | 100% |
| `proxy/cliente-http-proxy.service.ts` | 95.52% | 91.89% | 75% | 95.38% |

## Cobertura por archivo

| Archivo | Statements | Branches | Functions | Lines |
|---------|------------|----------|-----------|-------|
| `common/filters/filtro-excepciones-http.filter.ts` | 100% | 83.33% | 100% | 100% |
| `common/utils/es-multipart.util.ts` | 100% | 100% | 100% | 100% |
| `modules/agregacion/controllers/agregacion.controller.ts` | 100% | 100% | 100% | 100% |
| `modules/agregacion/services/agregacion.service.ts` | 100% | 100% | 100% | 100% |
| `modules/project-images/controllers/proyecto-imagenes.controller.ts` | 100% | 100% | 100% | 100% |
| `modules/projects/controllers/proyectos.controller.ts` | 100% | 100% | 100% | 100% |
| `modules/solicitudes-contacto/controllers/solicitudes-contacto.controller.ts` | 100% | 100% | 100% | 100% |
| `proxy/cliente-http-proxy.service.ts` | 95.52% | 91.89% | 75% | 95.38% |

## Evidencia adicional

1. **Reporte HTML interactivo:** `coverage/lcov-report/index.html` (misma vista que Jest; ideal para capturas).
2. **JSON Jest:** `test-results/jest-results.json`
3. **JSON cobertura:** `coverage/coverage-summary.json`

## Alcance de las pruebas

- **Unitarias (Jest):** capa proxy HTTP, agregación de proyecto completo, controladores representativos (público/privado, multipart), utilidades y filtro de errores.
- **Fuera de alcance:** reglas de negocio de MS Usuarios y MS Proyectos (cubiertas en sus propios informes).

---

*Generado por `scripts/generar-informe-pruebas.mjs`*

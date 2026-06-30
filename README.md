# BFF UrbanSphere

Backend for Frontend (BFF) de la plataforma inmobiliaria **UrbanSphere**. Expone una API unificada en el puerto **3000** y actúa como proxy hacia **MS Usuarios** (3001) y **MS Proyectos** (3002).

| Dato | Valor |
|------|-------|
| Puerto por defecto | `3000` |
| Prefijo API | `/api` |
| Swagger | `/api/docs` |

---

## Requisitos previos

- **Node.js** 20+ (recomendado 22)
- **npm** 10+
- **MS Usuarios** corriendo en `http://localhost:3001`
- **MS Proyectos** corriendo en `http://localhost:3002`

---

## Configuración inicial

```bash
cd BFF_UrbanSphere
npm install
cp .env.example .env
```

Ejemplo de `.env`:

```env
PORT=3000
MS_USUARIOS_URL=http://localhost:3001
MS_PROYECTOS_URL=http://localhost:3002
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

---

## Cómo levantar el servicio

### Desarrollo

```bash
npm run start:dev
```

Salida esperada:

```text
BFF UrbanSphere en http://localhost:3000
Swagger: http://localhost:3000/api/docs
```

### Producción

```bash
npm run build
npm run start:prod
```

---

## Arquitectura

```text
Frontend (Vue/React)
        ↓
   BFF (puerto 3000)
    ↙         ↘
MS Usuarios   MS Proyectos
  (3001)         (3002)
```

El BFF **no tiene base de datos**. Reenvía las peticiones HTTP a los microservicios y propaga el header `Authorization: Bearer <token>`.

### Endpoints de agregación (valor añadido del BFF)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/agregacion/proyectos/:id/completo` | Proyecto + propiedades + imágenes + características + tours |
| GET | `/api/agregacion/propiedades/:id/completa` | Propiedad + imágenes + características + tours |

El resto de rutas replica la misma API de los microservicios (usuarios, autenticación, roles, permisos, proyectos, propiedades, imágenes, características, tours).

---

## Flujo recomendado

1. Levantar MS Usuarios y MS Proyectos
2. Levantar el BFF
3. Registrar usuario: `POST /api/usuarios`
4. Iniciar sesión: `POST /api/autenticacion/iniciar-sesion`
5. Usar `tokenAcceso` en Swagger (**Authorize**) o en el header `Authorization`
6. Consumir proyectos, propiedades, etc. desde el frontend apuntando solo al BFF

---

## Stack

- NestJS + TypeScript
- @nestjs/axios (proxy HTTP)
- Swagger / OpenAPI
- CORS habilitado para frontend

---

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run start:dev` | Desarrollo con recarga automática |
| `npm run build` | Compilar a `dist/` |
| `npm run start:prod` | Ejecutar build de producción |
| `npm run lint` | ESLint |

---

## Solución de problemas

| Problema | Posible causa | Solución |
|----------|---------------|----------|
| `502 Bad Gateway` | Microservicio caído | Verifica que MS Usuarios y MS Proyectos estén activos |
| `401 Unauthorized` | Token inválido o expirado | Inicia sesión de nuevo en `/api/autenticacion/iniciar-sesion` |
| CORS bloqueado | Origen no permitido | Ajusta `CORS_ORIGIN` en `.env` |
| Puerto en uso | Otro proceso en 3000 | Cambia `PORT` en `.env` |

---

## Referencias

- [MS Usuarios](./ms_users.md)
- [MS Proyectos](./ms_proyectos.md)

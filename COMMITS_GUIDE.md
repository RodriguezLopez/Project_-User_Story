# 📝 Guía de Commits por Historia de Usuario

Esta guía te ayudará a hacer commits organizados siguiendo la estructura de Gitflow y las tareas de cada HU.

## 🌿 Estructura de Ramas

```
main (producción)
  └── develop (desarrollo)
        ├── feature/hu-1-setup-inicial
        ├── feature/hu-2-auth
        ├── feature/hu-3-crud-productos-clientes
        ├── feature/hu-4-pedidos
        └── feature/hu-5-calidad-despliegue
```

---

## 📦 HU1: Setup inicial del proyecto

### Rama: `feature/hu-1-setup-inicial`

```bash
# Crear y cambiar a la rama
git checkout develop
git checkout -b feature/hu-1-setup-inicial
```

#### TASK 1: Inicializar proyecto Node.js + TS
```bash
git add package.json package-lock.json tsconfig.json
git commit -m "feat(HU1-T1): inicializar proyecto Node.js con TypeScript

- Configurar package.json con dependencias básicas
- Instalar express, typescript, ts-node, nodemon
- Configurar tsconfig.json con opciones de compilación
- Agregar scripts de desarrollo y producción"
```

#### TASK 2: Configurar estructura de carpetas
```bash
git add src/
git commit -m "feat(HU1-T2): configurar estructura modular de carpetas

- Crear módulos: models, controllers, routes, middlewares
- Implementar separación de capas: DTO, DAO
- Establecer arquitectura limpia y escalable"
```

#### TASK 3: Configurar Sequelize con PostgreSQL
```bash
git add src/database/ src/models/ .env.example
git commit -m "feat(HU1-T3): configurar Sequelize con PostgreSQL

- Definir conexión a base de datos en .env
- Crear modelos iniciales: User, Product, Client
- Configurar Sequelize con TypeScript
- Establecer relaciones entre modelos"
```

#### TASK 4: Crear seeds de datos iniciales
```bash
git add src/database/seed.ts
git commit -m "feat(HU1-T4): crear seeds de datos iniciales

- Poblar tabla User con admin y vendedor
- Poblar tabla Product con 3 productos de ejemplo
- Implementar verificación de datos existentes"
```

#### TASK 5: Configurar repositorio GitHub con Gitflow
```bash
git add .gitignore README.md
git commit -m "feat(HU1-T5): configurar repositorio con Gitflow

- Establecer estrategia de ramas (main, develop, feature)
- Crear .gitignore para Node.js
- Documentar estructura del proyecto en README"
```

#### TASK 6: Configurar Docker + Docker Compose
```bash
git add Dockerfile docker-compose.yml .dockerignore
git commit -m "feat(HU1-T6): configurar Docker y Docker Compose

- Crear Dockerfile para Node.js con multi-stage build
- Configurar servicio PostgreSQL con volúmenes
- Implementar networks para comunicación interna
- Limitar CPU (1.5 cores) y RAM (1GB) para app
- Limitar CPU (1 core) y RAM (512MB) para PostgreSQL"
```

```bash
# Mergear a develop
git checkout develop
git merge feature/hu-1-setup-inicial --no-ff
git push origin develop
```

---

## 🔐 HU2: Autenticación y roles de usuarios

### Rama: `feature/hu-2-auth`

```bash
git checkout develop
git checkout -b feature/hu-2-auth
```

#### TASK 1: Implementar modelo y servicio de autenticación
```bash
git add src/models/User.ts src/services/auth.service.ts src/controllers/auth.controller.ts
git commit -m "feat(HU2-T1): implementar AuthController y AuthService

- Crear AuthController con endpoints de registro y login
- Implementar AuthService con lógica de autenticación
- Agregar campo 'role' al modelo User (admin/vendedor)
- Implementar validaciones de email y contraseña"
```

#### TASK 2: Configurar JWT + refreshToken
```bash
git add src/services/auth.service.ts .env.example
git commit -m "feat(HU2-T2): configurar JWT con refresh tokens

- Generar access tokens con expiración de 15 minutos
- Implementar refresh tokens con expiración de 7 días
- Crear endpoint /auth/refresh para renovar tokens
- Almacenar refresh token en base de datos"
```

#### TASK 3: Crear middlewares de protección de rutas
```bash
git add src/middlewares/auth.middleware.ts
git commit -m "feat(HU2-T3): crear middlewares de autenticación

- Implementar middleware authenticateToken para verificar JWT
- Crear middleware authorizeRoles para validar roles
- Proteger rutas según permisos de usuario"
```

#### TASK 4: Implementar DTO y DAO en autenticación
```bash
git add src/dto/auth.dto.ts src/dao/user.dao.ts
git commit -m "feat(HU2-T4): implementar DTO y DAO para autenticación

- Crear DTOs: RegisterDTO, LoginDTO, AuthResponseDTO
- Implementar UserDAO para gestión de usuarios en DB
- Separar lógica de acceso a datos"
```

#### TASK 5: Implementar cifrado híbrido
```bash
git add src/utils/encryption.ts
git commit -m "feat(HU2-T5): implementar cifrado híbrido AES-256-GCM + RSA

- Cifrar datos con AES-256-GCM (simétrico)
- Cifrar clave AES con RSA-2048 (asimétrico)
- Crear funciones de cifrado y descifrado
- Documentar uso de claves públicas y privadas"
```

```bash
# Mergear a develop
git checkout develop
git merge feature/hu-2-auth --no-ff
git push origin develop
```

---

## 📦 HU3: Gestión de productos y clientes

### Rama: `feature/hu-3-crud-productos-clientes`

```bash
git checkout develop
git checkout -b feature/hu-3-crud-productos-clientes
```

#### TASK 1: Implementar CRUD de productos
```bash
git add src/controllers/product.controller.ts src/dao/product.dao.ts src/routes/product.routes.ts
git commit -m "feat(HU3-T1): implementar CRUD completo de productos

- Crear endpoints: GET, POST, PUT, DELETE
- Validar código único de producto
- Implementar ProductDAO para acceso a datos
- Proteger endpoints con autenticación"
```

#### TASK 2: Implementar CRUD de clientes
```bash
git add src/controllers/client.controller.ts src/dao/client.dao.ts src/routes/client.routes.ts
git commit -m "feat(HU3-T2): implementar CRUD completo de clientes

- Crear endpoints: GET, POST, PUT, DELETE
- Validar email único (opcional)
- Implementar ClientDAO para acceso a datos"
```

#### TASK 3: Configurar DTO y validaciones centralizadas
```bash
git add src/dto/product.dto.ts src/dto/client.dto.ts src/middlewares/validation.middleware.ts
git commit -m "feat(HU3-T3): configurar DTOs y validaciones centralizadas

- Crear DTOs para productos y clientes
- Implementar middlewares de validación
- Validar tipos de datos y campos requeridos"
```

#### TASK 4: Implementar Swagger con ejemplos
```bash
git add src/config/swagger.ts src/routes/*.ts src/index.ts
git commit -m "feat(HU3-T4): implementar documentación Swagger

- Configurar swagger-jsdoc y swagger-ui-express
- Documentar todos los endpoints con ejemplos
- Definir schemas de respuestas (200, 201, 400, 404, 500)
- Agregar autenticación Bearer en Swagger"
```

```bash
# Mergear a develop
git checkout develop
git merge feature/hu-3-crud-productos-clientes --no-ff
git push origin develop
```

---

## 🛒 HU4: Gestión de pedidos y validaciones de negocio

### Rama: `feature/hu-4-pedidos`

```bash
git checkout develop
git checkout -b feature/hu-4-pedidos
```

#### TASK 1: Implementar modelo y DAO de pedidos
```bash
git add src/models/Order.ts src/models/OrderItem.ts src/dao/order.dao.ts src/database/config.ts
git commit -m "feat(HU4-T1): implementar modelos Order y OrderItem

- Crear modelo Order con relación a Client y User
- Crear modelo OrderItem (relación muchos a muchos con Product)
- Implementar OrderDAO con queries complejas
- Definir relaciones en Sequelize"
```

#### TASK 2: Crear endpoint para registrar pedidos
```bash
git add src/services/order.service.ts src/controllers/order.controller.ts
git commit -m "feat(HU4-T2): crear endpoint para registrar pedidos

- Validar stock antes de crear pedido
- Reducir inventario automáticamente
- Calcular total del pedido
- Crear items del pedido con precios actuales"
```

#### TASK 3: Crear endpoint para consultar pedidos
```bash
git add src/routes/order.routes.ts
git commit -m "feat(HU4-T3): crear endpoints de consulta de pedidos

- Filtrar pedidos por cliente
- Filtrar pedidos por producto
- Listar todos los pedidos con paginación
- Obtener detalle completo de pedido"
```

#### TASK 4: Implementar cifrado híbrido en pedidos
```bash
git add src/services/order.service.ts
git commit -m "feat(HU4-T4): implementar cifrado híbrido en pedidos

- Cifrar datos sensibles con AES + RSA
- Crear métodos de cifrado/descifrado en OrderService
- Documentar uso de claves RSA"
```

#### TASK 5: Actualizar documentación Swagger
```bash
git add src/routes/order.routes.ts src/config/swagger.ts
git commit -m "feat(HU4-T5): actualizar Swagger con endpoints de pedidos

- Documentar POST /orders con ejemplos
- Documentar GET /orders con filtros
- Definir schemas de Order y OrderItem
- Agregar ejemplos de request/response"
```

```bash
# Mergear a develop
git checkout develop
git merge feature/hu-4-pedidos --no-ff
git push origin develop
```

---

## ✅ HU5: Calidad, seguridad y despliegue

### Rama: `feature/hu-5-calidad-despliegue`

```bash
git checkout develop
git checkout -b feature/hu-5-calidad-despliegue
```

#### TASK 1: Implementar pruebas unitarias con Jest
```bash
git add tests/ jest.config.js
git commit -m "feat(HU5-T1): implementar pruebas unitarias con Jest

- Crear tests para controladores y servicios
- Alcanzar cobertura mínima del 40%
- Configurar Jest con TypeScript
- Agregar scripts de testing"
```

#### TASK 2: Aplicar principios de Clean Code
```bash
git add src/
git commit -m "refactor(HU5-T2): aplicar principios de Clean Code

- Refactorizar controladores y servicios
- Eliminar código duplicado
- Mejorar nombres de variables y funciones
- Agregar comentarios JSDoc"
```

#### TASK 3: Actualizar Swagger con todos los endpoints
```bash
git add src/config/swagger.ts src/routes/
git commit -m "docs(HU5-T3): actualizar Swagger con documentación completa

- Revisar consistencia de todos los endpoints
- Agregar ejemplos detallados de request/response
- Documentar códigos de error
- Mejorar descripciones"
```

#### TASK 4: Redactar README completo
```bash
git add README.md
git commit -m "docs(HU5-T4): crear README completo del proyecto

- Agregar instrucciones de instalación
- Documentar ejecución con Docker Compose
- Listar endpoints de la API
- Agregar guía de troubleshooting"
```

#### TASK 5: Verificar control de features en GitHub
```bash
git add .github/ COMMITS_GUIDE.md
git commit -m "docs(HU5-T5): verificar flujo Gitflow y DevOps

- Documentar estrategia de ramas
- Crear guía de commits por HU
- Verificar integración con Azure DevOps
- Establecer proceso de code review"
```

```bash
# Mergear a develop
git checkout develop
git merge feature/hu-5-calidad-despliegue --no-ff
git push origin develop

# Mergear a main (producción)
git checkout main
git merge develop --no-ff
git tag -a v1.0.0 -m "Release v1.0.0 - SportsLine API completa"
git push origin main --tags
```

---

## 📊 Resumen de Commits

| HU | Rama | Commits | Estado |
|----|------|---------|--------|
| HU1 | feature/hu-1-setup-inicial | 6 | ✅ |
| HU2 | feature/hu-2-auth | 5 | ✅ |
| HU3 | feature/hu-3-crud-productos-clientes | 4 | ✅ |
| HU4 | feature/hu-4-pedidos | 5 | ✅ |
| HU5 | feature/hu-5-calidad-despliegue | 5 | ✅ |

**Total: 25 commits organizados**

---

## 🎯 Convenciones de Commits

Seguimos el estándar [Conventional Commits](https://www.conventionalcommits.org/):

- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `refactor`: Refactorización de código
- `test`: Agregar o modificar tests
- `chore`: Tareas de mantenimiento

**Formato:**
```
<tipo>(HU<número>-T<tarea>): <descripción corta>

<descripción detallada>
- Punto 1
- Punto 2
```

---

## 🚀 Comandos Rápidos

### Ver historial de commits
```bash
git log --oneline --graph --all
```

### Ver commits de una rama
```bash
git log feature/hu-2-auth --oneline
```

### Ver archivos modificados
```bash
git status
```

### Deshacer último commit (mantener cambios)
```bash
git reset --soft HEAD~1
```

# 🏃‍♂️ SportsLine - Sistema de Gestión de Pedidos

API REST para la gestión de productos, clientes y pedidos de la empresa SportsLine, desarrollada con Node.js, TypeScript, PostgreSQL y Docker.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso con Docker](#uso-con-docker)
- [Uso sin Docker](#uso-sin-docker)
- [Endpoints de la API](#endpoints-de-la-api)
- [Autenticación](#autenticación)
- [Documentación Swagger](#documentación-swagger)
- [Testing](#testing)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Gitflow](#gitflow)

## ✨ Características

- ✅ Autenticación JWT con refresh tokens
- ✅ Roles de usuario (admin, vendedor)
- ✅ Cifrado híbrido (AES-256-GCM + RSA)
- ✅ CRUD completo de productos, clientes y pedidos
- ✅ Validación de stock en pedidos
- ✅ Documentación con Swagger
- ✅ Dockerizado con PostgreSQL
- ✅ Arquitectura modular (DTO, DAO, Services)
- ✅ Validaciones centralizadas
- ✅ Manejo de errores robusto

## 🛠 Tecnologías

- **Backend:** Node.js 20 + TypeScript
- **Framework:** Express.js
- **Base de Datos:** PostgreSQL 16
- **ORM:** Sequelize
- **Autenticación:** JWT (jsonwebtoken)
- **Cifrado:** Crypto (AES-256-GCM + RSA)
- **Documentación:** Swagger (swagger-jsdoc, swagger-ui-express)
- **Testing:** Jest
- **Containerización:** Docker + Docker Compose

## 📦 Requisitos Previos

- Node.js 20 o superior
- PostgreSQL 16 (si no usas Docker)
- Docker y Docker Compose (recomendado)
- Git

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/RodriguezLopez/Project_-User_Story.git
cd Project_-User_Story
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo `.env.example` a `.env`:

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus configuraciones:

```env
DB_NAME=sportsline_db
DB_USER=sportsline_user
DB_PASSWORD=Qwe123*
DB_HOST=localhost
DB_PORT=5432
PORT=3000

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

## 🐳 Uso con Docker (Recomendado)

### 1. Levantar los servicios

```bash
docker-compose up -d
```

Esto iniciará:
- PostgreSQL en el puerto 5432
- API Node.js en el puerto 3000

### 2. Ver logs

```bash
docker-compose logs -f app
```

### 3. Ejecutar seeds (datos iniciales)

```bash
docker-compose exec app npm run seed
```

### 4. Detener los servicios

```bash
docker-compose down
```

### 5. Detener y eliminar volúmenes

```bash
docker-compose down -v
```

## 💻 Uso sin Docker

### 1. Crear base de datos PostgreSQL

```sql
CREATE DATABASE sportsline_db;
CREATE USER sportsline_user WITH PASSWORD 'Qwe123*';
GRANT ALL PRIVILEGES ON DATABASE sportsline_db TO sportsline_user;
```

### 2. Ejecutar en modo desarrollo

```bash
npm run dev
```

### 3. Ejecutar seeds

```bash
npm run seed
```

### 4. Compilar TypeScript

```bash
npm run build
```

### 5. Ejecutar en producción

```bash
npm start
```

## 🔗 Endpoints de la API

### Autenticación (`/api/auth`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/register` | Registrar usuario | No |
| POST | `/login` | Iniciar sesión | No |
| POST | `/refresh` | Refrescar token | No |
| POST | `/logout` | Cerrar sesión | Sí |
| GET | `/me` | Perfil del usuario | Sí |

### Productos (`/api/products`)

| Método | Endpoint | Descripción | Rol |
|--------|----------|-------------|-----|
| GET | `/` | Listar productos | Todos |
| GET | `/:id` | Obtener producto | Todos |
| POST | `/` | Crear producto | Admin |
| PUT | `/:id` | Actualizar producto | Admin |
| DELETE | `/:id` | Eliminar producto | Admin |

### Clientes (`/api/clients`)

| Método | Endpoint | Descripción | Rol |
|--------|----------|-------------|-----|
| GET | `/` | Listar clientes | Todos |
| GET | `/:id` | Obtener cliente | Todos |
| POST | `/` | Crear cliente | Todos |
| PUT | `/:id` | Actualizar cliente | Todos |
| DELETE | `/:id` | Eliminar cliente | Admin |

### Pedidos (`/api/orders`)

| Método | Endpoint | Descripción | Rol |
|--------|----------|-------------|-----|
| GET | `/` | Listar pedidos | Todos |
| GET | `/:id` | Obtener pedido | Todos |
| POST | `/` | Crear pedido | Todos |
| GET | `/client/:clientId` | Pedidos por cliente | Todos |
| GET | `/product/:productId` | Pedidos por producto | Todos |

## 🔐 Autenticación

La API usa JWT (JSON Web Tokens) para autenticación. Incluye el token en el header:

```
Authorization: Bearer <tu-token-jwt>
```

### Usuarios de prueba (después de ejecutar seeds):

**Admin:**
- Email: `admin@sportsline.com`
- Password: `Admin123*`

**Vendedor:**
- Email: `vendedor@sportsline.com`
- Password: `Vendedor123*`

## 📚 Documentación Swagger

Accede a la documentación interactiva en:

```
http://localhost:3000/api-docs
```

## 🧪 Testing

### Ejecutar todas las pruebas

```bash
npm test
```

### Ejecutar pruebas en modo watch

```bash
npm run test:watch
```

### Ver cobertura

```bash
npm test -- --coverage
```

## 📁 Estructura del Proyecto

```
Project_-User_Story/
├── src/
│   ├── config/           # Configuraciones (Swagger)
│   ├── controllers/      # Controladores de rutas
│   ├── dao/             # Data Access Objects
│   ├── database/        # Configuración DB y seeds
│   ├── dto/             # Data Transfer Objects
│   ├── middlewares/     # Middlewares (auth, validación)
│   ├── models/          # Modelos de Sequelize
│   ├── routes/          # Definición de rutas
│   ├── services/        # Lógica de negocio
│   ├── utils/           # Utilidades (cifrado)
│   └── index.ts         # Punto de entrada
├── dist/                # Código compilado
├── logs/                # Logs de la aplicación
├── keys/                # Claves RSA (no versionadas)
├── .env                 # Variables de entorno (no versionado)
├── .env.example         # Ejemplo de variables
├── Dockerfile           # Imagen Docker de Node.js
├── docker-compose.yml   # Orquestación de servicios
├── tsconfig.json        # Configuración TypeScript
├── package.json         # Dependencias y scripts
└── README.md           # Este archivo
```

## 🌿 Gitflow

Este proyecto sigue la estrategia Gitflow:

- `main`: Rama de producción
- `develop`: Rama de desarrollo
- `feature/*`: Ramas de características
- `hotfix/*`: Ramas de correcciones urgentes

### Crear una nueva feature

```bash
git checkout develop
git pull origin develop
git checkout -b feature/nombre-de-la-feature
# ... hacer cambios ...
git add .
git commit -m "feat: descripción del cambio"
git push origin feature/nombre-de-la-feature
```

## 🐛 Troubleshooting

### Error de conexión a PostgreSQL

Verifica que PostgreSQL esté corriendo:

```bash
docker-compose ps
```

### Error de permisos en Docker

En Linux/Mac, puede ser necesario usar `sudo`:

```bash
sudo docker-compose up -d
```

### Limpiar todo y empezar de nuevo

```bash
docker-compose down -v
docker-compose up -d --build
docker-compose exec app npm run seed
```

## 📝 Licencia

ISC

## 👥 Autor

SportsLine Team

---

**¿Necesitas ayuda?** Abre un issue en el repositorio.

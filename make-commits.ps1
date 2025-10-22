# Script para hacer commits organizados por Historia de Usuario
# Ejecutar: .\make-commits.ps1

Write-Host "🚀 Iniciando proceso de commits organizados por HU" -ForegroundColor Green
Write-Host ""

# Verificar que estamos en la rama correcta
$currentBranch = git branch --show-current
Write-Host "📍 Rama actual: $currentBranch" -ForegroundColor Cyan

# Función para hacer commit
function Make-Commit {
    param(
        [string]$Message,
        [string]$Files
    )
    
    Write-Host ""
    Write-Host "📝 Commit: $Message" -ForegroundColor Yellow
    
    if ($Files -eq ".") {
        git add .
    } else {
        git add $Files
    }
    
    git commit -m $Message
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Commit exitoso" -ForegroundColor Green
    } else {
        Write-Host "⚠️  No hay cambios para commitear o hubo un error" -ForegroundColor Yellow
    }
}

# ============================================
# HU1: Setup inicial del proyecto
# ============================================
Write-Host ""
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Magenta
Write-Host "  HU1: Setup inicial del proyecto" -ForegroundColor Magenta
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Magenta

# TASK 1
Make-Commit -Message "feat(HU1-T1): inicializar proyecto Node.js con TypeScript

- Configurar package.json con dependencias básicas
- Instalar express, typescript, ts-node, nodemon
- Configurar tsconfig.json con opciones de compilación
- Agregar scripts de desarrollo y producción" -Files "package.json package-lock.json tsconfig.json"

# TASK 2
Make-Commit -Message "feat(HU1-T2): configurar estructura modular de carpetas

- Crear módulos: models, controllers, routes, middlewares
- Implementar separación de capas: DTO, DAO
- Establecer arquitectura limpia y escalable" -Files "src/"

# TASK 3
Make-Commit -Message "feat(HU1-T3): configurar Sequelize con PostgreSQL

- Definir conexión a base de datos en .env
- Crear modelos iniciales: User, Product, Client
- Configurar Sequelize con TypeScript
- Establecer relaciones entre modelos" -Files "src/database/ src/models/ .env.example"

# TASK 4
Make-Commit -Message "feat(HU1-T4): crear seeds de datos iniciales

- Poblar tabla User con admin y vendedor
- Poblar tabla Product con 3 productos de ejemplo
- Implementar verificación de datos existentes" -Files "src/database/seed.ts"

# TASK 5
Make-Commit -Message "feat(HU1-T5): configurar repositorio con Gitflow

- Establecer estrategia de ramas (main, develop, feature)
- Crear .gitignore para Node.js
- Documentar estructura del proyecto en README" -Files ".gitignore README.md"

# TASK 6
Make-Commit -Message "feat(HU1-T6): configurar Docker y Docker Compose

- Crear Dockerfile para Node.js con multi-stage build
- Configurar servicio PostgreSQL con volúmenes
- Implementar networks para comunicación interna
- Limitar CPU (1.5 cores) y RAM (1GB) para app
- Limitar CPU (1 core) y RAM (512MB) para PostgreSQL" -Files "Dockerfile docker-compose.yml .dockerignore"

# ============================================
# HU2: Autenticación y roles
# ============================================
Write-Host ""
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Magenta
Write-Host "  HU2: Autenticación y roles de usuarios" -ForegroundColor Magenta
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Magenta

# TASK 1
Make-Commit -Message "feat(HU2-T1): implementar AuthController y AuthService

- Crear AuthController con endpoints de registro y login
- Implementar AuthService con lógica de autenticación
- Agregar campo 'role' al modelo User (admin/vendedor)
- Implementar validaciones de email y contraseña" -Files "src/models/User.ts src/services/auth.service.ts src/controllers/auth.controller.ts"

# TASK 2
Make-Commit -Message "feat(HU2-T2): configurar JWT con refresh tokens

- Generar access tokens con expiración de 15 minutos
- Implementar refresh tokens con expiración de 7 días
- Crear endpoint /auth/refresh para renovar tokens
- Almacenar refresh token en base de datos" -Files "src/services/auth.service.ts .env.example"

# TASK 3
Make-Commit -Message "feat(HU2-T3): crear middlewares de autenticación

- Implementar middleware authenticateToken para verificar JWT
- Crear middleware authorizeRoles para validar roles
- Proteger rutas según permisos de usuario" -Files "src/middlewares/auth.middleware.ts"

# TASK 4
Make-Commit -Message "feat(HU2-T4): implementar DTO y DAO para autenticación

- Crear DTOs: RegisterDTO, LoginDTO, AuthResponseDTO
- Implementar UserDAO para gestión de usuarios en DB
- Separar lógica de acceso a datos" -Files "src/dto/auth.dto.ts src/dao/user.dao.ts"

# TASK 5
Make-Commit -Message "feat(HU2-T5): implementar cifrado híbrido AES-256-GCM + RSA

- Cifrar datos con AES-256-GCM (simétrico)
- Cifrar clave AES con RSA-2048 (asimétrico)
- Crear funciones de cifrado y descifrado
- Documentar uso de claves públicas y privadas" -Files "src/utils/encryption.ts"

# ============================================
# HU3: CRUD Productos y Clientes
# ============================================
Write-Host ""
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Magenta
Write-Host "  HU3: Gestión de productos y clientes" -ForegroundColor Magenta
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Magenta

# TASK 1
Make-Commit -Message "feat(HU3-T1): implementar CRUD completo de productos

- Crear endpoints: GET, POST, PUT, DELETE
- Validar código único de producto
- Implementar ProductDAO para acceso a datos
- Proteger endpoints con autenticación" -Files "src/controllers/product.controller.ts src/dao/product.dao.ts src/routes/product.routes.ts src/models/Product.ts"

# TASK 2
Make-Commit -Message "feat(HU3-T2): implementar CRUD completo de clientes

- Crear endpoints: GET, POST, PUT, DELETE
- Validar email único (opcional)
- Implementar ClientDAO para acceso a datos" -Files "src/controllers/client.controller.ts src/dao/client.dao.ts src/routes/client.routes.ts"

# TASK 3
Make-Commit -Message "feat(HU3-T3): configurar DTOs y validaciones centralizadas

- Crear DTOs para productos y clientes
- Implementar middlewares de validación
- Validar tipos de datos y campos requeridos" -Files "src/dto/product.dto.ts src/dto/client.dto.ts src/middlewares/validation.middleware.ts"

# TASK 4
Make-Commit -Message "feat(HU3-T4): implementar documentación Swagger

- Configurar swagger-jsdoc y swagger-ui-express
- Documentar todos los endpoints con ejemplos
- Definir schemas de respuestas (200, 201, 400, 404, 500)
- Agregar autenticación Bearer en Swagger" -Files "src/config/swagger.ts src/routes/ src/index.ts"

# ============================================
# HU4: Gestión de Pedidos
# ============================================
Write-Host ""
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Magenta
Write-Host "  HU4: Gestión de pedidos y validaciones" -ForegroundColor Magenta
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Magenta

# TASK 1
Make-Commit -Message "feat(HU4-T1): implementar modelos Order y OrderItem

- Crear modelo Order con relación a Client y User
- Crear modelo OrderItem (relación muchos a muchos con Product)
- Implementar OrderDAO con queries complejas
- Definir relaciones en Sequelize" -Files "src/models/Order.ts src/models/OrderItem.ts src/dao/order.dao.ts src/database/config.ts"

# TASK 2
Make-Commit -Message "feat(HU4-T2): crear endpoint para registrar pedidos

- Validar stock antes de crear pedido
- Reducir inventario automáticamente
- Calcular total del pedido
- Crear items del pedido con precios actuales" -Files "src/services/order.service.ts src/controllers/order.controller.ts"

# TASK 3
Make-Commit -Message "feat(HU4-T3): crear endpoints de consulta de pedidos

- Filtrar pedidos por cliente
- Filtrar pedidos por producto
- Listar todos los pedidos
- Obtener detalle completo de pedido" -Files "src/routes/order.routes.ts"

# TASK 4
Make-Commit -Message "feat(HU4-T4): implementar cifrado híbrido en pedidos

- Cifrar datos sensibles con AES + RSA
- Crear métodos de cifrado/descifrado en OrderService
- Documentar uso de claves RSA" -Files "src/services/order.service.ts"

# TASK 5
Make-Commit -Message "feat(HU4-T5): actualizar Swagger con endpoints de pedidos

- Documentar POST /orders con ejemplos
- Documentar GET /orders con filtros
- Definir schemas de Order y OrderItem
- Agregar ejemplos de request/response" -Files "src/routes/order.routes.ts src/config/swagger.ts src/dto/order.dto.ts"

# ============================================
# HU5: Calidad y Despliegue
# ============================================
Write-Host ""
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Magenta
Write-Host "  HU5: Calidad, seguridad y despliegue" -ForegroundColor Magenta
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Magenta

# TASK 4 (README)
Make-Commit -Message "docs(HU5-T4): crear README completo del proyecto

- Agregar instrucciones de instalación
- Documentar ejecución con Docker Compose
- Listar endpoints de la API
- Agregar guía de troubleshooting
- Documentar usuarios de prueba" -Files "README.md"

# TASK 5 (Guía de commits)
Make-Commit -Message "docs(HU5-T5): crear guía de commits y Gitflow

- Documentar estrategia de ramas
- Crear guía de commits por HU
- Establecer convenciones de commits
- Agregar script de automatización" -Files "COMMITS_GUIDE.md make-commits.ps1"

Write-Host ""
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "  ✅ Proceso de commits completado" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Resumen:" -ForegroundColor Cyan
Write-Host "  - HU1: 6 commits (Setup inicial)" -ForegroundColor White
Write-Host "  - HU2: 5 commits (Autenticación)" -ForegroundColor White
Write-Host "  - HU3: 4 commits (CRUD Productos/Clientes)" -ForegroundColor White
Write-Host "  - HU4: 5 commits (Pedidos)" -ForegroundColor White
Write-Host "  - HU5: 2 commits (Documentación)" -ForegroundColor White
Write-Host ""
Write-Host "🎯 Total: 22 commits organizados" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Siguiente paso:" -ForegroundColor Yellow
Write-Host "  git push origin $currentBranch" -ForegroundColor White
Write-Host ""

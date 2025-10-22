import { Router } from 'express';
import clientController from '../controllers/client.controller.js';
import { authenticateToken, authorizeRoles } from '../middlewares/auth.middleware.js';
import { validateClient } from '../middlewares/validation.middleware.js';

const router = Router();

/**
 * @swagger
 * /api/clients:
 *   get:
 *     summary: Listar todos los clientes
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes
 */
router.get('/', authenticateToken, clientController.getAll.bind(clientController));

/**
 * @swagger
 * /api/clients/{id}:
 *   get:
 *     summary: Obtener cliente por ID
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *       404:
 *         description: Cliente no encontrado
 */
router.get('/:id', authenticateToken, clientController.getById.bind(clientController));

/**
 * @swagger
 * /api/clients:
 *   post:
 *     summary: Crear nuevo cliente
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente creado
 *       400:
 *         description: Error de validación
 */
router.post(
  '/',
  authenticateToken,
  validateClient,
  clientController.create.bind(clientController)
);

/**
 * @swagger
 * /api/clients/{id}:
 *   put:
 *     summary: Actualizar cliente
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cliente actualizado
 *       404:
 *         description: Cliente no encontrado
 */
router.put(
  '/:id',
  authenticateToken,
  clientController.update.bind(clientController)
);

/**
 * @swagger
 * /api/clients/{id}:
 *   delete:
 *     summary: Eliminar cliente (solo admin)
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cliente eliminado
 *       404:
 *         description: Cliente no encontrado
 */
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('admin'),
  clientController.delete.bind(clientController)
);

export default router;

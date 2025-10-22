import { Router } from 'express';
import orderController from '../controllers/order.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Crear nuevo pedido
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clientId
 *               - items
 *             properties:
 *               clientId:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Pedido creado exitosamente
 *       400:
 *         description: Error de validación o stock insuficiente
 */
router.post('/', authenticateToken, orderController.create.bind(orderController));

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Listar todos los pedidos
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos
 */
router.get('/', authenticateToken, orderController.getAll.bind(orderController));

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Obtener pedido por ID
 *     tags: [Orders]
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
 *         description: Pedido encontrado
 *       404:
 *         description: Pedido no encontrado
 */
router.get('/:id', authenticateToken, orderController.getById.bind(orderController));

/**
 * @swagger
 * /api/orders/client/{clientId}:
 *   get:
 *     summary: Obtener pedidos por cliente
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedidos del cliente
 */
router.get('/client/:clientId', authenticateToken, orderController.getByClient.bind(orderController));

/**
 * @swagger
 * /api/orders/product/{productId}:
 *   get:
 *     summary: Obtener pedidos que contienen un producto
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedidos con el producto
 */
router.get('/product/:productId', authenticateToken, orderController.getByProduct.bind(orderController));

export default router;

import type { Request, Response } from 'express';
import orderService from '../services/order.service.js';
import type { CreateOrderDTO } from '../dto/order.dto.js';

export class OrderController {
  // POST /api/orders
  async create(req: Request, res: Response): Promise<void> {
    try {
      const data: CreateOrderDTO = req.body;
      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({ error: 'Usuario no autenticado' });
        return;
      }

      const order = await orderService.createOrder(data, userId);
      res.status(201).json(order);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // GET /api/orders
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const orders = await orderService.getAllOrders();
      res.status(200).json(orders);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET /api/orders/:id
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const order = await orderService.getOrderById(id);

      if (!order) {
        res.status(404).json({ error: 'Pedido no encontrado' });
        return;
      }

      res.status(200).json(order);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET /api/orders/client/:clientId
  async getByClient(req: Request, res: Response): Promise<void> {
    try {
      const { clientId } = req.params;
      const orders = await orderService.getOrdersByClient(clientId);
      res.status(200).json(orders);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET /api/orders/product/:productId
  async getByProduct(req: Request, res: Response): Promise<void> {
    try {
      const { productId } = req.params;
      const orders = await orderService.getOrdersByProduct(productId);
      res.status(200).json(orders);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new OrderController();

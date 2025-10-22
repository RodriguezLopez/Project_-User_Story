import Order from '../models/Order.js';
import OrderItem from '../models/OrderItem.js';
import Product from '../models/Product.js';
import Client from '../models/Client.js';
import User from '../models/User.js';

export class OrderDAO {
  // Crear pedido
  async create(data: { clientId: string; userId: string; total: number }): Promise<Order> {
    return await Order.create(data as any);
  }

  // Crear item de pedido
  async createItem(data: {
    orderId: string;
    productId: string;
    quantity: number;
    price: number;
    subtotal: number;
  }): Promise<OrderItem> {
    return await OrderItem.create(data as any);
  }

  // Buscar por ID con relaciones
  async findById(id: string): Promise<Order | null> {
    return await Order.findByPk(id, {
      include: [
        {
          model: Client,
          attributes: ['id', 'name', 'email', 'phone'],
        },
        {
          model: User,
          attributes: ['id', 'name', 'email', 'role'],
        },
        {
          model: OrderItem,
          include: [
            {
              model: Product,
              attributes: ['id', 'code', 'name', 'price'],
            },
          ],
        },
      ],
    });
  }

  // Listar todos los pedidos
  async findAll(): Promise<Order[]> {
    return await Order.findAll({
      include: [
        {
          model: Client,
          attributes: ['id', 'name'],
        },
        {
          model: User,
          attributes: ['id', 'name'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  // Buscar pedidos por cliente
  async findByClient(clientId: string): Promise<Order[]> {
    return await Order.findAll({
      where: { clientId },
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Product,
              attributes: ['id', 'code', 'name'],
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  // Buscar pedidos que contengan un producto específico
  async findByProduct(productId: string): Promise<Order[]> {
    return await Order.findAll({
      include: [
        {
          model: OrderItem,
          where: { productId },
          include: [
            {
              model: Product,
              attributes: ['id', 'code', 'name'],
            },
          ],
        },
        {
          model: Client,
          attributes: ['id', 'name'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  // Actualizar estado
  async updateStatus(id: string, status: 'pending' | 'completed' | 'cancelled'): Promise<boolean> {
    const [updated] = await Order.update({ status }, { where: { id } });
    return updated > 0;
  }
}

export default new OrderDAO();

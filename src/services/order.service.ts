import orderDAO from '../dao/order.dao.js';
import productDAO from '../dao/product.dao.js';
import clientDAO from '../dao/client.dao.js';
import type { CreateOrderDTO, OrderResponseDTO } from '../dto/order.dto.js';
import { hybridEncrypt, hybridDecrypt } from '../utils/encryption.js';
import fs from 'fs';

export class OrderService {
  // Crear pedido con validación de stock
  async createOrder(data: CreateOrderDTO, userId: string): Promise<OrderResponseDTO> {
    // Validar cliente
    const client = await clientDAO.findById(data.clientId);
    if (!client) {
      throw new Error('Cliente no encontrado');
    }

    // Validar items y stock
    if (!data.items || data.items.length === 0) {
      throw new Error('El pedido debe tener al menos un producto');
    }

    const orderItems = [];
    let total = 0;

    for (const item of data.items) {
      const product = await productDAO.findById(item.productId);
      
      if (!product) {
        throw new Error(`Producto ${item.productId} no encontrado`);
      }

      if (product.stock < item.quantity) {
        throw new Error(`Stock insuficiente para ${product.name}. Disponible: ${product.stock}`);
      }

      const subtotal = Number(product.price) * item.quantity;
      total += subtotal;

      orderItems.push({
        productId: product.id,
        productName: product.name,
        productCode: product.code,
        quantity: item.quantity,
        price: Number(product.price),
        subtotal,
      });
    }

    // Crear pedido
    const order = await orderDAO.create({
      clientId: data.clientId,
      userId,
      total,
    });

    // Crear items y reducir stock
    for (let i = 0; i < data.items.length; i++) {
      const item = data.items[i];
      const orderItemData = orderItems[i];

      await orderDAO.createItem({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: orderItemData.price,
        subtotal: orderItemData.subtotal,
      });

      // Reducir stock
      await productDAO.reduceStock(item.productId, item.quantity);
    }

    // Obtener pedido completo
    const fullOrder = await orderDAO.findById(order.id);
    
    if (!fullOrder) {
      throw new Error('Error al crear el pedido');
    }

    return this.formatOrderResponse(fullOrder);
  }

  // Obtener pedido por ID
  async getOrderById(id: string): Promise<OrderResponseDTO | null> {
    const order = await orderDAO.findById(id);
    if (!order) return null;
    return this.formatOrderResponse(order);
  }

  // Listar todos los pedidos
  async getAllOrders(): Promise<any[]> {
    return await orderDAO.findAll();
  }

  // Obtener pedidos por cliente
  async getOrdersByClient(clientId: string): Promise<any[]> {
    return await orderDAO.findByClient(clientId);
  }

  // Obtener pedidos por producto
  async getOrdersByProduct(productId: string): Promise<any[]> {
    return await orderDAO.findByProduct(productId);
  }

  // Cifrar datos sensibles del pedido (ejemplo de uso de cifrado híbrido)
  encryptOrderData(orderData: string): any {
    try {
      // Leer clave pública RSA (debe existir)
      const publicKeyPath = process.env.RSA_PUBLIC_KEY_PATH || './keys/public.pem';
      
      if (!fs.existsSync(publicKeyPath)) {
        throw new Error('Clave pública RSA no encontrada');
      }
      
      const publicKey = fs.readFileSync(publicKeyPath, 'utf8');
      return hybridEncrypt(orderData, publicKey);
    } catch (error: any) {
      throw new Error(`Error al cifrar datos: ${error.message}`);
    }
  }

  // Descifrar datos sensibles del pedido
  decryptOrderData(encryptedData: any): string {
    try {
      // Leer clave privada RSA (debe existir)
      const privateKeyPath = process.env.RSA_PRIVATE_KEY_PATH || './keys/private.pem';
      
      if (!fs.existsSync(privateKeyPath)) {
        throw new Error('Clave privada RSA no encontrada');
      }
      
      const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
      
      return hybridDecrypt(
        encryptedData.encryptedData,
        encryptedData.encryptedKey,
        encryptedData.iv,
        encryptedData.authTag,
        privateKey
      );
    } catch (error: any) {
      throw new Error(`Error al descifrar datos: ${error.message}`);
    }
  }

  // Formatear respuesta de pedido
  private formatOrderResponse(order: any): OrderResponseDTO {
    return {
      id: order.id,
      clientId: order.clientId,
      clientName: order.Client?.name || '',
      userId: order.userId,
      userName: order.User?.name || '',
      total: Number(order.total),
      status: order.status,
      items: order.OrderItems?.map((item: any) => ({
        id: item.id,
        productId: item.productId,
        productName: item.Product?.name || '',
        productCode: item.Product?.code || '',
        quantity: item.quantity,
        price: Number(item.price),
        subtotal: Number(item.subtotal),
      })) || [],
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }
}

export default new OrderService();

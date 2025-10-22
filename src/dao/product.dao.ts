import Product from '../models/Product.js';
import type { CreateProductDTO, UpdateProductDTO } from '../dto/product.dto.js';

export class ProductDAO {
  // Crear producto
  async create(data: CreateProductDTO): Promise<Product> {
    return await Product.create(data as any);
  }

  // Buscar por código
  async findByCode(code: string): Promise<Product | null> {
    return await Product.findOne({ where: { code } });
  }

  // Buscar por ID
  async findById(id: string): Promise<Product | null> {
    return await Product.findByPk(id);
  }

  // Listar todos
  async findAll(): Promise<Product[]> {
    return await Product.findAll({ order: [['createdAt', 'DESC']] });
  }

  // Actualizar
  async update(id: string, data: UpdateProductDTO): Promise<Product | null> {
    const product = await this.findById(id);
    if (!product) return null;
    
    await product.update(data);
    return product;
  }

  // Eliminar
  async delete(id: string): Promise<boolean> {
    const deleted = await Product.destroy({ where: { id } });
    return deleted > 0;
  }

  // Reducir stock
  async reduceStock(id: string, quantity: number): Promise<boolean> {
    const product = await this.findById(id);
    if (!product || product.stock < quantity) {
      return false;
    }
    
    await product.update({ stock: product.stock - quantity });
    return true;
  }
}

export default new ProductDAO();

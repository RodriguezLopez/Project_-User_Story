import type { Request, Response } from 'express';
import productDAO from '../dao/product.dao.js';
import type { CreateProductDTO, UpdateProductDTO } from '../dto/product.dto.js';

export class ProductController {
  // GET /api/products
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const products = await productDAO.findAll();
      res.status(200).json(products);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET /api/products/:id
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const product = await productDAO.findById(id);
      
      if (!product) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
      }
      
      res.status(200).json(product);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // POST /api/products
  async create(req: Request, res: Response): Promise<void> {
    try {
      const data: CreateProductDTO = req.body;
      
      // Validar código único
      const existing = await productDAO.findByCode(data.code);
      if (existing) {
        res.status(400).json({ error: 'El código del producto ya existe' });
        return;
      }
      
      const product = await productDAO.create(data);
      res.status(201).json(product);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // PUT /api/products/:id
  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data: UpdateProductDTO = req.body;
      
      // Si se actualiza el código, validar que sea único
      if (data.code) {
        const existing = await productDAO.findByCode(data.code);
        if (existing && existing.id !== id) {
          res.status(400).json({ error: 'El código del producto ya existe' });
          return;
        }
      }
      
      const product = await productDAO.update(id, data);
      
      if (!product) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
      }
      
      res.status(200).json(product);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // DELETE /api/products/:id
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await productDAO.delete(id);
      
      if (!deleted) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
      }
      
      res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new ProductController();

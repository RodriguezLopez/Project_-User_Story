import type { Request, Response } from 'express';
import clientDAO from '../dao/client.dao.js';
import type { CreateClientDTO, UpdateClientDTO } from '../dto/client.dto.js';

export class ClientController {
  // GET /api/clients
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const clients = await clientDAO.findAll();
      res.status(200).json(clients);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET /api/clients/:id
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const client = await clientDAO.findById(id);
      
      if (!client) {
        res.status(404).json({ error: 'Cliente no encontrado' });
        return;
      }
      
      res.status(200).json(client);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // POST /api/clients
  async create(req: Request, res: Response): Promise<void> {
    try {
      const data: CreateClientDTO = req.body;
      
      // Validar email único si se proporciona
      if (data.email) {
        const existing = await clientDAO.findByEmail(data.email);
        if (existing) {
          res.status(400).json({ error: 'El email ya está registrado' });
          return;
        }
      }
      
      const client = await clientDAO.create(data);
      res.status(201).json(client);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // PUT /api/clients/:id
  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data: UpdateClientDTO = req.body;
      
      // Si se actualiza el email, validar que sea único
      if (data.email) {
        const existing = await clientDAO.findByEmail(data.email);
        if (existing && existing.id !== id) {
          res.status(400).json({ error: 'El email ya está registrado' });
          return;
        }
      }
      
      const client = await clientDAO.update(id, data);
      
      if (!client) {
        res.status(404).json({ error: 'Cliente no encontrado' });
        return;
      }
      
      res.status(200).json(client);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // DELETE /api/clients/:id
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await clientDAO.delete(id);
      
      if (!deleted) {
        res.status(404).json({ error: 'Cliente no encontrado' });
        return;
      }
      
      res.status(200).json({ message: 'Cliente eliminado exitosamente' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new ClientController();

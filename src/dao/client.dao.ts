import Client from '../models/Client.js';
import type { CreateClientDTO, UpdateClientDTO } from '../dto/client.dto.js';

export class ClientDAO {
  // Crear cliente
  async create(data: CreateClientDTO): Promise<Client> {
    return await Client.create(data as any);
  }

  // Buscar por email
  async findByEmail(email: string): Promise<Client | null> {
    return await Client.findOne({ where: { email } });
  }

  // Buscar por ID
  async findById(id: string): Promise<Client | null> {
    return await Client.findByPk(id);
  }

  // Listar todos
  async findAll(): Promise<Client[]> {
    return await Client.findAll({ order: [['createdAt', 'DESC']] });
  }

  // Actualizar
  async update(id: string, data: UpdateClientDTO): Promise<Client | null> {
    const client = await this.findById(id);
    if (!client) return null;
    
    await client.update(data);
    return client;
  }

  // Eliminar
  async delete(id: string): Promise<boolean> {
    const deleted = await Client.destroy({ where: { id } });
    return deleted > 0;
  }
}

export default new ClientDAO();

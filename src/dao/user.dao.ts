import User from '../models/User.js';
import type { RegisterDTO } from '../dto/auth.dto.js';

export class UserDAO {
  // Crear usuario
  async create(data: RegisterDTO & { password: string }): Promise<User> {
    return await User.create(data as any);
  }

  // Buscar por email
  async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({ where: { email } });
  }

  // Buscar por ID
  async findById(id: string): Promise<User | null> {
    return await User.findByPk(id);
  }

  // Actualizar refresh token
  async updateRefreshToken(userId: string, refreshToken: string | null): Promise<void> {
    await User.update({ refreshToken }, { where: { id: userId } });
  }

  // Buscar por refresh token
  async findByRefreshToken(refreshToken: string): Promise<User | null> {
    return await User.findOne({ where: { refreshToken } });
  }

  // Listar todos los usuarios
  async findAll(): Promise<User[]> {
    return await User.findAll({
      attributes: { exclude: ['password', 'refreshToken'] },
    });
  }

  // Eliminar usuario
  async delete(id: string): Promise<boolean> {
    const deleted = await User.destroy({ where: { id } });
    return deleted > 0;
  }
}

export default new UserDAO();

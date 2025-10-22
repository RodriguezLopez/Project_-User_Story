import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userDAO from '../dao/user.dao.js';
import type { RegisterDTO, LoginDTO, AuthResponseDTO, TokenPayload } from '../dto/auth.dto.js';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'default-refresh-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

export class AuthService {
  // Registro de usuario
  async register(data: RegisterDTO): Promise<AuthResponseDTO> {
    // Validar si el email ya existe
    const existingUser = await userDAO.findByEmail(data.email);
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    // Validar contraseña
    if (!data.password || data.password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Crear usuario
    const user = await userDAO.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role || 'vendedor',
    });

    // Generar tokens
    const { accessToken, refreshToken } = this.generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Guardar refresh token
    await userDAO.updateRefreshToken(user.id, refreshToken);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  }

  // Login de usuario
  async login(data: LoginDTO): Promise<AuthResponseDTO> {
    // Buscar usuario
    const user = await userDAO.findByEmail(data.email);
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Credenciales inválidas');
    }

    // Generar tokens
    const { accessToken, refreshToken } = this.generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Guardar refresh token
    await userDAO.updateRefreshToken(user.id, refreshToken);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  }

  // Refresh token
  async refreshToken(oldRefreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      // Verificar refresh token
      const payload = jwt.verify(oldRefreshToken, JWT_REFRESH_SECRET) as TokenPayload;

      // Buscar usuario por refresh token
      const user = await userDAO.findByRefreshToken(oldRefreshToken);
      if (!user || user.id !== payload.userId) {
        throw new Error('Refresh token inválido');
      }

      // Generar nuevos tokens
      const tokens = this.generateTokens({
        userId: user.id,
        email: user.email,
        role: user.role,
      });

      // Actualizar refresh token
      await userDAO.updateRefreshToken(user.id, tokens.refreshToken);

      return tokens;
    } catch (error) {
      throw new Error('Refresh token inválido o expirado');
    }
  }

  // Logout
  async logout(userId: string): Promise<void> {
    await userDAO.updateRefreshToken(userId, null);
  }

  // Generar tokens JWT
  private generateTokens(payload: TokenPayload): { accessToken: string; refreshToken: string } {
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });

    return { accessToken, refreshToken };
  }

  // Verificar access token
  verifyAccessToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, JWT_SECRET) as TokenPayload;
    } catch (error) {
      throw new Error('Token inválido o expirado');
    }
  }
}

export default new AuthService();

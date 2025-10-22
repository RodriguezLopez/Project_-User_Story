import type { Request, Response } from 'express';
import authService from '../services/auth.service.js';
import type { RegisterDTO, LoginDTO } from '../dto/auth.dto.js';

export class AuthController {
  // POST /api/auth/register
  async register(req: Request, res: Response): Promise<void> {
    try {
      const data: RegisterDTO = req.body;
      const result = await authService.register(data);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // POST /api/auth/login
  async login(req: Request, res: Response): Promise<void> {
    try {
      const data: LoginDTO = req.body;
      const result = await authService.login(data);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  // POST /api/auth/refresh
  async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        res.status(400).json({ error: 'Refresh token requerido' });
        return;
      }
      const tokens = await authService.refreshToken(refreshToken);
      res.status(200).json(tokens);
    } catch (error: any) {
      res.status(403).json({ error: error.message });
    }
  }

  // POST /api/auth/logout
  async logout(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ error: 'No autenticado' });
        return;
      }
      await authService.logout(userId);
      res.status(200).json({ message: 'Logout exitoso' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET /api/auth/me
  async getProfile(req: Request, res: Response): Promise<void> {
    try {
      res.status(200).json({ user: req.user });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new AuthController();

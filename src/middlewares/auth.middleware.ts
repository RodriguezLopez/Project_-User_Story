import type { Request, Response, NextFunction } from 'express';
import authService from '../services/auth.service.js';
import type { TokenPayload } from '../dto/auth.dto.js';

// Extender Request para incluir user
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

// Middleware para verificar JWT
export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      res.status(401).json({ error: 'Token no proporcionado' });
      return;
    }

    const payload = authService.verifyAccessToken(token);
    req.user = payload;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Token inválido o expirado' });
  }
}

// Middleware para verificar roles
export function authorizeRoles(...allowedRoles: Array<'admin' | 'vendedor'>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'No autenticado' });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({ error: 'No tienes permisos para esta acción' });
      return;
    }

    next();
  };
}

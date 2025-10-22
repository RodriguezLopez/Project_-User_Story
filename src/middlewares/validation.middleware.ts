import type { Request, Response, NextFunction } from 'express';

// Validar email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Middleware de validación para registro
export function validateRegister(req: Request, res: Response, next: NextFunction): void {
  const { name, email, password, role } = req.body;

  const errors: string[] = [];

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('El nombre debe tener al menos 2 caracteres');
  }

  if (!email || !isValidEmail(email)) {
    errors.push('Email inválido');
  }

  if (!password || password.length < 6) {
    errors.push('La contraseña debe tener al menos 6 caracteres');
  }

  if (role && !['admin', 'vendedor'].includes(role)) {
    errors.push('Rol inválido. Debe ser "admin" o "vendedor"');
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }

  next();
}

// Middleware de validación para login
export function validateLogin(req: Request, res: Response, next: NextFunction): void {
  const { email, password } = req.body;

  const errors: string[] = [];

  if (!email || !isValidEmail(email)) {
    errors.push('Email inválido');
  }

  if (!password) {
    errors.push('La contraseña es requerida');
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }

  next();
}

// Middleware de validación para productos
export function validateProduct(req: Request, res: Response, next: NextFunction): void {
  const { name, price, stock, code } = req.body;

  const errors: string[] = [];

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('El nombre del producto debe tener al menos 2 caracteres');
  }

  if (price === undefined || typeof price !== 'number' || price < 0) {
    errors.push('El precio debe ser un número positivo');
  }

  if (stock === undefined || typeof stock !== 'number' || stock < 0 || !Number.isInteger(stock)) {
    errors.push('El stock debe ser un número entero positivo');
  }

  if (!code || typeof code !== 'string' || code.trim().length < 3) {
    errors.push('El código del producto debe tener al menos 3 caracteres');
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }

  next();
}

// Middleware de validación para clientes
export function validateClient(req: Request, res: Response, next: NextFunction): void {
  const { name, email, phone } = req.body;

  const errors: string[] = [];

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('El nombre del cliente debe tener al menos 2 caracteres');
  }

  if (email && !isValidEmail(email)) {
    errors.push('Email inválido');
  }

  if (phone && (typeof phone !== 'string' || phone.trim().length < 7)) {
    errors.push('El teléfono debe tener al menos 7 caracteres');
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }

  next();
}

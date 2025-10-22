import { Router } from 'express';
import authRoutes from './auth.routes.js';
import productRoutes from './product.routes.js';
import clientRoutes from './client.routes.js';
import orderRoutes from './order.routes.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ 
    message: 'SportsLine API v1',
    endpoints: {
      auth: '/api/auth',
      products: '/api/products',
      clients: '/api/clients',
      orders: '/api/orders',
      docs: '/api-docs'
    }
  });
});

// Rutas
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/clients', clientRoutes);
router.use('/orders', orderRoutes);

export default router;

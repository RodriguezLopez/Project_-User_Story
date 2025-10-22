import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ api: 'v1' });
});

export default router;

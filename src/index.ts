import express from 'express';
import { initDB } from './database/config.js';
import router from './routes/index.js';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});
app.use('/api', router);

async function start() {
  await initDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start();
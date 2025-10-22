import 'dotenv/config';
import bcrypt from 'bcrypt';
import { initDB } from './config.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

async function seed() {
  await initDB();

  // Seed admin user
  const adminEmail = 'admin@example.com';
  const adminPassword = 'Admin123*';
  const adminName = 'Admin';

  const existingAdmin = await User.findOne({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const hash = await bcrypt.hash(adminPassword, 10);
    await User.create({ name: adminName, email: adminEmail, password: hash });
    console.log(' Admin user created:', adminEmail);
  } else {
    console.log(' Admin user already exists:', adminEmail);
  }

  // Seed sample products
  const products = [
    { name: 'Camiseta', price: 19.99, stock: 50 },
    { name: 'Balón', price: 29.99, stock: 30 },
    { name: 'Zapatillas', price: 79.99, stock: 20 },
  ];

  for (const p of products) {
    const exists = await Product.findOne({ where: { name: p.name } });
    if (!exists) {
      await Product.create(p as any);
      console.log(' Product created:', p.name);
    } else {
      console.log(' Product already exists:', p.name);
    }
  }

  console.log(' Seeding completed.');
}

seed().catch((err) => {
  console.error(' Seeding failed:', err);
  process.exit(1);
});

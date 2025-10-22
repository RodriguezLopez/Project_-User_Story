import 'dotenv/config';
import bcrypt from 'bcrypt';
import { initDB } from './config.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

async function seed() {
  await initDB();

  // Seed admin user
  const adminEmail = 'admin@sportsline.com';
  const adminPassword = 'Admin123*';
  const adminName = 'Administrador';

  const existingAdmin = await User.findOne({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const hash = await bcrypt.hash(adminPassword, 10);
    await User.create({ name: adminName, email: adminEmail, password: hash, role: 'admin' } as any);
    console.log('✅ Admin user created:', adminEmail);
  } else {
    console.log('ℹ️  Admin user already exists:', adminEmail);
  }

  // Seed vendedor user
  const vendedorEmail = 'vendedor@sportsline.com';
  const vendedorPassword = 'Vendedor123*';
  const vendedorName = 'Vendedor Demo';

  const existingVendedor = await User.findOne({ where: { email: vendedorEmail } });
  if (!existingVendedor) {
    const hash = await bcrypt.hash(vendedorPassword, 10);
    await User.create({ name: vendedorName, email: vendedorEmail, password: hash, role: 'vendedor' } as any);
    console.log('✅ Vendedor user created:', vendedorEmail);
  } else {
    console.log('ℹ️  Vendedor user already exists:', vendedorEmail);
  }

  // Seed sample products
  const products = [
    { code: 'CAM-001', name: 'Camiseta Deportiva', price: 19.99, stock: 50 },
    { code: 'BAL-001', name: 'Balón de Fútbol', price: 29.99, stock: 30 },
    { code: 'ZAP-001', name: 'Zapatillas Running', price: 79.99, stock: 20 },
  ];

  for (const p of products) {
    const exists = await Product.findOne({ where: { code: p.code } });
    if (!exists) {
      await Product.create(p as any);
      console.log('✅ Product created:', p.name);
    } else {
      console.log('ℹ️  Product already exists:', p.name);
    }
  }

  console.log('\n🎉 Seeding completed successfully!');
}

seed().catch((err) => {
  console.error(' Seeding failed:', err);
  process.exit(1);
});

import { Sequelize } from 'sequelize';
import 'dotenv/config';

import { initUser } from '../models/User.js';
import { initClient } from '../models/Client.js';
import { initProduct } from '../models/Product.js';
import { initOrder } from '../models/Order.js';
import { initOrderItem } from '../models/OrderItem.js';
import User from '../models/User.js';
import Client from '../models/Client.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import OrderItem from '../models/OrderItem.js';

const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = parseInt(process.env.DB_PORT || '5432');
const dbName = process.env.DB_NAME || 'sportsline_db';
const dbUser = process.env.DB_USER || 'sportsline_user';
const dbPass = process.env.DB_PASSWORD || 'secret_password';

console.log(`Connecting to Postgres host=${dbHost} port=${dbPort} db=${dbName} user=${dbUser}`);

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect: 'postgres',
  port: dbPort,
  logging: false,
  dialectOptions: {},
});

function initModels() {
  // Inicializar modelos
  initUser(sequelize);
  initClient(sequelize);
  initProduct(sequelize);
  initOrder(sequelize);
  initOrderItem(sequelize);

  // Definir relaciones
  // Order pertenece a Client
  Order.belongsTo(Client, { foreignKey: 'clientId' });
  Client.hasMany(Order, { foreignKey: 'clientId' });

  // Order pertenece a User (vendedor)
  Order.belongsTo(User, { foreignKey: 'userId' });
  User.hasMany(Order, { foreignKey: 'userId' });

  // Order tiene muchos OrderItems
  Order.hasMany(OrderItem, { foreignKey: 'orderId' });
  OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

  // OrderItem pertenece a Product
  OrderItem.belongsTo(Product, { foreignKey: 'productId' });
  Product.hasMany(OrderItem, { foreignKey: 'productId' });
}

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log(' PostgreSQL connection established successfully.');
  } catch (error) {
    console.error(' Error connecting to PostgreSQL:', error);
  }
}

async function initDB() {
  await testConnection();
  initModels();
  await sequelize.sync({ force: false });
  console.log('Database & tables created/synchronized!');
}

export { sequelize, initDB };

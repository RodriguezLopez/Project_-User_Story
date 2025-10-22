import { Sequelize } from 'sequelize';
import 'dotenv/config';

import { initUser } from '../models/User.js';
import { initClient } from '../models/Client.js';
import { initProduct } from '../models/Product.js';

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
  initUser(sequelize);
  initClient(sequelize);
  initProduct(sequelize);
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

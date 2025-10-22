import { Sequelize } from 'sequelize';
import 'dotenv/config'; // Esto carga las variables de entorno inmediatamente
 
 
import { initUser } from '../models/User.js';
import { initClient } from '../models/Client.js';
import { initProduct } from '../models/Product.js';

const sequelize = new Sequelize(
  process.env.DB_NAME || 'sportsline_db',
  process.env.DB_USER || 'sportsline_user',
  process.env.DB_PASSWORD || 'secret_password',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    port: parseInt(process.env.DB_PORT || '5432'),
    logging: false, // Disables SQL logging for clarity
    dialectOptions: {}
  }
);

function initModels() {
  initUser(sequelize);
  initClient(sequelize);
  initProduct(sequelize);
  // Define associations here if needed in future
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
  // Synchronize models to create tables if they don't exist
  await sequelize.sync({ force: false }); 
  console.log("Database & tables created/synchronized!");
}

export { sequelize, initDB };
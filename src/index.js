import Koa from 'koa';
import json from 'koa-json';
import cors from '@koa/cors'
import databaseConnect from './database/database.js';
import router from './routes/router.js';
import dotenv from 'dotenv';

dotenv.config();

const server = new Koa();
server.use(json()).use(router.routes()).use(router.allowedMethods()).use(cors({
  origin: '*',
  allowMethods: ['GET'],
  allowHeaders: ['Content-Type'],
}));

const startServer = async () => {
  try {
    await databaseConnect();
    server.listen(process.env.PORT, () => console.log('✔️ Connected to API!'));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();

export default server;
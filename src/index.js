import Koa from 'koa';
import json from 'koa-json';
import databaseConnect from './database/database.js';
import router from './routes/router.js';
import dotenv from 'dotenv';

dotenv.config();

const server = new Koa();

server.use(async (ctx, next) => {
  const period = 30
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Methods', 'GET');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  ctx.set('Cache-control', (ctx.method === 'GET') ? `public, max-age=${period}` : 'no-store');
  await next();
});

server.use(json()).use(router.routes()).use(router.allowedMethods());

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
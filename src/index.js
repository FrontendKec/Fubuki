import Koa from 'koa'
import Json from 'koa-json'
import databaseConnect from './database/database.js'
import router from './routes/router.js'

const server = new Koa();

server.use(Json());
server.use(router.routes()).use(router.allowedMethods());

databaseConnect().then(() => {
  server.listen(process.env.PORT, () => console.log('✔️ Connected to API!'));
});

export default server;

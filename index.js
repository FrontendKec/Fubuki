import Koa from 'koa'
import Json from 'koa-json'
import Router from 'koa-router'
import mongoose from 'mongoose'
const server = new Koa();
const router = new Router();
import databaseConnect from './database/database.js'

const db_schema = new mongoose.Schema({ anime: String, character: String, quote: String, });
const db_model = mongoose.model('Quote', db_schema);

server.use(Json());
server.use(router.routes()).use(router.allowedMethods());

router.get('/', (ctx) => {
  ctx.body = {'API': 'Welcome to Fubuki 🎉'};
});

router.get('/api/quotes', async (ctx) => {
  const quotes = await db_model.find();
  ctx.body = {'Available Quotes': quotes.length + ' Quote'}
});

router.get('/api/anime/all', async (ctx) => {
  const quotes = await db_model.find({}, { _id: 0, anime: 1 });
  const list = [];
  quotes.forEach((quote, i) => {
      if (i % 5 === 0 && !list.includes(quote.anime)) {
        list.push(quote.anime);
      }
  });
  ctx.body = [list, 'Count: ' + list.length]
});

router.get('/api/quote/random', async (ctx) => {
  const quotes = await db_model.find({}, { _id: 0 });
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  ctx.body = random
});

router.get('/api/quotes/random', async (ctx) => {
  const quotes = await db_model.find({}, { _id: 0 });
  const list = [];
  for (let i = 0; i < 10; i++) {
    const random = Math.floor(Math.random() * quotes.length);
    list.push(quotes[random]);
  }
  ctx.body = list
});

databaseConnect().then(() => { 
  server.listen(process.env.PORT, () => console.log('Running!'));
});
import Router from 'koa-router'
import mongoose from 'mongoose'

const router = new Router();

const db_schema = new mongoose.Schema({ anime: String, character: String, quote: String });
const db_model = mongoose.model('Quote', db_schema);

router.get('/', (ctx) => {
  ctx.body = 'Welcome to Fubuki 🎉'
});

router.get('/api/quotes', async (ctx) => {
  const quotes = await db_model.find();
  ctx.body = 'Available Quotes: ' + quotes.length + ' Quote 😊'
});

router.get('/api/anime/all', async (ctx) => {
  const quotes = await db_model.find({}, { _id: 0, anime: 1 });
  const list = [];
  quotes.forEach((quote, i) => {
    if (i % 5 === 0 && !list.includes(quote.anime)) {
      list.push(quote.anime);
    }
  });
  ctx.body = [{ 'Count': list.length + ' Anime'}, list];
});

router.get('/api/anime/:name', async (ctx) => {
  const { name } = ctx.params;
  if (name) {
    const quotes = await db_model.find({ anime: { $regex: name, $options: 'i' } }, { _id: 0 });
    ctx.body = quotes;
  }
});

router.get('/api/character/:name', async (ctx) => {
  const { name } = ctx.params;
  if (name) {
    const quotes = await db_model.find({ character: { $regex: name, $options: 'i' } }, { _id: 0 });
    ctx.body = quotes;
  }
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

export default router;

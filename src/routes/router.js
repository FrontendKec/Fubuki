import Router from 'koa-router';
import mongoose from 'mongoose';

const router = new Router();

const base = '/api/v1/'

const db_schema = new mongoose.Schema({
  anime: String,
  character: String,
  quote: String,
});
const db_model = mongoose.model('Quote', db_schema);

router.get('/', (ctx) => {
  ctx.body = { api: 'Welcome to Fubuki API 🎉!' };
});

router.get(base + 'quotes', async (ctx) => {
  const quotes = await db_model.find();
  ctx.body = { count: quotes.length };
});

router.get(base + 'anime', async (ctx) => {
  const distinctAnime = await db_model.distinct('anime');
  ctx.body = [{ count: distinctAnime.length }, distinctAnime];
});

router.get(base + 'random', async (ctx) => {
  const randomQuote = await db_model.aggregate([{ $sample: { size: 1 } }, { $project: { _id: 0 } }]);
  ctx.body = randomQuote[0];
});

router.get(base + 'random/:int', async (ctx) => {
  const { int } = ctx.params;
  const max = parseInt(int);

  if (Number.isInteger(max) && max <= 50) {
    const randomQuotes = await db_model.aggregate([{ $sample: { size: max } }, { $project: { _id: 0 } }]);
    ctx.body = randomQuotes;
  } else {
    ctx.body = [];
  }
});



const search = async (query, field) => {
  if (query) {
    const quotes = await db_model.find({ [field]: { $regex: query, $options: 'i' } }, { _id: 0 });
    return quotes;
  } else {
    return [];
  }
};

router.get(base + 'anime/:name', async (ctx) => {
  const { name } = ctx.params;
  const quotes = await search(name, 'anime');
  ctx.body = quotes;
});

router.get(base + 'character/:name', async (ctx) => {
  const { name } = ctx.params;
  const quotes = await search(name, 'character');
  ctx.body = quotes;
});

export default router;
import Router from 'koa-router';
import mongoose from 'mongoose';

const router = new Router();

const db_schema = new mongoose.Schema({
  anime: String,
  character: String,
  quote: String,
});
const db_model = mongoose.model('Quote', db_schema);

router.get('/', (ctx) => {
  ctx.body = 'Welcome to Fubuki API 🎉!';
});

router.get('/api/v1/quotes', async (ctx) => {
  const quotes = await db_model.find();
  ctx.body = `Available Quotes: ${quotes.length} Quote 😊`;
});

router.get('/api/v1/animes', async (ctx) => {
  const distinctAnime = await db_model.distinct('anime');
  ctx.body = [{ Count: distinctAnime.length }, distinctAnime];
});

router.get('/api/v1/random', async (ctx) => {
  const randomQuote = await db_model.aggregate([{ $sample: { size: 1 } }, { $project: { _id: 0 } }]);
  ctx.body = randomQuote[0];
});

router.get('/api/v1/random/5', async (ctx) => {
  const randomQuotes = await db_model.aggregate([{ $sample: { size: 5 } }, { $project: { _id: 0 } }]);
  ctx.body = randomQuotes;
});

router.get('/api/v1/random/10', async (ctx) => {
  const randomQuotes = await db_model.aggregate([{ $sample: { size: 10 } }, { $project: { _id: 0 } }]);
  ctx.body = randomQuotes;
});

const searchQuotes = async (query, field) => {
  if (query) {
    const quotes = await db_model.find({ [field]: { $regex: query, $options: 'i' } }, { _id: 0 });
    return quotes;
  } else {
    return [];
  }
};

router.get('/api/v1/anime/:name', async (ctx) => {
  const { name } = ctx.params;
  const quotes = await searchQuotes(name, 'anime');
  ctx.body = quotes;
});

router.get('/api/v1/character/:name', async (ctx) => {
  const { name } = ctx.params;
  const quotes = await searchQuotes(name, 'character');
  ctx.body = quotes;
});

export default router;
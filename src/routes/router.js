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
  ctx.body = 'Welcome to Fubuki 🎉';
});

router.get('/api/quotes', async (ctx) => {
  const quotes = await db_model.find();
  ctx.body = `Available Quotes: ${quotes.length} Quote 😊`;
});

router.get('/api/anime/all', async (ctx) => {
  const distinctAnime = await db_model.distinct('anime');
  ctx.body = [{ Count: distinctAnime.length + ' Anime' }, distinctAnime];
});

router.get('/api/quote/random', async (ctx) => {
  const randomQuote = await db_model.aggregate([{ $sample: { size: 1 } }, { $project: { _id: 0 } }]);
  ctx.body = randomQuote[0];
});

router.get('/api/quotes/random', async (ctx) => {
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

router.get('/api/anime/:name', async (ctx) => {
  const { name } = ctx.params;
  const quotes = await searchQuotes(name, 'anime');
  ctx.body = quotes;
});

router.get('/api/character/:name', async (ctx) => {
  const { name } = ctx.params;
  const quotes = await searchQuotes(name, 'character');
  ctx.body = quotes;
});

export default router;
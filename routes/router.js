const { Router } = require('express');
const mongoose = require('mongoose');
const router = Router();

const db_schema = new mongoose.Schema({ anime: String, character: String, quote: String, });
const db_model = mongoose.model('Quote', db_schema);

router.get('/', (request, response) => {
    response.json({"API":"Welcome to Fubuki 🎉"});
});

router.get('/v1/api', async (request, response) => { 
    const quotes = await db_model.find();
    response.json({"Available": quotes.length + " Quote"});
});

router.get('/v1/api/all', async (request, response) => { 
    const quotes = await db_model.find({}, { _id: 0, anime: 1 });
    const anime = [];
    quotes.forEach((quote, index) => {
        if (index % 5 === 0 && !anime.includes(quote.anime)) {
            anime.push(quote.anime);
        }
    });
    response.json([anime, 'Count ' + anime.length]);
});


router.get('/v1/api/random', async (request, response) => {
    const quotes = await db_model.find({}, { _id: 0 });
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    response.json(random);
});

module.exports = router
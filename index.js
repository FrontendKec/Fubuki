const express = require('express');
const mongoose = require('mongoose');
const server = express();
require('dotenv').config();

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.DATABASE_URL);
    console.log(`DB Connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

const db_schema = new mongoose.Schema({
    anime: String,
    character: String,
    quote: String,
});

const db_model = mongoose.model('Quote', db_schema);

server.get('/', (request, response) => {
  response.status(200).send({"200": "Welcome to Fubuki-API 🎉"});
});

server.get('/v1/api/random', async (request, response) => {
  const quotes = await db_model.find({}, { _id: 0 });
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  response.status(200).json(random);
});

connectDB().then(() => { server.listen(process.env.PORT, () => { console.log("Running!") }) })
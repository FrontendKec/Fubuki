const express = require('express');
const json = require('express-json');
const cors = require('cors');
const server = express();
const databaseConnect = require('./database/db');
const router = require('./routes/router');

const options = {
  methods: ['GET'],
  allowedHeaders: ['Content-Type']
};
server.use(router);
server.use(cors(options));
server.use(json());

databaseConnect().then(() => { 
  server.listen(process.env.PORT, 
    () => { 
      console.log("Running!") 
    }) 
});
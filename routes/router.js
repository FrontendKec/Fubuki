const { Router } = require('express');
const router = Router();
const database = require('../database/db.json');

router.get('/api/random', (req, res) => {
    res.send(database[Math.floor(Math.random() * database.length)]);
});

module.exports = router
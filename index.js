const express = require('express');
const app = express();
const router = require('./routes/router');
const port = 2700

app.use(router);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
})
app.get('/docs', (req, res) => {
    res.render('docs');
})

app.listen(port, () => console.log('Listening on port ' + port));
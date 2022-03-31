require('dotenv').config();
const express = require('express');

const app = express();

// app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use([require('./server/route/shortRand_route'), require('./server/route/shortKey_route'), require('./server/route/shortKGS_route'), require('./server/route/shortUnique_route')]);

// 404
app.get('*', (req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// 500
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500);
    res.json({ error: err.message });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

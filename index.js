const express = require('express');
const app = express();

// Application configurations
const PORT = process.env.PORT || 3000;
app.use(express.json());

// Application Routing
app.use('/', require('../routes/router'));

app.listen(PORT, () => {
    console.log('Sever started at PORT', PORT);
});

// Router.js file inside ./routes/router.js

const router = require('express').Router();
router.use('/auth', require('./auth.route'));
module.exports = router;

// auth.route.js file in ./routes/auth.route.js

const router = require('express').Router();
router.post('/', async(req, res) => {
    res.send('Success');
});
module.exports = router;
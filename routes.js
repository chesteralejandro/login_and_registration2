const users = require('./controllers/users');
const express = require('express');
const router = express.Router();

router.get('/', users.index);
router.get('/homepage', users.viewHomepage);

router.get('/logout', users.logout);

router.post('/login', users.login);
router.post('/register', users.register);

module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../controllers/user');

router.get('/users', User.getAll);

module.exports = router;

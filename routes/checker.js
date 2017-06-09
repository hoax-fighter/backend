const express = require('express');
const router = express.Router();
const Checker = require('../controllers/hoaxChecker');

router.post('/', Checker);

module.exports = router;

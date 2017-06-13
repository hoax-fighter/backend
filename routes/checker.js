const express = require('express');
const router = express.Router();
const Checker = require('../controllers/hoaxChecker2');

router.post('/', Checker);

module.exports = router;

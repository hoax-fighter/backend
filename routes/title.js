const express = require('express');
const router = express.Router();
const Title = require('../controllers/title');

router.post('/', Title.create);
router.get('/', Title.gets);

module.exports = router;
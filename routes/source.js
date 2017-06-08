const express = require('express');
const router = express.Router();
const Source = require('../controllers/source');

router.post('/', Source.create);
router.get('/', Source.gets);

module.exports = router;
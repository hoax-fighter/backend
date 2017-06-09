const express = require('express');
const router = express.Router();
const Source = require('../controllers/source');

router.post('/', Source.create);
router.get('/', Source.gets);
router.delete('/', Source.delete);

module.exports = router;

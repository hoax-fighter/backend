const express = require('express');
const router = express.Router();
const Source = require('../controllers/source');

router.post('/', Source.create);
router.get('/', Source.gets);

router.post('/web', Source.web)
router.post('/news', Source.news)

router.delete('/', Source.delete);


module.exports = router;

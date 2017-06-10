const express = require('express');
const router = express.Router();
const Source = require('../controllers/source');
const NewsSource = require('../controllers/newsSource');

router.post('/', Source.create);
router.get('/', Source.gets);

router.post('/web', Source.web)
router.post('/news', Source.news)

router.delete('/', Source.delete);

router.post('/news-source', NewsSource.create);
router.get('/news-source', NewsSource.gets);


module.exports = router;

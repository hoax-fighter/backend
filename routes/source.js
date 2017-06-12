const express = require('express');
const router = express.Router();
const Source = require('../controllers/source');
const NewsSource = require('../controllers/newsSource');
const Feedback = require('../controllers/feedback');

router.post('/', Source.create);
router.get('/', Source.gets);

router.post('/web', Source.web)
router.post('/news', Source.news)

router.delete('/', Source.delete);

router.post('/news-source', NewsSource.create);
router.get('/news-source', NewsSource.gets);

router.get('/feedback', Feedback.getAll);
router.post('/feedback', Feedback.vote);


module.exports = router;

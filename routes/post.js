const express = require('express');
const router = express.Router();
const Post = require('../controllers/post')

router.get('/', Post.getAll)
router.get('/:id', Post.findById)
router.post('/', Post.create)
router.put('/:id', Post.update)
router.delete('/:id', Post.delete)
router.post('/hoax/:postId', Post.vote)

module.exports = router
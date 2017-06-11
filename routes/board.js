const express = require('express');
const router = express.Router();
const User = require('../controllers/user');
const Post = require('../controllers/post');

router.get('/users', User.getAll);
router.post('/users', User.create);
router.delete('/user/:id', User.delete);

router.get('/posts', Post.getAll);
router.get('/post/:id', Post.findById);
router.post('/posts', Post.create);
router.put('/post/:id', Post.update);
router.delete('/post/:id', Post.delete);

router.post('/post/:postId/vote', Post.vote);

module.exports = router;

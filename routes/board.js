const express = require('express');
const router = express.Router();
const User = require('../controllers/user');

router.get('/users', User.getAll);
router.post('/users', User.create)
router.delete('/users:id', User.delete)

module.exports = router;

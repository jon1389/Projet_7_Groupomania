const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/postController');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

router.post('/', multer, postCtrl.createPost);

module.exports = router;
const express = require('express');
const router = express.Router();

const authCtrl = require('../controllers/authController');
const auth = require('../middlewares/auth');
const multer = require ('../middlewares/multer-config')

router.post('/signup', multer, authCtrl.signup);
router.post('/login', authCtrl.login);
router.get('/login', authCtrl.login);
router.get('/user', auth, authCtrl.getCurrentUser);

module.exports = router;

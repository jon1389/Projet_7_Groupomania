const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userController');
const auth = require('../middlewares/auth');

router.delete('/', auth, userCtrl.deleteCurrentUser);

module.exports = router;
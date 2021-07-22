const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');

const authCtrl = require('../controllers/authController');
const auth = require('../middlewares/auth');

// Limit number of requests per 1 minute
const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 3,
    message: {
        error: {
            errors: [{
                path: 'g',
                message: 'Trop de tentatives ont été effectuées, veuillez réessayer dans quelques minutes',
            }]
        }
    }
});

router.post('/signup', limiter, authCtrl.signup);
router.post('/login', limiter, authCtrl.login);
router.get('/user', auth, authCtrl.getCurrentUser);

module.exports = router;

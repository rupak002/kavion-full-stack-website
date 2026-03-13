const express = require('express');
const { authRateLimiter } = require('../middleware/rateLimiter');
const controller = require('../controllers/authController');

const router = express.Router();

router.post('/register', authRateLimiter, controller.register);
router.post('/login', authRateLimiter, controller.login);
router.post('/logout', controller.logout);
router.post('/refresh', controller.refresh);
router.post('/forgot-password', authRateLimiter, controller.forgotPassword);
router.post('/reset-password/:token', authRateLimiter, controller.resetPassword);

module.exports = router;

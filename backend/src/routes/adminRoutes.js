const express = require('express');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const { dashboardStats } = require('../controllers/adminController');

const router = express.Router();

router.get('/stats', isAuthenticated, isAdmin, dashboardStats);

module.exports = router;

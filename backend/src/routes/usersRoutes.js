const express = require('express');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const controller = require('../controllers/usersController');

const router = express.Router();

router.get('/', isAuthenticated, isAdmin, controller.listUsers);
router.patch('/:id/role', isAuthenticated, isAdmin, controller.updateRole);
router.delete('/:id', isAuthenticated, isAdmin, controller.deleteUser);

module.exports = router;

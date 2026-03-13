const express = require('express');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const controller = require('../controllers/contactController');

const router = express.Router();

router.post('/', controller.submitContact);
router.get('/', isAuthenticated, isAdmin, controller.listContacts);
router.patch('/:id/read', isAuthenticated, isAdmin, controller.markRead);
router.delete('/:id', isAuthenticated, isAdmin, controller.deleteContact);

module.exports = router;

const express = require('express');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const { list, getOne, createOne, updateOne, deleteOne } = require('../controllers/crudFactory');

const router = express.Router();

router.get('/', list('services'));
router.get('/:id', getOne('services'));
router.post('/', isAuthenticated, isAdmin, createOne('services'));
router.put('/:id', isAuthenticated, isAdmin, updateOne('services'));
router.delete('/:id', isAuthenticated, isAdmin, deleteOne('services'));

module.exports = router;

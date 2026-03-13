const express = require('express');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const { upload } = require('../middleware/upload');
const { list, getOne, createOne, updateOne, deleteOne } = require('../controllers/crudFactory');

const router = express.Router();

router.get('/', list('products', { publishedField: 'isPublished' }));
router.get('/:id', getOne('products'));
router.post('/', isAuthenticated, isAdmin, upload.single('image'), createOne('products'));
router.put('/:id', isAuthenticated, isAdmin, upload.single('image'), updateOne('products'));
router.delete('/:id', isAuthenticated, isAdmin, deleteOne('products'));

module.exports = router;

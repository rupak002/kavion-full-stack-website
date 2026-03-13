const express = require('express');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const { upload } = require('../middleware/upload');
const { list, getOne, createOne, updateOne, deleteOne } = require('../controllers/crudFactory');

const router = express.Router();

router.get('/', list('gallery'));
router.get('/:id', getOne('gallery'));
router.post('/', isAuthenticated, isAdmin, upload.single('image'), createOne('gallery'));
router.put('/:id', isAuthenticated, isAdmin, upload.single('image'), updateOne('gallery'));
router.delete('/:id', isAuthenticated, isAdmin, deleteOne('gallery'));

module.exports = router;

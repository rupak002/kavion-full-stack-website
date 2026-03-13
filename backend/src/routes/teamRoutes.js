const express = require('express');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const { upload } = require('../middleware/upload');
const { list, getOne, createOne, updateOne, deleteOne } = require('../controllers/crudFactory');

const router = express.Router();

router.get('/', list('team'));
router.get('/:id', getOne('team'));
router.post('/', isAuthenticated, isAdmin, upload.single('image'), createOne('team'));
router.put('/:id', isAuthenticated, isAdmin, upload.single('image'), updateOne('team'));
router.delete('/:id', isAuthenticated, isAdmin, deleteOne('team'));

module.exports = router;

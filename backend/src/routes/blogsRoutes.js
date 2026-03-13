const express = require('express');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const { list, getOne, createOne, updateOne, deleteOne } = require('../controllers/crudFactory');

const router = express.Router();

router.get('/', list('blogs', { publishedField: 'isPublished', slugField: 'slug' }));
router.get('/:id', getOne('blogs', { slugField: 'slug' }));
router.post('/', isAuthenticated, isAdmin, createOne('blogs', { slugField: 'slug' }));
router.put('/:id', isAuthenticated, isAdmin, updateOne('blogs', { slugField: 'slug' }));
router.delete('/:id', isAuthenticated, isAdmin, deleteOne('blogs'));

module.exports = router;

const express = require('express');
const router = express.Router();
const CultureController = require('../controllers/CultureController');

router.get('/', CultureController.getAll);
router.get('/:id', CultureController.getOne);
router.post('/', CultureController.create);
router.put('/:id', CultureController.update);
router.delete('/:id', CultureController.delete);

module.exports = router;
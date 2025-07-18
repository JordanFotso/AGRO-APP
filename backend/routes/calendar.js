const express = require('express');
const router = express.Router();
const CalendarController = require('../controllers/CalendarController');

router.get('/', CalendarController.getAll);
router.get('/:id', CalendarController.getOne);
router.post('/', CalendarController.create);
router.put('/:id', CalendarController.update);
router.delete('/:id', CalendarController.delete);

module.exports = router;
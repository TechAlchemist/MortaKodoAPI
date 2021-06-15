const express = require('express');
const router = express.Router();
const eventController = require('../../../controllers/events');

router.get('/getAllEvents', eventController.getAllEvents);
router.put('/updateEvent/:id', eventController.updateEvent);
router.post('/createEvent', eventController.createEvent);
router.delete('/deleteEvent/:id', eventController.deleteEvent);
router.get('/getEvent/:id', eventController.getEvent);

module.exports = router;
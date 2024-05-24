const express = require('express');
const router = express.Router();

const {
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent,
    showEventById
} = require('../Controllers/eventsController');
const authentication = require('../Middleware/authenticationAdmins');

// Routes
router.get('/show', authentication, getEvents);
router.post('/create', authentication, createEvent);
router.get('/:id/show', authentication, showEventById);
router.put('/:id/update', authentication, updateEvent);
router.delete('/:id/delete', authentication, deleteEvent);

module.exports = router;

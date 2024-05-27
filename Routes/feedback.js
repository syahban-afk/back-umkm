const express = require('express');
const router = express.Router();

const {
    getFeedbacks,
    createFeedback,
    showFeedbackById,
    average,
    statistics,
    updateFeedback,
    deleteFeedback
} = require('../Controllers/feedbackController');
const authentication = require('../Middleware/authenticationUsers');

// Routes
router.get('/show', authentication, getFeedbacks);
router.post('/create', authentication, createFeedback);
router.get('/:id/show', authentication, showFeedbackById);
router.get('/average', authentication, average);
router.get('/statistics', authentication, statistics);
router.put('/:id/update', authentication, updateFeedback);
router.delete('/:id/delete', authentication, deleteFeedback);

module.exports = router;

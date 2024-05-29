const express = require('express');
const router = express.Router();

const {
    getFeedbacks,
    createFeedback,
    showFeedbackById,
    updateFeedback,
    deleteFeedback
} = require('../Controllers/feedbackController');
const authentication = require('../Middleware/authenticationUsers');

// Routes
router.get('/show', authentication, getFeedbacks);
router.post('/create', authentication, createFeedback);
router.get('/:id/show', authentication, showFeedbackById);
router.put('/:id/update', authentication, updateFeedback);
router.delete('/:id/delete', authentication, deleteFeedback);

module.exports = router;

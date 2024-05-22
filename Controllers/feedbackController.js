const { successResponse, internalErrorResponse, errorResponse } = require('../Config/responseJson');
const { feedback, users, events } = require('../Models');

const getFeedback = async (req, res) => {
    try {
        const feedbackList = await feedback.findAll({
            include: [
                {
                    model: users,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: events,
                    as: 'event',
                    attributes: ['eventID', 'eventName']
                }
            ]
        });
        successResponse(res, 'Feedback fetched successfully', feedbackList, 200);
    } catch (err) {
        internalErrorResponse(res, err, 500);
    }
};

const createFeedback = async (req, res) => {
    const userID = req.user.id;
    const { eventID, rating, comments } = req.body;

    try {
        const newFeedback = await feedback.create({
            userID,
            eventID,
            rating,
            comments
        });

        if (!newFeedback) {
            errorResponse(res, 'Feedback not created', 400);
        } else {
            successResponse(res, 'Feedback created successfully', newFeedback, 201);
        }
    } catch (err) {
        internalErrorResponse(res, err, 500);
    }
};

const updateFeedback = async (req, res) => {
    const { id } = req.params;
    const userID = req.user.id;
    const { rating, comments } = req.body;

    try {
        const feedbackItem = await feedback.findOne({
            where: {
                id,
                userID
            }
        });

        if (!feedbackItem) {
            errorResponse(res, 'Feedback not found', 404);
            return;
        }

        const updatedFeedback = await feedback.update({
            rating,
            comments
        }, {
            where: {
                id,
                userID
            }
        });

        if (!updatedFeedback) {
            errorResponse(res, 'Feedback not updated', 400);
        } else {
            successResponse(res, 'Feedback updated successfully', { id, rating, comments }, 200);
        }
    } catch (err) {
        internalErrorResponse(res, err, 500);
    }
};

const showFeedbackById = async (req, res) => {
    const { id } = req.params;
    const userID = req.user.id;

    try {
        const feedbackItem = await feedback.findOne({
            where: {
                id,
                userID
            },
            include: [
                {
                    model: users,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: events,
                    as: 'event',
                    attributes: ['eventID', 'eventName']
                }
            ]
        });

        if (!feedbackItem) {
            errorResponse(res, 'Feedback not found', 404);
        } else {
            successResponse(res, 'Feedback fetched successfully', feedbackItem, 200);
        }
    } catch (err) {
        internalErrorResponse(res, err, 500);
    }
};

const deleteFeedback = async (req, res) => {
    const { id } = req.params;
    const userID = req.user.id;

    try {
        const feedbackItem = await feedback.findOne({
            where: {
                id,
                userID
            }
        });

        if (!feedbackItem) {
            errorResponse(res, 'Feedback not found', 404);
            return;
        }

        const deletedFeedback = await feedback.destroy({
            where: {
                id,
                userID
            }
        });

        if (!deletedFeedback) {
            errorResponse(res, 'Feedback not deleted', 400);
        } else {
            successResponse(res, 'Feedback deleted successfully', feedbackItem, 200);
        }
    } catch (err) {
        internalErrorResponse(res, err, 500);
    }
};

module.exports = {
    createFeedback,
    getFeedback,
    updateFeedback,
    deleteFeedback,
    showFeedbackById
};

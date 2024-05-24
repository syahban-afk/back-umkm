const { successResponse, internalErrorResponse, errorResponse } = require('../Config/responseJson');
const { Feedback, User, Event } = require('../Models');

const getFeedbacks = async (req, res) => {
    try {
        const feedbackList = await Feedback.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: Event,
                    as: 'event',
                    attributes: ['eventID', 'eventName']
                }
            ]
        });
        successResponse(res, 'Feedbacks fetched successfully', feedbackList, 200);
    } catch (err) {
        internalErrorResponse(res, err, 500);
    }
};

const createFeedback = async (req, res) => {
    const { userID, eventID, rating, comments } = req.body;

    try {
        const newFeedback = await Feedback.create({
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
    const { rating, comments } = req.body;
    const userID = req.user.id;

    try {
        const feedbackItem = await Feedback.findOne({
            where: {
                feedbackID: id,
                userID
            }
        });

        if (!feedbackItem) {
            errorResponse(res, 'Feedback not found', 404);
            return;
        }

        const updatedFeedback = await Feedback.update({
            rating,
            comments
        }, {
            where: {
                feedbackID: id,
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
        const feedbackItem = await Feedback.findOne({
            where: {
                feedbackID: id,
                userID
            },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: Event,
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
        const feedbackItem = await Feedback.findOne({
            where: {
                feedbackID: id,
                userID
            }
        });

        if (!feedbackItem) {
            errorResponse(res, 'Feedback not found', 404);
            return;
        }

        const deletedFeedback = await Feedback.destroy({
            where: {
                feedbackID: id,
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
    getFeedbacks,
    updateFeedback,
    deleteFeedback,
    showFeedbackById
};

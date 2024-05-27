const { successResponse, internalErrorResponse, errorResponse } = require('../Config/responseJson');
const { feedback } = require('../Models');
const Sequelize = require('sequelize');

const average = async (req, res) => {
    try {
        const avg = await feedback.findAll({
            attributes: [
                [Sequelize.fn('AVG', Sequelize.col('rating')), 'average_rating']
            ],
        });

        if (!avg) {
            errorResponse(res, 'Average not calculated', 500);
        } else {
            successResponse(res, 'Average calculated successfully', avg, 201);
        }
    } catch (err) {
        internalErrorResponse(res, err, 500);
    }
};

const statistics = async (req, res) => {
    try {
        const stats = await feedback.findAll({
            attributes: [
                [Sequelize.fn('COUNT', Sequelize.col('rating')), 'total_feedback'],
                [Sequelize.fn('AVG', Sequelize.col('rating')), 'average_rating']
            ]
        });

        if (!stats) {
            errorResponse(res, 'Statistics not found', 404);
        } else {
            successResponse(res, 'Statistics found successfully', stats, 201);
        }
    } catch (err) {
        internalErrorResponse(res, err, 500);
    }
};

const createFeedback = async (req, res) => {
    const { userID, eventID, rating, comments } = req.body;

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

const getFeedbacks = async (req, res) => {
    try {
        const feedbackList = await feedback.findAll();
        successResponse(res, 'Feedbacks fetched successfully', feedbackList, 200);
    } catch (err) {
        internalErrorResponse(res, err, 500);
    }
};

const updateFeedback = async (req, res) => {
    const { id } = req.params;
    const { userID, eventID, rating, comments } = req.body;

    try {
        const existingFeedback = await feedback.findOne({
            where: { feedbackID: id }
        });

        if (!existingFeedback) {
            errorResponse(res, 'Feedback not found', 404);
            return;
        }

        const updatedFeedback = await feedback.update({
            userID,
            eventID,
            rating,
            comments
        }, {
            where: { feedbackID: id }
        });

        if (!updatedFeedback) {
            errorResponse(res, 'Feedback not updated', 400);
        } else {
            const updatedData = { feedbackID: existingFeedback.feedbackID, userID, eventID, rating, comments };
            successResponse(res, 'Feedback updated successfully', updatedData, 200);
        }
    } catch (err) {
        internalErrorResponse(res, err, 500);
    }
};

const showFeedbackById = async (req, res) => {
    const { id } = req.params;

    try {
        const feedbackData = await feedback.findOne({
            where: { feedbackID: id }
        });

        if (!feedbackData) {
            errorResponse(res, 'Feedback not found', 404);
        } else {
            successResponse(res, 'Feedback fetched successfully', feedbackData, 200);
        }
    } catch (err) {
        internalErrorResponse(res, err, 500);
    }
};

const deleteFeedback = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedFeedback = await feedback.destroy({
            where: { feedbackID: id }
        });

        if (!deletedFeedback) {
            errorResponse(res, 'Feedback not deleted', 400);
        } else {
            successResponse(res, 'Feedback deleted successfully', {}, 200);
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
    showFeedbackById,
    average,
    statistics
};

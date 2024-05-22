const { successResponse, internalErrorResponse, errorResponse } = require('../Config/responseJson');
const { events } = require('../Models');

const getEvents = async (req, res) => {
    try {
        const eventList = await events.findAll();
        successResponse(res, 'Events fetched successfully', eventList, 200);
    } catch (err) {
        internalErrorResponse(res, err, 500);
    }
};

const createEvent = async (req, res) => {
    const { eventName, eventDate, eventLocation } = req.body;

    try {
        const event = await events.create({
            eventName,
            eventDate,
            eventLocation
        });

        if (!event) {
            errorResponse(res, 'Event not created', 400);
        } else {
            successResponse(res, 'Event created successfully', event, 201);
        }
    } catch (err) {
        internalErrorResponse(res, err, 500);
    }
};

const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { eventName, eventDate, eventLocation } = req.body;

    try {
        const event = await events.findOne({
            where: { id }
        });

        if (!event) {
            errorResponse(res, 'Event not found', 404);
            return;
        }

        const updatedEvent = await events.update({
            eventName,
            eventDate,
            eventLocation
        }, {
            where: { id }
        });

        const eventResponse = {
            id: event.id,
            eventName,
            eventDate,
            eventLocation
        };

        if (!updatedEvent) {
            errorResponse(res, 'Event not updated', 400);
        } else {
            successResponse(res, 'Event updated successfully', eventResponse, 200);
        }
    } catch (err) {
        internalErrorResponse(res, err, 500);
    }
};

const showEventById = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await events.findOne({
            where: { id }
        });

        if (!event) {
            errorResponse(res, 'Event not found', 404);
        } else {
            successResponse(res, 'Event fetched successfully', event, 200);
        }
    } catch (err) {
        internalErrorResponse(res, err, 500);
    }
};

const deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await events.findOne({
            where: { id }
        });

        if (!event) {
            errorResponse(res, 'Event not found', 404);
            return;
        }

        const deletedEvent = await events.destroy({
            where: { id }
        });

        if (!deletedEvent) {
            errorResponse(res, 'Event not deleted', 400);
        } else {
            successResponse(res, 'Event deleted successfully', event, 200);
        }
    } catch (err) {
        internalErrorResponse(res, err, 500);
    }
};

module.exports = {
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent,
    showEventById
};

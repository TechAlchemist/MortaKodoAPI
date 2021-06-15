const Event = require('../models/event');
const { authRequest } = require('../utils/api-auth');

async function createEvent (req, res) {
    const authorizied = await authRequest(req.headers['user-id']);
    if (!authorizied) return res.status(403).json('Could not authenticate request.');
    const event = new Event(req.body);
    try {
        event.save();
        return res.status(201).json('Event was created.');
    }
    catch(error) {
        return res.status(500).json('Failed to create event.');
    } 
}

async function getAllEvents (req, res) {
    let sliceArray = false;
    const results = {};
    if (req.query.page && req.query.limit) {
        var page = parseInt(req.query.page);
        var limit = parseInt(req.query.limit);
        var startIndex = (page - 1) * limit;
        var endIndex = page * limit;
        sliceArray = true;
    }
    Event.find({}, (error, events) => {
        results.results = events;
        if (error) return res.send(500).json('Failed to retrieve events.');
        // format data for pagination
        if (sliceArray) {
            results.results = events.slice(startIndex, endIndex);
            if (endIndex <  events.length) {
                results.next = {
                    page: page + 1,
                    limit: limit
                }
            }
            if (startIndex > 0) {
                results.previous = {
                    page: page - 1,
                    limit: limit
                }
            }
        }
        return res.status(200).json(results);
    });
}
async function getEvent (req, res) {
    Event.find({ _id: req.params.id}, (error, event) => {
        if (error) return res.status(500).json('Failed to retrive event.');
        return res.status(200).json(event);
    });
}
async function updateEvent (req, res) {
    const authorizied = await authRequest(req.headers['user-id']);
    if (!authorizied) return res.status(403).json('Could not authenticate request.');
    Event.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify: false}, (error, event) => {
        console.log(event)
        if (error) res.status(500).json('Failed to update event.');
        return res.status(200).json(event);
        // return res.status(200).json('Event was updated.');
   }); 
}

async function deleteEvent (req, res) {
    const authorizied = await authRequest(req.headers['user-id']);
    if (!authorizied) return res.status(403).json('Could not authenticate request.'); 
    Event.deleteOne({ _id: req.params.id}, (error) => {
        if (error) return res.status(500).json(error);
        return res.status(200).json('Event was deleted.');
    });
}

module.exports = {
    getAllEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
}



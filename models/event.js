const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema ({
    eventTime: {
        required: true,
        type: Date
    },
    eventTitle: {
        required: true,
        type: String
    },
    eventDescription: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);
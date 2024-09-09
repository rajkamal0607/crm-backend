const mongoose = require('mongoose');

const MeetingSchema = mongoose.Schema({
    type: String,
    time: String
},{timestamps: { createdAt: 'created', updatedAt: 'modified' }})

module.exports = MeetingSchema
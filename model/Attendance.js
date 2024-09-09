const mongoose = require('mongoose');

const AttendanceSchema = mongoose.Schema({
    startTime: String,
    endTime: String
},{timestamps: { createdAt: 'created', updatedAt: 'modified' }})

module.exports = AttendanceSchema
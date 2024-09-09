const mongoose = require('mongoose');

const LeaveSchema = mongoose.Schema({
    type: String,
    from: String,
    to: String,
    status: {
        type: String,
        default: 'pending'
    },
    reportingManager: String,
    reason: String
},{timestamps: { createdAt: 'created', updatedAt: 'modified' }})

module.exports = LeaveSchema
const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    name: String,
    task: String,
    deadline: String
},{timestamps: { createdAt: 'created', updatedAt: 'modified' }})

module.exports = ProjectSchema
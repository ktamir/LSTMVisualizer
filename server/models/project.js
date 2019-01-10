const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    user_id: { type: String, required: true},
    name: { type: String, required: true },
    created_at: Date
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
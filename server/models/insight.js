const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const insightSchema = new Schema({
    project_id: { type: String, required: true},
    user_id: { type: String, required: true},
    insights: { type: Object },
    pytorch_forward_creation_time:  {type: String, required: false},
});

const Insight = mongoose.model('Insight', insightSchema);

module.exports = Insight;
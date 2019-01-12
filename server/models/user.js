const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, index: {unique: true, dropDups: true} },
    password: { type: String, required: true },
    api_key: {type: String, required: false},
    created_at: Date
});

const User = mongoose.model('User', userSchema);

module.exports = User;
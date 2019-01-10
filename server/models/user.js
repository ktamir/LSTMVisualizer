const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, index: {unique: true, dropDups: true} },
    password: { type: String, required: true },
    created_at: Date
});

const User = mongoose.model('User', userSchema);

module.exports = User;
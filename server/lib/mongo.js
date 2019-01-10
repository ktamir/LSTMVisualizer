const connectionString = 'mongodb+srv://admin:LSTMAdmin@cluster0-jg7yv.mongodb.net/test?retryWrites=true';
const mongoose = require('mongoose');

module.exports.init = () => {
    mongoose.connect(connectionString);
};



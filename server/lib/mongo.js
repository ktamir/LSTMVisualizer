const connectionString = process.env.MONGODB_URI || "mongodb://localhost:27017/lstm";
const mongoose = require('mongoose');

module.exports.init = () => {
    mongoose.connect(connectionString);
};
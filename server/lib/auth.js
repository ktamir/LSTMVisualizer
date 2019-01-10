const jwt = require('jsonwebtoken');
const JWT_SCRET = 'LSTM_SECRET';
const Promise = require('bluebird');
const jwtAsynced = Promise.promisifyAll(jwt);

module.exports.createToken = (str) => {
    return jwt.sign({ id: str }, JWT_SCRET, {
        expiresIn: 86400 // expires in 24 hours
    });
};

module.exports.validateToken = async (token) => {
    try {
        console.log('VALIDATE TOKEN');
        console.log(token);
        const validation = await jwt.verifyAsync(token, JWT_SCRET);
        return {validated: true, validation: validation};
    }
    catch (e) {
        console.log(e);
        return {validated: false};
    }
};
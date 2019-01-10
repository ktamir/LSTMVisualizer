const express = require('express');
const bodyParser = require('body-parser');
const boom = require('boom');
const _ = require('lodash');

const mongo = require('./lib/mongo');
const userModel = require('./models/user');


const app = express();
const port = 3000;

mongo.init();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/signup', async (req, res, next) => {
    console.log('signup called');

    const dbUsers = await userModel.find({email: req.body.email});

    if (!_.isEmpty(dbUsers)) {
        return next(boom.badRequest(`There is already a user with the email ${req.body.email}`));
    }

    const newUser = userModel({
        email: req.body.email,
        password: req.body.password,
        created_at: new Date()
    });

    try {
        const createdUser = await newUser.save();
        res.send({user_token: createdUser._id});
    }
    catch(e) {
        return next(boom.internal(e));
    }
});

app.post('/login', async (req, res, next) => {
    console.log('login called');
    const dbUser = await userModel.find({email: req.body.email});

    if (_.isEmpty(dbUser)) {
        return next(boom.notFound(`No user with email ${req.body.email} found in database`));
    }

    if (_.get(dbUser, '[0].password') !== req.body.password) {
        return next(boom.forbidden('Bad Password'));
    }

    res.send({user_token: dbUser[0]._id});
});

app.post('/projects', (req, res) => res.send('Add new project'));

app.get('/projects', (req, res) => res.send('Get all user projects'));

app.post('/projects/{projectId}/forwards', (req, res) => res.send('Create new forward, return forward ID'));

app.get('/projects/{projectId}/forwards', (req, res) => res.send('Get all forwards for a specific project'));

app.put('/projects/{projectId}/forwards/{forward_id}', (req, res) => res.send('Edit a specific forward (add predictions)'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


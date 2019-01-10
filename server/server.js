const express = require('express');
const bodyParser = require('body-parser');
const boom = require('boom');
const _ = require('lodash');

const mongo = require('./lib/mongo');
const userModel = require('./models/user');
const projectModel = require('./models/project');
const forwardModel = require('./models/forward');
const auth = require('./lib/auth');

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
        const userToken = auth.createToken(createdUser._id);
        res.send({user_token: userToken});
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

    const user = dbUser[0];
    const userToken = auth.createToken(user._id);

    res.send({user_token: userToken});
});

app.post('/projects', async (req, res, next) => {
    const token = req.headers['x-access-token'];
    const validationResponse = await auth.validateToken(token);
    if (!token || validationResponse.validated === false) {
        return next(boom.unauthorized());
    }

    const userId = validationResponse.validation.id;
    console.log(validationResponse);
    const newProject = projectModel({
        user_id: userId,
        name: req.body.name,
        created_at: new Date()
    });

    try {
        const createdProject = await newProject.save();
        res.send({project_id: createdProject._id});
    }
    catch(e) {
        return next(boom.internal(e));
    }

});

app.get('/projects', async (req, res, next) => {
    const token = req.headers['x-access-token'];
    const validationResponse = await auth.validateToken(token);
    if (!token || validationResponse.validated === false) {
        return next(boom.unauthorized());
    }

    const userId = validationResponse.validation.id;

    return res.send(await projectModel.find({user_id: userId}));
});

app.post('/projects/:projectId/forwards', async (req, res, next) => {
    const token = req.headers['x-access-token'];
    const validationResponse = await auth.validateToken(token);
    if (!token || validationResponse.validated === false) {
        return next(boom.unauthorized());
    }

    const userId = validationResponse.validation.id;

    const newForward = forwardModel({
        user_id: userId,
        project_id: req.params.projectId,
        tag: req.body.tag,
        data: req.body.data,
        created_at: new Date()
    });

    try {
        const createdForward = await newForward.save();
        res.send({forward_id: createdForward._id});
    }
    catch(e) {
        return next(boom.internal(e));
    }
});

app.get('/projects/:projectId/forwards', async (req, res, next) => {
    const token = req.headers['x-access-token'];
    const validationResponse = await auth.validateToken(token);
    if (!token || validationResponse.validated === false) {
        return next(boom.unauthorized());
    }

    const userId = validationResponse.validation.id;

    return res.send(await forwardModel.find({user_id: userId, project_id: req.params.projectId}));
});

app.put('/projects/:projectId/forwards/:forwardId', async (req, res, next) => {
    const token = req.headers['x-access-token'];
    const validationResponse = await auth.validateToken(token);
    if (!token || validationResponse.validated === false) {
        return next(boom.unauthorized());
    }

    const userId = validationResponse.validation.id;
    const query = {user_id: userId, project_id: req.params.projectId, _id: req.params.forwardId};

    let relevantForward =  await forwardModel.find(query)[0];
    relevantForward = _.assign(relevantForward, req.body);

    try {
        await forwardModel.updateOne(query, relevantForward);
        return res.send(relevantForward);
    }
    catch (e) {
        return next(boom.internal(e));
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


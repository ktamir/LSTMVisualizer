const express = require('express');
const bodyParser = require('body-parser');
const boom = require('boom');
const _ = require('lodash');
const uuid = require('uuid');

const mongo = require('./lib/mongo');
const userModel = require('./models/user');
const projectModel = require('./models/project');
const forwardModel = require('./models/forward');
const insightModel = require('./models/insight');
const auth = require('./lib/auth');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const checkUser = async (req, res, next) => {
    const userToken = req.headers['x-access-token'];
    const apiKey = req.headers['x-api-key'];
    let userList;

    if (userToken) {
        const validationResponse = await auth.validateToken(userToken);
        if (validationResponse.validated === false) {
            res.status(401);
            return next(boom.unauthorized());
        }

        userList = await userModel.find({_id: validationResponse.validation.id});
    } else if (apiKey) {
        userList = await userModel.find({api_key: apiKey});
    } else {
        res.status(401);
        return next(boom.unauthorized());
    }

    req.user = userList[0];
    return next();

};


mongo.init();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors())

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
        api_key: uuid.v1(),
        created_at: new Date()
    });

    try {
        const createdUser = await newUser.save();
        const userToken = auth.createToken(createdUser._id);
        res.send({user_token: userToken, api_key: createdUser.api_key});
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

    res.send({user_token: userToken, api_key: user.api_key});
});

app.post('/projects', checkUser, async (req, res, next) => {
    const userId = req.user._id;
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

app.get('/projects', checkUser, async (req, res, next) => {
    const userId = req.user._id;

    return res.send(await projectModel.find({user_id: userId}));
});

app.post('/projects/:projectId/forwards', checkUser, async (req, res, next) => {
    const userId = req.user._id;

    const newForward = forwardModel({
        user_id: userId,
        project_id: req.params.projectId,
        tag: req.body.tag,
        data_by_iteration: req.body.data_by_iteration,
        general: req.body.general,
        pytorch_forward_creation_time: req.body.pytorch_forward_creation_time,
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

app.post('/projects/:projectId/insights', checkUser, async (req, res, next) => {
    const userId = req.user._id;

    const newInsight = insightModel({
        user_id: userId,
        project_id: req.params.projectId,
        insights: req.body.insights,
        pytorch_forward_creation_time: req.body.pytorch_forward_creation_time,
        created_at: new Date()
    });

    try {
        const createdInsight = await newInsight.save();
        res.send({insight_id: createdInsight._id});
    }
    catch(e) {
        return next(boom.internal(e));
    }
});

app.put('/projects/:projectId', checkUser, async (req, res, next) => {
    const userId = req.user._id;

    let relevantProject =  await projectModel.findById(req.params.projectId);
    relevantProject = _.assign(relevantProject, req.body);

    console.log(relevantProject);

    try {
        await projectModel.updateOne({_id: req.params.projectId}, relevantProject);
        return res.send(relevantProject);
    }
    catch (e) {
        return next(boom.internal(e));
    }
});

app.get('/projects/:projectId', checkUser, async (req, res, next) => {
    const userId = req.user._id;

    return res.send(await projectModel.find({user_id: userId, _id: req.params.projectId}));
});

app.get('/projects/:projectId/forwards', checkUser, async (req, res, next) => {
    const userId = req.user._id;

    return res.send(await forwardModel.find({user_id: userId, project_id: req.params.projectId}));
});

app.get('/projects/:projectId/insights', checkUser, async (req, res, next) => {
    const userId = req.user._id;

    return res.send(await insightModel.find({user_id: userId, project_id: req.params.projectId}));
});

app.put('/projects/:projectId/forwards/:forwardId', checkUser, async (req, res, next) => {
    const userId = req.user._id;
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

app.listen(port, () => console.log(`LSTM VISUALIZER listening on port ${port}!`));


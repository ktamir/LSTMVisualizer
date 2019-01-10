const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/signup', (req, res) => res.send('Signup - create user and return user token'));

app.post('/login', (req, res) => res.send('return user token'));

app.post('/projects', (req, res) => res.send('Add new project'));

app.get('/projects', (req, res) => res.send('Get all user projects'));

app.post('/projects/{projectId}/forwards', (req, res) => res.send('Create new forward, return forward ID'));

app.get('/projects/{projectId}/forwards', (req, res) => res.send('Get all forwards for a specific project'));

app.put('/projects/{projectId}/forwards/{forward_id}', (req, res) => res.send('Edit a specific forward (add predictions)'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


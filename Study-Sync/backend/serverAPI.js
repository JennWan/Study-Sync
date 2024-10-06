const express = require('express');
const app = express();
const guard = require("express-jwt-permissions")();
const { auth } = require('express-oauth2-jwt-bearer');

const port = process.env.PORT || 8080;

const jwtCheck = auth({
  audience: 'https://www.study-sync-api.com',
  issuerBaseURL: 'https://dev-he67ed27e5efteag.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

// enforce on all endpoints
app.use(jwtCheck);

let tasks = [ // In-memory array to store tasks
    { id: 1, task: "Buy groceries" },
    { id: 2, task: "Finish homework" },
    { id: 3, task: "Call the doctor" }
];

app.get('/tasks', guard.check["read:tasks"], function (req, res) {
    res.json(tasks);
});

app.listen(port);

console.log('Running on port ', port);
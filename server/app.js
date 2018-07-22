const express = require('express');
const app = express();
var dbContext = require('./db/dbContext');
var eventController = require('./controllers/eventCtrl');
var departmentController = require('./controllers/departmentCtrl');
app. use('/event', eventController);
app.use('/department',departmentController);
module.exports = app;
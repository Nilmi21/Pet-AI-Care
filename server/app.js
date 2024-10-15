const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const modelRoutes = require('./routes/model.routes');
const feedback = require('./routes/feedback.routes');

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.use('/model',modelRoutes);
app.use('/feedback',feedback);


module.exports = app;
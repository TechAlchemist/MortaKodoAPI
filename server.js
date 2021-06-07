const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');

const app = express();
require('dotenv').config();

const port = 8080;

app.use(logger('dev'));
app.use(cors());

app.use('/', indexRouter);

app.listen(port, console.log(`Server online. http://localhost:${port}`))
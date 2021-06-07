const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const indexRouter = require('./routes/index');

const app = express();
const port = 8080;

require('./config/db');

app.use(logger('dev'));
app.use(cors());

app.use('/', indexRouter);

app.listen(port, console.log(`Server online. http://localhost:${port}`))
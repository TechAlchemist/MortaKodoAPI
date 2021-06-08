const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 8080;

require('./config/db');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/api/v1/users');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());

app.use('/', indexRouter);
app.use('/api/vi/auth/', userRouter);

app.listen(port, console.log(`Server online. http://localhost:${port}`))
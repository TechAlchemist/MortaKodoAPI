const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 8080;

require('./config/db');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/api/v1/users');
const blogRouter = require('./routes/api/v1/blogs');
const eventRouter = require('./routes/api/v1/event');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());

app.use('/', indexRouter);
app.use('/api/v1/auth/', userRouter);
app.use('/api/v1/blogs/', blogRouter);
app.use('/api/v1/events/', eventRouter);

app.listen(port, console.log(`Server online. http://localhost:${port}`));
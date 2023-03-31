require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const router = require('./routes/index');
const errorsHandler = require('./middleware/errorsHandler');
// const corsOption = require('./middleware/corsOption');
const { requestLogger, errorLogger } = require('./middleware/logger');

const app = express();
app.use(cors(), (req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    res.end();
  }
  next();
});
app.use(express.json());

mongoose.connect(process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorsHandler);

app.listen(process.env.NODE_ENV === 'production' ? process.env.PORT : 3001, () => {
  console.log(`App listening on port ${process.env.NODE_ENV === 'production' ? process.env.PORT : 3001}`);
});

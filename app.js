require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');
const { errors } = require('celebrate');
const cors = require('./middleware/corsOption');
const router = require('./routes/index');
const errorsHandler = require('./middleware/errorsHandler');
const { requestLogger, errorLogger } = require('./middleware/logger');

const app = express();
app.use(express.json());

app.use(requestLogger);

app.use(cors);

mongoose.connect(process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
});

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorsHandler);

app.listen(process.env.NODE_ENV === 'production' ? process.env.PORT : 3001, () => {
  console.log(`App listening on port ${process.env.NODE_ENV === 'production' ? process.env.PORT : 3001}`);
});

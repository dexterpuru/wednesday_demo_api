require('dotenv')
  .config();
const swaggerUi = require('swagger-ui-express');
const helmet = require('helmet');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const swaggerDocs = require('./src/swagger/swaggerDoc');

const apis = require('./src/api_es/api');

const app = express();

if (process.env.NOD_ENV !== 'test') {
  app.use(morgan('dev'));
}
app.use(helmet());

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api', apis);

app.use((req, res, next) => {
  const error = new Error('Request Not Found');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
  });
});

module.exports = app;

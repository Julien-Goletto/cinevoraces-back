require('dotenv').config();

const { HOST, PORT } = process.env;
const express = require('express');

const app = express();

const expressSwagger = require('express-swagger-generator')(app);

app.use(express.json());// Body parser

// Setting CORS
const cors = require('cors');

const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000', 'https://cinevoraces-api.herokuapp.com/', 'https://cinevoraces.herokuapp.com/',
    'https://cinevoraces.e-anthony.fr/'],
  optionSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

const cookieParser = require('cookie-parser');
const csurf = require('csurf');

const csrfProtection = csurf(
  {
    cookie: {
      key: '__session',
      sameSite: 'none',
      // secure: true,
    },
  },
);
app.use(cookieParser());

const router = require('./src/router');

app.use('/v1', router); // Prefixing API routes and using router
app.use(csrfProtection);

const expressSwaggerOptions = {
  swaggerDefinition: {
    info: {
      description: 'A cineclub REST API',
      title: 'Cinevoraces',
      version: '1.0.0',
    },
    host: `${HOST}:${PORT}`,
    basePath: '/v1',
    produces: [
      'application/json',
    ],
    schemes: ['http', 'https'],
  },
  basedir: __dirname, // app absolute path
  files: ['./src/**/*.js'], // Path to the API handle folder
};
expressSwagger(expressSwaggerOptions);

module.exports = app;

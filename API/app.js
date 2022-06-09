require('dotenv').config();

const { HOST, PORT, SESSION_SECRET } = process.env;
const express = require('express');

const app = express();

const expressSwagger = require('express-swagger-generator')(app);

// Body parser
app.use(express.json());
app.use(express.urlencoded());

const session = require('express-session');

const sessionOptions = {
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
};

app.use(session(sessionOptions));

// Setting CORS
const cors = require('cors');

const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000', 'https://localhost:3000',
    'https://cinevoraces-api.herokuapp.com', 'http://cinevoraces-api.herokuapp.com',
    'https://cinevoraces-api-dev.herokuapp.com', 'http://cinevoraces-api-dev.herokuapp.com',
    'https://cinevoraces.herokuapp.com', 'http://cinevoraces.herokuapp.com',
    'https://cinevoraces-front.herokuapp.com', 'http://cinevoraces-front.herokuapp.com',
    'https://cinevoraces-front-dev.herokuapp.com', 'http://cinevoraces-front-dev.herokuapp.com'],
  optionSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const cleaner = require('./src/middlewares/cleaner');

const csrfProtection = csurf(
  {
    cookie: {
      key: '__session',
      sameSite: 'none',
      secure: true,
      // httpOnly: true,
    },
  },
);
app.use(cookieParser());
app.use(cleaner);

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

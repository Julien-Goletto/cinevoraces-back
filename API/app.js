require('dotenv').config();
const { HOST, PORT } = process.env;
const express = require('express');

const app = express();

app.use(express.json()) // Body parser

// Setting session system
const session = require('express-session');
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge:null  }
}));

// Setting CORS
const cors = require('cors');
const corsOptions = {
  origin: '*',
  optionSucessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

const router = require('./src/router/');
app.use('/v1', router); // Prefixing API routes and using router


const expressSwagger = require('express-swagger-generator')(app);
const expressSwaggerOptions = {
  swaggerDefinition: {
    info: {
        description: 'A videogame library manager REST API',
        title: 'Ludotheque',
        version: '1.0.0',
    },
    host: `${HOST}:${PORT}`,
    basePath: '/v1',
    produces: [
        "application/json"
    ],
    schemes: ['http', 'https']
},
basedir: __dirname, //app absolute path
files: ['./src/**/*.js'] //Path to the API handle folder
}
expressSwagger(expressSwaggerOptions);

module.exports = app;

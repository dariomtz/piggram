const express = require('express');
const path = require('path');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express'); 

require('dotenv').config();
require('./config/passport');
const cookieSession = require('cookie-session');
const passport = require('passport');

//Swagger
const swaggerSetup = YAML.load('./src/docs/swagger.yaml');

const app = express();

app.use(express.json());

//MongoDB (mongoose)
require('./config/db');

//Home page
app.get('/', (req, res) => {
    res.send('Hello World!!!');
  });

//Passport (Auth)
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: ['clave'] //clave para encriptar
}))

app.use(passport.initialize());
app.use(passport.session());

//Swagger 
app.use('/TSP-docs', swaggerUi.serve, swaggerUi.setup(swaggerSetup));

module.exports = app;
const express = require('express');
const path = require('path');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express'); 

const swaggerSetup = YAML.load('./src/docs/swagger.yaml');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!!!');
  });

//Swagger 
app.use('/TSP-docs', swaggerUi.serve, swaggerUi.setup(swaggerSetup));

module.exports = app;
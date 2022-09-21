'use strict';

const express = require('express');
const notFound = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const PORT = process.env.PORT || 3002;

const app = express();

app.get('/', (req, res, next) => {
  res.status(200).send('Hello World');
});

app.get('/bad', (req, res, next) => {
  next('this is a bad route');
});

app.get('/person', (req, res, next) => {
  let { personName } = req.query;

  try{
    if (personName){
      res.status(200).send(`${personName} is awesome`);
    } else {
      res.status(200).send('What a great name');
    }
  } catch(err){
    next(err.message);
  }
});

app.use('*', notFound);

app.use(errorHandler);

function start(){
  app.listen(PORT, () => console.log(`listening on port ${PORT}`));
}

module.exports = { app, start};
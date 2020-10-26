const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const indexRouter = require('./routes/index');

require('./passport-config')(passport)

app.use(cors({
    'allowedHeaders': ['Authorization', 'Content-Type'],
    'exposedHeaders': ['Authorization'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }))
app.use(express.json());
app.use(express.urlencoded({ extended:false }))

app.use(passport.initialize());


app.use('/', indexRouter);


app.listen(8080);
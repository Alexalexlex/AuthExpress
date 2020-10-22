const express = require('express');
const app = express();
const passport = require('passport');
const indexRouter = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended:false }))

app.use('/', indexRouter);



app.listen(3000);
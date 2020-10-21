const express = require('express');
const app = express();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

const indexRouter = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended:false }))
app.use(flash())
app.use(passport.session())

app.use('/', indexRouter);



app.listen(3000);
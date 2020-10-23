const express = require('express');
const app = express();
const passport = require('passport');
const indexRouter = require('./routes/index');

require('./passport-config')(passport)

app.use(express.json());
app.use(express.urlencoded({ extended:false }))

app.use(passport.initialize());


app.use('/', indexRouter);




app.listen(3000);
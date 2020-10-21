let express = require('express');
const passport = require('passport');
const router = express.Router();
const Users = require('../models').Users;
const local = require('passport-local');
const controller = require('../controllers/auth');

router.post('/sign_up',controller.signUp);
router.post('/sign_in',controller.signIn);

router.post('/api', (req,res) => {
    Users.create({
         email: req.body.email,
         password: req.body.password,
         first_name:  req.body.first_name,
         last_name:  req.body.last_name,
     })
     .then((user) => res.status(201).send(user))
     .catch((error) => res.status(400).send(error));
});

router.get('/api', (req,res) => {
    Users.findAll()
    .then((user) => res.status(201).send(user))
     .catch((error) => res.status(400).send(error));
});


/* GET home page. */ 
router.get('/', (req,res) => {
    res.send('<h1>Hello Express</h1>');
  });
  
  module.exports = router; 
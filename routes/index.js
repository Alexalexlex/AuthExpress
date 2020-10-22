let express = require('express');
const passport = require('passport');
const router = express.Router();
const Users = require('../models').Users;
const controller = require('../controllers/auth');

require('../passport-config')(passport)

// Auth

router.post('/sign_up',controller.signUp);
router.post('/sign_in',controller.signIn);
// router.post('/sign_in',passport.authenticate('jwt', { successRedirect: '/profile',
// failureRedirect: '/' }) ,controller.signIn);



router.get('/api', (req,res) => {
    Users.findAll()
    .then((user) => res.status(201).send(user))
     .catch((error) => res.status(400).send(error));
});


/* GET home page. */ 
router.get('/', (req,res) => {
    res.send('<h1>Oliver Sykes say Noda is Sucks</h1>');
  });
  
  module.exports = router;
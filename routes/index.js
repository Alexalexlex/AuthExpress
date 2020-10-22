let express = require('express');
const passport = require('passport');
const router = express.Router();
const controllerAuth = require('../controllers/auth');
const controllerPosts = require('../controllers/posts')

require('../passport-config')(passport)

// Auth

router.post('/sign_up',controllerAuth.signUp);
router.post('/sign_in',controllerAuth.signIn);
// router.post('/sign_in',passport.authenticate('jwt', { successRedirect: '/profile',
// failureRedirect: '/' }) ,controller.signIn);

router.post('/profile', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.send(req.user.profile);
    }
);

router.get('/posts', passport.authenticate('jwt', { session: false }), controllerPosts.getPosts);
router.post('/posts', controllerPosts.postPost);


/* GET home page. */ 
router.get('/', (req,res) => {
    res.send('<h1>Oliver Sykes say Noda is Sucks</h1>');
  });
  
  module.exports = router;
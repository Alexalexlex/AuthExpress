let express = require('express');
const passport = require('passport');
const router = express.Router();
const controllerAuth = require('../controllers/auth');
const controllerPosts = require('../controllers/posts')

require('../passport-config')(passport)

// Auth

router.post('/sign_up',controllerAuth.signUp);
router.post('/sign_in',controllerAuth.signIn);

router.get('/profile', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.send(req.user);
    }
);

// Posts

router.get('/posts', passport.authenticate('jwt', { session: false }), controllerPosts.getPosts);
router.post('/posts', passport.authenticate('jwt', { session: false }), controllerPosts.postPost);

// Comments



/* GET home page. */ 
router.get('/', (req,res) => {
    res.send('<h1>Oliver Sykes say Noda is Sucks</h1>');
  });
  
  module.exports = router;
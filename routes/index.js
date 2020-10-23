let express = require('express');
const passport = require('passport');
const router = express.Router();
const controllerAuth = require('../controllers/auth');
const controllerPosts = require('../controllers/posts')
const controllerComments = require('../controllers/comments')

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
router.get('/posts/:id', passport.authenticate('jwt', { session: false }), controllerPosts.getPostById);
router.delete('/posts/:id', passport.authenticate('jwt', { session: false }), controllerPosts.delPost);
router.put('/posts/:id', passport.authenticate('jwt', { session: false }), controllerPosts.editPost);

// Comments

router.get('/comments', passport.authenticate('jwt', { session: false }), controllerComments.getComments);
router.post('/comments', passport.authenticate('jwt', { session: false }), controllerComments.postComment);
router.get('/posts/:id/comments', passport.authenticate('jwt', { session: false }), controllerComments.getCommentsById);
router.delete('/comments/:id', passport.authenticate('jwt', { session: false }), controllerComments.delComment);

/* GET home page. */ 
router.get('/', (req,res) => {
    res.send('<h1>Oliver Sykes say Noda is Sucks</h1>');
  });
  
  module.exports = router;
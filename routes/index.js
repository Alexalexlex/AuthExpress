let express = require('express');
const passport = require('passport');
const router = express.Router();
const controllerAuth = require('../controllers/auth');

require('../passport-config')(passport)

// Auth

router.post('/sign_up',controllerAuth.signUp);
router.post('/sign_in',controllerAuth.signIn);
router.get('/profile', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.send(req.user);
    }
);

/* GET home page. */ 
router.get('/', (req,res) => {
    res.send('<h1>Noda</h1>');
  });
  
  module.exports = router;
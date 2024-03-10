var express = require('express');
var router = express.Router();
const User = require("../models/schema");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const events = [];
const myevent = require("../models/eventsch")
passport.use(new LocalStrategy(User.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

router.post("/register", async function (req, res, next) {
  try {
      await User.register(
          { username: req.body.username, email: req.body.email },
          req.body.password
      );
      res.redirect('/signin');
  } catch (error) {
      console.log(error);
      res.send(error);
  }
});
router.get('/signin', function(req, res, next) {
  res.render('signin', { title: 'Express' });
});
router.post(
  "/signin",
  passport.authenticate("local", {
      successRedirect: "/create-event",
      failureRedirect: "/signin",
  }),
  function (req, res, next) {}
);

function isLoggedIn(req, res, next) {
if (req.isAuthenticated()) {
    next();
} else {
    res.redirect("/signin");
}
};
router.get('/create-event', function(req, res, next) {
  res.render('create-event', { title: 'Express' });
});
router.post('/create-event',async function (req, res,next) {
  
  try{
    const events = new myevent(req.body);
    await events.save();
    res.redirect("/details");
  }catch(error){
    res.send(error)
  }
});


router.get('/details', async(req, res) => {
  try{
    const events = await myevent.find();
    console.log(events);
    res.render("details",{ eventDetails : events})
    
  }catch(error){
    res.send(error)
  }
});

module.exports = router;

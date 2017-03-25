var express = require('express');
var bodyParser = require('body-parser')
var session = require('express-session');
var FitbitStrategy = require('passport-fitbit');
var port = process.argv[2] || 8000;

var app = express();

app.use(express.statuc('public'));

app.use(bodyParser.json());

app.use(session({
  secret: config.session.secret,
  resave: true,
  saveUninitialized: true
}))

passport.use(new FitbitStrategy({
    consumerKey: config.fitbit.consumerKey,
    consumerSecret: FITBIT_CONSUMER_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/fitbit/callback"
  },
  function(token, tokenSecret, profile, cb) {
    User.findOrCreate({ fitbitId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));





app.listen(port, () => `listening on port ${port}`);

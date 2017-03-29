const express = require('express');
const bodyParser = require('body-parser')
const session = require('express-session');
const passport = require('passport');
const massive = require('massive');
const FitbitStrategy = require( 'passport-fitbit-oauth2' ).FitbitOAuth2Strategy;
const moment = require('moment')
const config = require('./config')
const port = process.argv[2] || 8000;

const app = express();

app.use(express.static('public'));

app.use(bodyParser.json());

app.use(session({
  secret: config.session.secret,
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

// const massiveInstance = massive.connectSync({connectionString: 'postgres://localhost/YOUR-DATABASE-HERE'})
// app.set('db', massiveInstance);
// const db = app.get('db');


passport.use(new FitbitStrategy({
    clientID: config.fitbit.clientID,
    clientSecret: config.fitbit.clientSecret,
    callbackURL: "http://localhost:8000/auth/fitbit/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(111, accessToken, refreshToken, profile);
    var fullUser = {
      profile:profile,
      refreshToken: refreshToken,
      accessToken: accessToken
    }
    return done(null,fullUser);
    // User.findOrCreate({ fitbitId: profile.id }, function (err, user) {
    //   console.log(user);
    //   return done(err, user);
    // });
  }
));
//base64 using Buffer for reference
// var a = Buffer.from("HelloWOrld", "ascii");
// console.log(a);
// console.log(1111, a.toString('base64'))

// Moment.js Add time for Refresh Keys with UTC time;
// var a = moment().utc().add(28800,'seconds');
// console.log(3, a);
// passport.serializeUser(function(user, done) {
//   return done(null, user);
// })

// OR Date.now()+28800

passport.deserializeUser(function(user, done) {
  return done(null, user);
})


app.get('/auth/fitbit',
  passport.authenticate('fitbit',
  { scope: ['activity','heartrate','location','profile','social', 'settings', 'sleep', 'weight', 'nutrition'] }
));

app.get( '/auth/fitbit/callback', passport.authenticate( 'fitbit', {
        // successRedirect: '/auth/fitbit/success',
        successRedirect: '/me',
        failureRedirect: '/auth/fitbit/failure'
}));

app.get('/me', function(req, res) {
  res.send(req.user);
})

app.get('/auth/logout', function(req, res) {
  req.logout();
  res.redirect('/');
})

app.listen(port, () => console.log(`listening on port ${port}`));

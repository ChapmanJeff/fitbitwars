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
  saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

const massiveInstance = massive.connectSync({connectionString: 'postgres://dcvefcsk:gyoVRfOTinceDj0BRRK5gZtT5sFHQnxl@hard-plum.db.elephantsql.com:5432/dcvefcsk'})
app.set('db', massiveInstance);
const db = app.get('db');

module.exports = app;
const userCtrl = require('./api/controllers/userCtrl');

passport.use(new FitbitStrategy({
    clientID: config.fitbit.clientID,
    clientSecret: config.fitbit.clientSecret,
    callbackURL: "http://localhost:8000/auth/fitbit/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    db.profile.findOne({user_id: profile.id}, function(err,user){
      if (!user) {
        userCtrl.createUser(accessToken, refreshToken, profile, done);
      } else {
        db.profile.save({
          user_id: profile.id,
          accesstoken: accessToken,
          refreshtoken:refreshToken,
          accesstokentimestamp: moment.utc()
        },
        function(err, res){
          return done(err, res);
        })
      }
    })
  }
));
//base64 using Buffer for reference
// var a = Buffer.from("HelloWOrld", "ascii");
// console.log(a);
// console.log(1111, a.toString('base64'))

// Moment.js Add time for Refresh Keys with UTC time;
// var a = moment().utc().add(28800,'seconds');
// console.log(3, a);

// OR Date.now()+28800

passport.serializeUser(function(user, done) {
  return done(null, user);
})

passport.deserializeUser(function(user, done) {
  return done(null, user);
})


app.get('/auth/fitbit',
  passport.authenticate('fitbit',
  { scope: ['activity','heartrate','location','profile','social', 'settings', 'sleep', 'weight', 'nutrition'] }
));

app.get( '/auth/fitbit/callback', passport.authenticate( 'fitbit', {
        successRedirect: '/profile',
        failureRedirect: '/auth/fitbit/failure'
}));

const profileCtrl = require('./api/controllers/profileCtrl');
app.get('/profile', profileCtrl.removeTokens);
const fitbitCtrl = require('./api/controllers/fitbitCtrl');
app.get('/api/dailyActivity', fitbitCtrl.getDailyActivity);

app.get('/auth/logout', function(req, res) {
  req.logout();
  res.redirect('/logout');
})

// Fitbit API subscriber notifications - my IP: 
app.get('/api/fitbit-notifications')
app.post('/api/fitbit-notifications')

app.listen(port, () => console.log(`listening on port ${port}`));

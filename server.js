const express = require('express');
const bodyParser = require('body-parser')
const session = require('express-session');
const passport = require('passport');
const massive = require('massive');
const FitbitStrategy = require( 'passport-fitbit-oauth2' ).FitbitOAuth2Strategy;
const moment = require('moment')
const config = require('./config')
const port = process.env.port || 8000;

const app = express();


//********* MIDDLEWARE **********//
app.use(express.static('public'));

app.use(bodyParser.json());

app.use(session({
  secret: process.env.sessionSecret || config.session.secret,
  resave: true,
  saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());


//********* CONNECT DB **********//
const massiveInstance = massive.connectSync({connectionString: 'postgres://dcvefcsk:gyoVRfOTinceDj0BRRK5gZtT5sFHQnxl@hard-plum.db.elephantsql.com:5432/dcvefcsk'})
app.set('db', massiveInstance);
const db = app.get('db');

module.exports = app;
const userCtrl = require('./api/controllers/userCtrl');


//*********** PASSPORT AUTHENTICATION ************//
passport.use(new FitbitStrategy({
    clientID: process.env.clientID || config.fitbit.clientID,
    clientSecret: process.env.clientSecret || config.fitbit.clientSecret,
    callbackURL: 'http://localhost:8000/auth/fitbit/callback'
    //callbackURL: "http://fitbitwars.azurewebsites.net/auth/fitbit/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    db.profile.findOne({user_id: profile.id}, function(err,user){
      if (!user) {
        userCtrl.createUser(accessToken, refreshToken, profile, done);
      } else {
        db.profile.save({
          user_id: profile.id,
          accesstoken: accessToken,
          refreshtoken:refreshToken,
          accesstokentimestamp: moment.utc().format()
        },
        (err, res)=> done(err, res))
      }
    })
  }
));

//Session Info
passport.serializeUser((user, done)=>
  done(null, user.user_id)
)

passport.deserializeUser((user, done) => {
  db.profile.findOne({user_id: user}, (err, user)=>{
    return done(null, user);
  })
})

app.get('/auth/fitbit',
  passport.authenticate('fitbit',
  { scope: ['activity','heartrate','location','profile','social', 'settings', 'sleep', 'weight', 'nutrition'] }
));

app.get('/auth/fitbit/callback', passport.authenticate( 'fitbit', {
        successRedirect: 'http://localhost:8080/profile',
        failureRedirect: '/auth/fitbit/failure'
}));


//***** APP ENDPOINTS *****//
app.get('/api/isLoggedIn', (req,res)=>
  {if (req.user) {
    res.send({loggedIn:true})
  } res.send({loggedIn:false})
})

app.get('/auth/logout', (req, res) => {
  req.logout();
  res.redirect('http://localhost:8080');
})

const profileCtrl = require('./api/controllers/profileCtrl');
app.get('/api/profile', profileCtrl.removeTokens);


//******* FITBIT ENDPOINTS **********//
const fitbitCtrl = require('./api/controllers/fitbitCtrl');
app.get('/api/dailyActivity', fitbitCtrl.getDailyActivity);

// Fitbit API subscriber notifications
app.get('/api/fitbit-notifications', (req, res) => {
  if (req.query.verify === process.env.verifyQuery) {
    res.status(204).send(req.query);
    console.log('success', req.query);
  } else {
    console.log('fail', req.query);
    res.status(404).send(req.query);
  }
})
app.post('/api/fitbit-notifications', (req, res) => {
  res.status(204).send();
  console.log(1,'Notif ', req.body);
  fitbitCtrl.updateDailyActivity(req.body).then((response) => {
    console.log('THE ANSWER',response);
  });
})

// Access Tokens only last 8 hrs. This runs every 45 min to update them
function updateTokens () {
  console.log("UPDATING Access Tokens")
  db.run("select * from profile", (dbErr, profilesArr)=> {
    fitbitCtrl.updateAccessTokens(profilesArr).then((response) =>
      console.log('FINISHED UPDATING TOKENS', response)
    )
  })
}
setInterval(updateTokens, 2700000) //2700000 ms = 45min 60000 = 1min


//********* Stripe Endpoints **********//
const stripeController = require('./api/controllers/stripeController');
app.post('/api/stripeToken', stripeController.createCustomer)

//To Test Charges uncomment below:
// stripeController.chargeCustomer("3QWD5T", 1000, "This is a test")



app.listen(port, () => console.log(`listening on port ${port}`));






//base64 using Buffer for reference
// var a = Buffer.from("HelloWOrld", "ascii");
// console.log(a);
// console.log(1111, a.toString('base64'))

// Moment.js Add time for Refresh Keys with UTC time;
// var a = moment().utc().add(28800,'seconds');
// console.log(3, a);

// OR Date.now()+28800

  // if (req.query.verify === '079f1f24159ab3c078e28243a940268387a6a302a3e7de8e9291b748430dfae0') {
  //   res.status(204);
  //   console.log('success', req.body);
  // } else {
  //   console.log('fail', req.body);
  //   res.status(404).send('failed');
  // }
//
// db.run("select accesstoken from profile where user_id = $1", ["3QWD5T"], function(err, res) {
// console.log(4, err, 5, res[0].accesstoken);
// })


// var date = "2017-04-05";
// var id= "3QWD5T";
// db.run("select p.user_id, a.id, a.date, p.accesstoken from profile p, activity_summary a where p.user_id = a.user_id AND date = $1 AND p.user_id= $2", [date,id], function(err, res) {
// console.log(4, err, 5,res);
// })

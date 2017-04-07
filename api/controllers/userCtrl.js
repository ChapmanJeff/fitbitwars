const moment = require('moment');
var app = require('../../server.js');
var db = app.get('db');
const userService = require('../services/userService')

module.exports = {

  createUser: function(accessToken, refreshToken, profile, done) {
    console.log('im here',122112);
    db.profile.insert({
      user_id: profile.id ,
    	refreshtoken: refreshToken ,
    	accesstoken: accessToken ,
    	accesstokentimestamp: moment.utc().format(),
    	firstname: profile._json.user.firstName,
    	fullname: profile._json.user.fullName,
    	displayname: profile._json.user.displayName,
    	age: profile._json.user.age,
    	avatar: profile._json.user.avatar,
    	avatar150: profile._json.user.avatar150,
    	clocktimedisplayformat: profile._json.user.clockTimeDisplayFormat,
    	dateofbirth:	profile._json.user.dateOfBirth,
    	distanceunit: profile._json.user.distanceUnit,
    	gender: profile._json.user.gender,
    	timezone: profile._json.user.timezone,
    	offsetfromutcmillis:	profile._json.user.offsetFromUTCMillis,
    	locale: profile._json.user.locale
    }, function(err, user){
      console.log(222, 'createUser ', user, err);
      return done(err, user)
    })

    userService.createSubscription(profile, accessToken)
      .then(function(response) {
        console.log('Subscription Response', response);
        // db.subscription.insert()
      })
  }

}

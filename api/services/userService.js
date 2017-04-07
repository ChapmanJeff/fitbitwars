const request = require('request');
const q = require('q');


module.exports = {

  createSubscription: function(profile, accesstoken) {
    var dfd = q.defer();
console.log('profile',profile);
    request({
           method: 'DELETE',
           headers: {Authorization: `Bearer ${accesstoken}`},
           json: true,
           url: `https://api.fitbit.com/1/user/-/activities/apiSubscriptions/${profile.id}.json`
       }, function(err, res, body) {
           if (err) {
               res.reject(new Error(err));
           } else {
             console.log(5551, body);
               dfd.resolve(body);
           }
       })
//testing

    return dfd.promise;
  }


}

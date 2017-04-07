const request = require('request');
const q = require('q');

module.exports = {

  getDailyActivity: function (user_id, accesstoken) {
    var dfd = q.defer();
    var date = '2017-03-01';
    request({
           method: 'GET',
           headers: {Authorization: `Bearer ${accesstoken}`},
           json: true,
           url: `https://api.fitbit.com/1/user/${user_id}/activities/date/${date}.json`
       }, function(err, res, body) {
           if (err) {
             console.log(err);
               res.reject(new Error(err));
           } else {
              console.log(11111,body);
              dfd.resolve(body);
           }
       });

    return dfd.promise;


  }

}

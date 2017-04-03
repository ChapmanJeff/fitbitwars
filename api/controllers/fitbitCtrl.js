const fitbitService = require('../services/fitbitService');

module.exports = {

  getDailyActivity: function (req, res) {
    fitbitService.getDailyActivity(req.user.user_id, req.user.accesstoken)
      .then(function(response) {
        console.log(00, response);
        res.send(response);
      })

  }

}


// const request = require('request');
// const q = require('q');
//
// module.exports = {
//
//   getDailyActivity: function (req, res) {
//     var dfd = q.defer();
//     var date = '2017-03-01';
//     console.log(req.user.user_id, req.user.accesstoken)
//     request({
//            method: 'GET',
//            headers: {Authorization: `Bearer ${req.user.accesstoken}`},
//            json: true,
//            url: `https://api.fitbit.com/1/user/${req.user.user_id}/activities/date/${date}.json`
//        }, function(err, res, body) {
//            if (err) {
//                res.reject(new Error(err));
//            } else {
//
//              console.log(11111,body);
//                dfd.resolve(body);
//            }
//        });
//
//     return dfd.promise;
//
//
//   }
//
// }

module.exports = {

  removeTokens: function(req, res) {
    var profile = {
    firstname: req.user.firstname,
    fullname: req.user.fullname,
    displayname: req.user.displayname,
    age: req.user.age,
    avatar: req.user.avatar,
    avatar150: req.user.avatar150,
    clocktimedisplayformat: req.user.clocktimedisplayformat,
    dateofbirth: req.user.dateofbirth,
    distanceunit: req.user.distanceunit,
    gender: req.user.gender,
    timezone: req.user.timezone,
    offsetfromutcmillis:req.user.offsetfromutcmillis
  }
    res.send(profile);
  }

}

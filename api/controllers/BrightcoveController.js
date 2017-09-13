
function getVideoUrl(req, res){
  var account_id = sails.config.brightcove.accountOne.account_id;
  var client_id = sails.config.brightcove.accountOne.client_id;
  var client_secret = sails.config.brightcove.accountOne.client_secret;
  var police_key = sails.config.brightcove.accountOne.police_key;
  sails.log(req.query.videoid);
  var video_id = req.query.videoid;
  //var access_token = BrightcoveService.getAuthToken(video_id);
  //var url = BrightcoveService.all(video_id);
  //sails.log('c: ' + url);

  BrightcoveService.getAuthToken().then(function(data){
    return BrightcoveService.getVideoUrl(data, video_id);
  }).then(function(data){
    sails.log('b ' + data);
    res.status(302).redirect(data);
    return data;
  });


  //sails.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
  //sails.log(access_token);
  //sails.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
//  BrightcoveService.getVideoUrl(access_token, video_id);
}

module.exports = {
  getvideourl: getVideoUrl
}

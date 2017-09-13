
function getVideoUrl(){
  var account_id = sails.config.brightcove.accountOne.account_id;
  var client_id = sails.config.brightcove.accountOne.client_id;
  var client_secret = sails.config.brightcove.accountOne.client_secret;
  var police_key = sails.config.brightcove.accountOne.police_key;
  BrightcoveService.getAuthToken();
}

module.exports = {
  getvideourl: getVideoUrl
}

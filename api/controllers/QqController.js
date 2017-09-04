/**
 * show login page
 * @param {*} req 
 * @param {*} res 
 */
function loginAction(req, res){
  var app_id = sails.config.thirdlogin.qq['nowness'].app_id;
  var redirect_url = sails.config.thirdlogin.qq['nowness'].redirect_url;
  url = 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=' + app_id + '&redirect_uri=' + encodeURIComponent(redirect_url) + '&state=124'
  res.redirect(url)
}

function callbackAction(req, res){
  sails.log(req.query);
  var usercancel = req.query.usercancel;
  
  var access_token = req.query.access_token;
  var expires_in = req.query.expires_in;
  var refresh_token = req.query.resfresh_token;

  if ( req.query.hasOwnProperty('code') ){
    sails.log(req.query.code);
    sails.log(req.query.state);
    var code = req.query.code;
    var state = req.query.state;
    QqService.getAccessToken(code).then(function(data){
      sails.log('access_token = ' + data.access_token);
      var token = data.access_token;
      QqService.getOpenid(token).then(function(data){
        sails.log(data);
        var js = data.replace('callback(','').replace(');','');
        var getOpen = JSON.parse(js);
        var openid = getOpen.openid;
        sails.log('openid = ' + openid );
        QqService.getUserInfo(token, openid).then(function(data){
          sails.log(data);
          return res.view('qqmessage', {
            data
          });
        });
      });
    });
  }
  if ( req.query.hasOwnProperty('usercancel') ){
    sails.log(req.query.usercancel);
    sails.log(req.query.state);
  }

//  return res.view('qqcallback',{userinfo: "test"});
}

module.exports = {
    login: loginAction,
    callback: callbackAction
}

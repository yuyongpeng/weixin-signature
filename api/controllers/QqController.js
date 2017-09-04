function loginAction(req, res){
  var app_id = sails.config.thirdlogin.qq['nowness'].app_id;
  var redirect_url = sails.config.thirdlogin.qq['nowness'].redirect_url;
  return res.view('qqlogin',{
    app_id: app_id,
    redirect_url: redirect_url
  });
}

function login2Action(req, res){
  var app_id = sails.config.thirdlogin.qq['nowness'].app_id;
  var redirect_url = sails.config.thirdlogin.qq['nowness'].redirect_url;
  url = 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=' + app_id + '&redirect_uri=' + encodeURIComponent(redirect_url) + '&state=124'
  //res.location(url);
  res.redirect(url)
}

function callbackAction(req, res){
  sails.log(req.query);
  var usercancel = req.query.usercancel;
  var code = req.query.code;
  var state = req.query.state;
  
  var access_token = req.query.access_token;
  var expires_in = req.query.expires_in;
  var refresh_token = req.query.resfresh_token;

  sails.log(req.query.code);
  sails.log(req.query.state);
  sails.log(req.query.usercancel);
  sails.log(req.query.access_token);
  sails.log(req.query.expires_in);
  sails.log(req.query.refresh_token);
  return res.view('qqcallback',{userinfo: "test"});
}

module.exports = {
    login: loginAction,
    login2: login2Action,
    callback: callbackAction
}

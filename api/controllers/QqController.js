function loginAction(req, res){
  var app_id = sails.config.thirdlogin.qq['nowness'].app_id;
  var redirect_url = sails.config.thirdlogin.qq['nowness'].redirect_url;
  return res.view('qqlogin',{
    app_id: app_id,
    redirect_url: redirect_url
  });
}

function callbackAction(req, res){
  sails.log(req.params.code);
  sails.log(req.params.state);
  return res.view('qqcallback',{userinfo: "test"});
}

module.exports = {
    login: loginAction,
    callback: callbackAction
}

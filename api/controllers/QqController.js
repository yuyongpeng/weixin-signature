
function weixin(req, res) {
  var url = req.query.url;
  var appId = req.query.appId;

  if (!url || !appId) {
    return res.badRequest();
  }
  TokenService.getSign(url, appId).then(function(sign){
    res.jsonp({
      code: 200,
      sign: sign
    });
  }).catch(function(err){
    res.json({
      code: 500,
      err: err
    })
  });
}

function loginAction(req, res){
  var app_id = sails.config.thirdlogin.qq['nowness'].app_id;
  var redirect_url = sails.config.thirdlogin.qq['nowness'].redirect_url;
  return res.view('qqlogin',{
    app_id: app_id,
    redirect_url: redirect_url
  });
}

function callbackAction(req, res){
  return res.view('qqcallback',{});

  var code = req.query.code;
  var state = req.query.state;
  sails.log('code=' + code);
  sails.log('state=' + state);
  WeixinService.getSign('nowness',code).then(function(data){
    return res.view('weixincallback',{
      userinfo: JSON.stringify(data)
    });
  });
}

module.exports = {
    weixin: weixin,
    login: loginAction,
    callback: callbackAction
}

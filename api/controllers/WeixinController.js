
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
  var open_id = sails.config.wx.open_id;
  var redirect_url = sails.config.wx.redirect_url;
  return res.view('weixinlogin',{
    open_id: open_id,
    redirect_url: redirect_url
  });
}

function callbackAction(req, res){
  WeixinService.getSign('nowness').then(function(data){
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

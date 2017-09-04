
var request = require('request');
var moment = require('moment');
var Sign = require('../Util/sign');


var code_url = "https://graph.qq.com/oauth2.0/authorize/?response_type=code&client_id=101425922&redirect_uri=http://testshare.nowness.com/&scope=get_user_info&state=124";
var token_url = 'https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&';
//var token_url = 'https://api.weixin.qq.com/sns/oauth2/access_token?grant_type=authorization_code&';
var refresh_url = 'https://api.weixin.qq.com/sns/oauth2/refresh_token?grant_type=refresh_token';
var userinfo_url = 'https://api.weixin.qq.com/sns/userinfo?';
var js_token = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=';
var Promise = require('bluebird');
var signs = {};


var getCode = function(app_id, redirect_url){
  var redirect_url = sails.config.thirdlogin.qq['nowness'].redirect_url;
  var url = code_url + '&client_id=' + app_id + 'redirect_url=' + encodeURIComponent(redirect_url) + '&state=' + '1234';
  var p = new Promise(function(resolve, reject){
    request(url, function(err, res, body){
      if(err){
        return reject(err);
      }
      resolve(JSON.parse(body));
    });
  });
}

var getAccessToken = function (appid, secret, code) {
  var redirect_url = sails.config.thirdlogin.qq['nowness'].redirect_url;
  var url = token_url + 'client_id=' + appid + '&client_secret='+ secret + '&code=' + code + '&redirect_url=' + redirect_url;
  sails.log(url);
  return new Promise(function (resolve, reject) {
    request(url, function (err, res, body) {
      if (err) {
        return reject(err);
      }
      resolve(JSON.parse(body));
    });
  });
};

var refreshToken = function(appid, refresh_token){
  var url = refresh_url + '&appid=' + appid + '&refresh_token=' + refresh_token;
  return new Promise(function(resolve, reject){
   request(url, function(err, res, body){
    if(err){
      return reject(err);
    }
    resolve(JSON.parse(body));
   });
  });
}

var getUserInfo = function(token, appid){
  var url = userinfo_url + 'access_token=' + token + '&openid=' + appid;
  return new Promise(function(resolve,reject){
    request(url, function(err, res, body){
      if(err){
        return reject(err);
      }
      resolve(JSON.parse(body))
    });
  });
}

/**
 * 最终返回的是用的信息
 * @param {*} url 
 * @param {*} appid 
 * @param {*} thirdlogin 
 */
function getSign(thirdlogin, code) {
  app_id = sails.config.thirdlogin.weixin[thirdlogin].open_id;
  app_secret = sails.config.thirdlogin.weixin[thirdlogin].open_secret;
  redirect_url = sails.config.thirdlogin.weixin[thirdlogin].redirect_url;
  sails.log(app_id);
  sails.log(app_secret);
  sails.log(redirect_url);
  sails.log(code);
  var promise = new Promise(function (resolve, reject) {
    getAccessToken(app_id, app_secret, code).then(function(data){
      access_token = data['access_token'];
      refresh_token = data['refresh_token'];
      openid = data['openid'];
      unionid = data['unionid'];
      sails.log(access_token);
      sails.log(data);
      //return resolve(data);
      return data;
    }).then(function(data){
      sails.log('====================');
      sails.log(data);
      access_token = data['access_token'];
      app_id = data['openid'];
      getUserInfo(access_token, app_id).then(function(data){
        resolve(data);
      });

    });
    //getUserInfo(access_token, app_id).then(function(data){
    //  resolve(data);
    //});
  });
  return promise;
}

module.exports = {
  getAccessToken: getAccessToken,
  getUserInfo: getUserInfo,
  getSign: getSign
}



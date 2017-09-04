
var request = require('request');
var moment = require('moment');
var urlx = require('url');
var _ = require('underscore');


var code_url = "https://graph.qq.com/oauth2.0/authorize/?response_type=code&client_id=101425922&redirect_uri=http://testshare.nowness.com/&scope=get_user_info&state=124";
var token_url = 'https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&';
//var token_url = 'https://api.weixin.qq.com/sns/oauth2/access_token?grant_type=authorization_code&';
var refresh_url = 'https://graph.qq.com/oauth2.0/token?grant_type=refresh_token';
var userinfo_url = 'https://graph.qq.com/user/get_user_info?';
var openid_url = "https://graph.qq.com/oauth2.0/me?access_token=";
var Promise = require('bluebird');
var signs = {};

var urlparams = function(params){
  var obj = {};
  params.split('&').forEach(function(val, index, arr){
    var kv = val.split('=');
    var strkv = '{"' + kv[0] + '": "' + kv[1] + '"}';
    var ext = JSON.parse(strkv);
    _.extend(obj, ext);
  });
  return obj;
}

var getAccessToken = function (code) {
  var app_id = sails.config.thirdlogin.qq['nowness'].app_id;
  var app_key = sails.config.thirdlogin.qq['nowness'].app_key;
  var redirect_url = sails.config.thirdlogin.qq['nowness'].redirect_url;
  var url = token_url + 'client_id=' + app_id + '&client_secret='+ app_key + '&code=' + code + '&redirect_uri=' + encodeURIComponent(redirect_url);
  sails.log(url);
  return new Promise(function (resolve, reject) {
    request(url, function (err, res, body) {
      if (err) {
        return reject(err);
      }
      var obj = urlparams(body);
      resolve(obj);
    });
  });
};

var refreshToken = function(refresh_token){
  var app_id = sails.config.thirdlogin.qq['nowness'].app_id;
  var app_key = sails.config.thirdlogin.qq['nowness'].app_key;
  var url = refresh_url + 'client_id=' + app_id + '&client_secret='+ app_key + '&code=' + code + '&refresh_token=' + refresh_token;
  return new Promise(function(resolve, reject){
   request(url, function(err, res, body){
    if(err){
      return reject(err);
    }
    var obj = urlparams(body);
    resolve(obj);
   });
  });
}

var getUserInfo = function(token, openid){
  var app_id = sails.config.thirdlogin.qq['nowness'].app_id;
  var url = userinfo_url + "access_token=" + token + "&oauth_consumer_key=" + app_id + "&openid=" + openid;
  sails.log(url);
  return new Promise(function(resolve,reject){
    request(url, function(err, res, body){
      if(err){
        return reject(err);
      }
      resolve(body);
    });
  });
}

var getOpenid = function (access_token, openid){
  var url = openid_url + access_token 
  return new Promise(function(resolve, reject){
    request(url, function(err, res, body){
      if (err){
        return reject(err);
      }
      sails.log(body);
      resolve(body);
    });
  });
}

module.exports = {
  getAccessToken: getAccessToken,
  getUserInfo: getUserInfo,
  getOpenid: getOpenid
}




var request = require('request');
var moment = require('moment');
var Sign = require('../Util/sign');
var rp = require('request-promise');
var Promise = require('bluebird');


var getAccessToken = function (appid, secret, code) {
  var url = token_url + 'appid=' + appid + '&secret='+ secret + '&code=' + code;
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
 * 获取brightcove的access_token
 */
function getAuthToken(){
  var account_id = sails.config.brightcove.accountOne.account_id;
  var client_id = sails.config.brightcove.accountOne.client_id;
  var client_secret = sails.config.brightcove.accountOne.client_secret;
  var police_key = sails.config.brightcove.accountOne.police_key;
  var auth_string = new Buffer(client_id + ':' + client_secret, 'base64').toString().replace('\n','');
  var options = {
    uri: 'https://oauth.brightcove.com/v3/access_token',
    qs: {
      "grant_type": "client_credentials"
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic " + auth_string
    }
  };
  rp(options).then(function(repos){
    sails.log(repos.access_token);
  }).catch(function(err){
    sails.log('xxxxxx');
  })
  return 'aa';
}

function getVideoUrl(){

}

module.exports = {
  getAuthToken: getAuthToken,
  getVideoUrl: getVideoUrl
}



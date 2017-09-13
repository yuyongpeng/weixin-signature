
var request = require('request');
var moment = require('moment');
var Sign = require('../Util/sign');
var rp = require('request-promise');
var errors = require('request-promise/errors');
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
/**
 * 获取brightcove的access_token
 */
function getAuthToken(video_id){
  var account_id = sails.config.brightcove.accountOne.account_id;
  var client_id = sails.config.brightcove.accountOne.client_id;
  var client_secret = sails.config.brightcove.accountOne.client_secret;
  var police_key = sails.config.brightcove.accountOne.police_key;
  var access_token = '';
  var auth_string = Buffer.from(client_id + ':' + client_secret).toString('base64');
  var options = {
    method: 'POST',
    uri: 'https://oauth.brightcove.com/v3/access_token',
    qs: {
      "grant_type": "client_credentials"
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic " + auth_string
    },
    json: true
  };
  rp(options).promise().then(function(repos){
    access_token = repos.access_token;
  }).catch(errors.StatusCodeError,function(reason){
    sails.log('1111111111111111111111111');
    sails.log(reason);
  }).catch(errors.RequestError, function(reason){
    sails.log('22222222222222222222222222');
    sails.log(reason);
  }).catch(errors.TransformError, function(reason){
    sails.log('33333333333333333333333333');
    sails.log(reason);
  }).catch(function(err){
    sails.log('44444444444444444444444444');
    sails.log(err);
  });
  var auth_string = Buffer.from(client_id + ':' + client_secret).toString('base64');
  var options = {
    method: 'GET',
    uri: 'https://cms.api.brightcove.com/v1/accounts/' + account_id + '/videos/' + video_id + '/sources',
    headers: {
      "Authorization": "Bearer " + access_token
    },
    json: true,
    simple: true
  };
  rp(options).promise().then(function(repos){
    var tmp_width = 0;
    var tmp_src = '';
    for (video in repos){
      if (repos[video].hasOwnProperty('src') && ! repos[video].hasOwnProperty('stream_name') && (repos[video].container === 'MP4')){
        var width = repos[video].width;
        if (width >= tmp_width) {
          tmp_src = repos[video].src;
        }
      }
    }
    sails.log('a: ' + tmp_src);
    return tmp_src;
  }).catch(errors.StatusCodeError,function(reason){
    sails.log('1111111111111111111111111');
    sails.log(reason);
  }).catch(errors.RequestError, function(reason){
    sails.log('22222222222222222222222222');
    sails.log(reason);
  }).catch(errors.TransformError, function(reason){
    sails.log('33333333333333333333333333');
    sails.log(reason);
  }).catch(function(err){
    sails.log('44444444444444444444444444');
    sails.log(err);
  });
  return access_token;
}

function getVideoUrl(access_token, video_id){
  var account_id = sails.config.brightcove.accountOne.account_id;
  var client_id = sails.config.brightcove.accountOne.client_id;
  var client_secret = sails.config.brightcove.accountOne.client_secret;
  var police_key = sails.config.brightcove.accountOne.police_key;
  var auth_string = Buffer.from(client_id + ':' + client_secret).toString('base64');
  var options = {
    method: 'GET',
    uri: 'https://cms.api.brightcove.com/v1/accounts/' + account_id + '/videos/' + video_id + '/sources',
    headers: {
      "Authorization": "Bearer " + access_token
    },
    json: true,
    simple: true
  };
  rp(options).promise().then(function(repos){
    var tmp_width = 0;
    var tmp_src = '';
    for (video in repos){
      if (repos[video].hasOwnProperty('src') && ! repos[video].hasOwnProperty('stream_name') && (repos[video].container === 'MP4')){
        var width = repos[video].width;
        if (width >= tmp_width) {
          tmp_src = repos[video].src;
        }
      }
    }
    sails.log('a: ' + tmp_src);
    return tmp_src;
  }).catch(errors.StatusCodeError,function(reason){
    sails.log('1111111111111111111111111');
    sails.log(reason);
  }).catch(errors.RequestError, function(reason){
    sails.log('22222222222222222222222222');
    sails.log(reason);
  }).catch(errors.TransformError, function(reason){
    sails.log('33333333333333333333333333');
    sails.log(reason);
  }).catch(function(err){
    sails.log('44444444444444444444444444');
    sails.log(err);
  }).done();
  return access_token;
}

function getVideoUrl2(access_token, video_id){
  return new Promise(function(resolve, reject){
    var account_id = sails.config.brightcove.accountOne.account_id;
    var client_id = sails.config.brightcove.accountOne.client_id;
    var client_secret = sails.config.brightcove.accountOne.client_secret;
    var police_key = sails.config.brightcove.accountOne.police_key;
    var auth_string = Buffer.from(client_id + ':' + client_secret).toString('base64');
    sails.log(auth_string);
    var options = {
      method: 'GET',
      uri: 'https://cms.api.brightcove.com/v1/accounts/' + account_id + '/videos/' + video_id + '/sources',
      headers: {
        "Authorization": "Bearer " + access_token
      },
      json: true
    };
    rp(options).promise().then(function(repos){
      var tmp_width = 0;
      var tmp_src = '';
      for (video in repos){
        if (repos[video].hasOwnProperty('src') && ! repos[video].hasOwnProperty('stream_name') && (repos[video].container === 'MP4')){
          var width = repos[video].width;
          if (width >= tmp_width) {
            tmp_src = repos[video].src;
          }
        }
      }
      sails.log('a: ' + tmp_src);
      return tmp_src;
    }).catch(errors.StatusCodeError,function(reason){
      sails.log('1111111111111111111111111');
      sails.log(reason);
    }).catch(errors.RequestError, function(reason){
      sails.log('22222222222222222222222222');
      sails.log(reason);
    }).catch(errors.TransformError, function(reason){
      sails.log('33333333333333333333333333');
      sails.log(reason);
    }).catch(function(err){
      sails.log('44444444444444444444444444');
      sails.log(err);
    }).done();
  });
}
module.exports = {
  getAuthToken: getAuthToken,
  getVideoUrl: getVideoUrl
}



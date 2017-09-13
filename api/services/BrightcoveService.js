
var request = require('request');
var moment = require('moment');
var Sign = require('../Util/sign');
var rp = require('request-promise');
var errors = require('request-promise/errors');
var Promise = require('bluebird');

/**
 * 获取brightcove的access_token
 */
function getAuthToken(){
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
  var p = new Promise(function(resolve, reject){
    request(options, function(err, response,body){
      if (err) {
        return reject(err);
      } else if (!(/^2/.test('' + response.statusCode))) { // Status Codes other than 2xx
        return reject("return code not 2XX");
      } else {
        sails.log('access_token : ' + body.access_token);
        resolve(body.access_token);
      }
    });
  });
  return p;
}

function getVideoUrl(access_token, video_id){
  var account_id = sails.config.brightcove.accountOne.account_id;
  var client_id = sails.config.brightcove.accountOne.client_id;
  var client_secret = sails.config.brightcove.accountOne.client_secret;
  var police_key = sails.config.brightcove.accountOne.police_key;
  var auth_string = Buffer.from(client_id + ':' + client_secret).toString('base64');
  var uri = 'https://cms.api.brightcove.com/v1/accounts/' + account_id + '/videos/' + video_id + '/sources';
  var options = {
    method: 'GET',
    uri: uri,
    headers: {
      "Authorization": "Bearer " + access_token
    },
    json: true
  };
  var p = new Promise(function(resolve, reject){
    request(options, function(err, response, repos){
      if (err) {
        return reject(err);
      } else if (!(/^2/.test('' + response.statusCode))) { // Status Codes other than 2xx
        sails.log('statusCode : ' + response.statusCode);
        if (response.statusCode == 404){
          return reject({err:1,msg:uri + ' not found [404], it is possible that the video not exist.'});
        }else{
          return reject({err:2,msg:'stateCode: ' + string(response.statusCode) + ' , request brightcove response stateCode not 2XX.'});
        }
      } else {
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
        resolve(tmp_src);
      }
    });
  });
  return p;
}

function all(video_id){
  getAuthToken().then(function(data){
    return getVideoUrl(data, video_id);
  }).then(function(data){
    sails.log('b ' + data);
    return data;
  });
}

module.exports = {
  all: all,
  getAuthToken: getAuthToken,
  getVideoUrl: getVideoUrl
}



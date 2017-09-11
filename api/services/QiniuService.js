
var request = require('request');
var moment = require('moment');
var qiniu = require('qiniu');
var _ = require('underscore');

var getUploadToken = function (appid, secret, code) {
  var accessKey = sails.config.qiniu.AccessKey;
  var secretKey = sails.config.qiniu.SecretKey;
  sails.log(accessKey);
  var bucket = 'test';
  var keyToOverwrite = 'test.jpg';
  var options = {
    scope: bucket + ':' + keyToOverwrite,
    expires: 7200
  };
  var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  var putPolicy = new qiniu.rs.PutPolicy(options);
  var uploadToken=putPolicy.uploadToken(mac);
  return uploadToken; 
};

module.exports = {
  getUploadToken: getUploadToken
}



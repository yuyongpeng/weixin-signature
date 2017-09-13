
var request = require('request');
var moment = require('moment');
var qiniu = require('qiniu');
var _ = require('underscore');
var moment = require('moment');

var getUploadToken = function () {
  var accessKey = sails.config.qiniu.AccessKey;
  var secretKey = sails.config.qiniu.SecretKey;
  sails.log(accessKey);
  var bucket = 'test';
  var keyToOverwrite = 'test2.jpg';
  var options = {
    "scope": bucket ,
    //"scope": bucket + ':' + keyToOverwrite,
    "expires": 7200
  };
  var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  var putPolicy = new qiniu.rs.PutPolicy(options);
  var uploadToken=putPolicy.uploadToken(mac);
  return uploadToken; 
};

var getPath = function(){
  var Range = 9999999999 - 1000000000;
  var Rand = Math.random();
  var num = 1000000000 + Math.round(Rand * Range); //四舍五入
  var datePath = moment().format('/YYYY/MM/DD/');
  sails.log(num);
  return datePath + String(num) + '-';
}

module.exports = {
  getUploadToken: getUploadToken,
  getPath: getPath
}



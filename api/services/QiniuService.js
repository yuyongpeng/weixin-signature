
var request = require('request');
var moment = require('moment');
var qiniu = require('qiniu');
var _ = require('underscore');
var moment = require('moment');

var getUploadToken = function () {
  var accessKey = sails.config.qiniu.AccessKey;
  var secretKey = sails.config.qiniu.SecretKey;
  var bucket = sails.config.qiniu.bucket;
  sails.log(accessKey);
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
  var datePath = moment().format('YYYY/MM/DD/');
  return datePath + randomWord(false, 10);
  //return datePath + String(num) + '-';
}
/*
** randomWord 产生任意长度随机字母数字组合
** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
** xuanfeng 2014-08-28
*/
 
function randomWord(randomFlag, min, max){
  var str = "",
      range = min,
      arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  // 随机产生 a1puyfz99n6447tjx86t1e5d41b825712be45a59713c9c9d3a2e
  if(randomFlag){
      range = Math.round(Math.random() * (max-min)) + min;
  }
  for(var i=0; i<range; i++){
      pos = Math.round(Math.random() * (arr.length-1));
      str += arr[pos];
  }
  sails.log(str);
  return str;
}
module.exports = {
  getUploadToken: getUploadToken,
  getPath: getPath
}



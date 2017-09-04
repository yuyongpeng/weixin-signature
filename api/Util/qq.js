
var urlparams = function(params){
  var obj = {};
  params.split('&').forEach(function(val, index, arr){
    var kv = val.split('=');
    var key = kv[0];
    var value = kv[1];
    obj.key = value;
  });
  return obj;
}

module.exports = urlparams;

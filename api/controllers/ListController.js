/**
 * 获取视频信息存入数据库中
 * @param {*} req 
 * @param {*} res 
 */
function nownessvideo(req, res) {
  sails.log(req.allParams());
  var columns = req.allParams().columns;
  var order = req.allParams().order;
  var skip = req.allParams().start;
  var limit = req.allParams().length;
  var search = req.allParams().search.value;

  var ret_obj = {};

  Videofiles.count({status:1}).then(function (found) {
    ret_obj['iTotalRecords'] = found;
    ret_obj['iTotalDisplayRecords'] = found;
    ret_obj['sColumns'] = 'nownessname,title,category,keyword,email,debut,url';
    return found;
  }).then(function (data) {
    var p = new Promise(function (resolve, reject) {
      var query = Videofiles.find();
      columns.forEach(function (val, index, arr) {
        if (val.searchable) {
          var data = val.data;
          var value = val.search.value;
          if (value != '' && value !== undefined) {
            var where_q = {};
            var startsWith = {};
            startsWith['startsWith'] = value;
            where_q[data] = startsWith;
            where_q['status'] = 1;
            query.where(where_q);
          }
        }
      });
      query.where({status: 1});
      order.forEach(function (val, index, arr) {
        var col = val.column;
        var dir = val.dir;
        var col_name = columns[col].data
        var orderN = col_name + ' ' + dir;
        query.sort(orderN);
      });
      query.skip(skip).limit(limit);
      query.exec(function (err, data) {
        ret_obj['aaData'] = [];
        data.forEach(function (val, index, arr) {
          var obj = {};
          obj['id'] = val['id'];
          obj['nownessname'] = val['nownessname'];
          obj['title'] = '<a target=_blank href="'+val['url']+'">' + val['title'] + '</a>';
          obj['category'] = '文化';
          switch(val['category']){
            case 1:
              obj['category'] = '文化';
              break;
            case 2:
              obj['category'] = '美食与旅行';
              break;
            case 3:
              obj['category'] = '艺术与设计';
              break;
            case 4:
              obj['category'] = '音乐';
              break;
            case 5:
              obj['category'] = '时尚与美容';
              break;
          }
          obj['debut'] = val['debut']==1 ? '是' : '否';
          obj['url'] = val['url'];
          ret_obj['aaData'].push(obj);
        });
        resolve(ret_obj);
      });
    });
    return p;
  }).then(function (data) {
    sails.log(data);
    return res.json(200, data);
  }).catch(function (reason) {
    sails.log(reason);
  });
}

function deletevideo(req, res){
  var id = req.allParams().id; 
  Videofiles.update({id:id},{status:0}).then(function(data){
    // 删除成功后显示的data是删除的数据。
    return res.json(200,{success: true});
  }).catch(function(reason){
    sails.log(reason);
    return res.json(200,{success: false});
  }); 
}

module.exports = {
  listvideo: nownessvideo,
  deletevideo: deletevideo
}

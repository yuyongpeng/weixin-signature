
function uploadFile(req, res) {
  var uploadToken = QiniuService.getUploadToken();
  var path = QiniuService.getPath();
  return res.view('qiniuupload', {
    'uploadToken': uploadToken,
    'filePath': path
  })
}

function test(req, res){
  //sails.models.category.find().exec(function(err, all){
//  Category.find().exec(function(err, all){
//   if (err)
//      sails.log(err);
//    sails.log(all);
//  });
  var category1 = {
    name: 'test1',
    lang: 'cn'
  };
  Category.create(category1).exec(function(err, finn){
    if (err)
      sails.log(err);
    sails.log(finn);
  });
  Category.find({id:33}).exec(function(err, all){
    sails.log(all);
    all[0].name = 'test222222';
    sails.log(all[0]);
    Category.update({id: all[0].id}, all[0]).exec(function(err,finn){
      if(err)
        sails.log(err);
      sails.log(finn);
    });
  });
  return res.ok();
}

/**
 * 获取视频信息存入数据库中
 * @param {*} req 
 * @param {*} res 
 */
function nownessvideo(req, res){
  var domain = '7xpvul.com2.z0.glb.qiniucdn.com';
  var nownessid = req.body.nownessid || 0;
  var nownessname = req.body.nownessname;
  var title = req.body.title;
  var qiniufile = req.body.qiniufile;
  var file = qiniufile.split('-');

  var subtitle = req.body.subtitle;
  var category = req.body.category;
  var keyword = req.body.keyword;
  var email = req.body.email;
  var debut = req.body.debut;
  var extvideourl = req.body.extvideourl;
  var content = req.body.content;
  sails.log(qiniufile);
  sails.log(debut);
  var videofile = {
    nownessid: nownessid,
    nownessname: nownessname,
    title: title,
    subtitle: subtitle,
    category: category,
    keyword: keyword,
    email: email,
    debut: debut,
    originalfilename: file[1],
    url: 'http://' + domain + '/' + qiniufile,
    extvideourl: extvideourl,
    content: content
  };
  Videofiles.create(videofile).exec(function(err, ret){
    if (err)
      sails.log(err);
    sails.log(ret);
  });
}


module.exports = {
    uploadFile: uploadFile,
    nownessvideo: nownessvideo,
    test: test
}

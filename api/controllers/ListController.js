
function uploadFile(req, res) {
  var uploadToken = QiniuService.getUploadToken();
  var path = QiniuService.getPath();
  return res.view('qiniuupload', {
    'uploadToken': uploadToken,
    'filePath': path
  })
}

/**
 * 获取视频信息存入数据库中
 * @param {*} req 
 * @param {*} res 
 */
function nownessvideo(req, res) {
  var domain = '7xpvul.com2.z0.glb.qiniucdn.com';
  var nownessid = req.body.nownessid || 0;
  var nownessname = req.body.nownessname;
  var title = req.body.title;
  var qiniufile = req.body.qiniufile;
  var url = '';
  if (qiniufile != undefined && qiniufile != "") {
    url = 'http://' + domain + '/' + qiniufile;
  }
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
    url: url,
    extvideourl: extvideourl,
    content: content
  };
  Videofiles.create(videofile).exec(function (err, ret) {
    if (err) {
      res.negotiate(err);
      sails.log(err);
    }

    sails.log(ret);
    res.status(200);
    // return res.location('http://localhost:1337/video/qiniuupload');
    return res.status(200).send('成功<a href="/video/qiniuupload">返回</a>');
//    return res.status(200).redirect('http://localhost:1337/video/qiniuupload');
  });
}


module.exports = {
  uploadFile: uploadFile,
  nownessvideo: nownessvideo
}

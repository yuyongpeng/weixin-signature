
function uploadFile(req, res) {
  var uploadToken = QiniuService.getUploadToken();

  return res.view('qiniuupload', {
    'uploadToken': uploadToken
  })
}


module.exports = {
    uploadFile: uploadFile
}

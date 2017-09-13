
function uploadFile(req, res) {
  var uploadToken = QiniuService.getUploadToken();
  var path = QiniuService.getPath();
  return res.view('qiniuupload', {
    'uploadToken': uploadToken,
    'filePath': path
  })
}


module.exports = {
    uploadFile: uploadFile
}

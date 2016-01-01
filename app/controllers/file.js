/**
 * Created by vadimdez on 01/01/16.
 */
"use strict";

var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var fs = require('fs');

module.exports = (app) => {
  app.use('/', router);
};

router.get('/file', (req, res) => {
  res.render('file');
});

router.post('/upload', upload.single('upload_file'), (req, res) => {

  res
    .json(req.file)
    .end();

  // delete all files in the uploads folder
  var path = __dirname + '/../../uploads';
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file) {
      var curPath = path + "/" + file;
      if(fs.statSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
  }

});
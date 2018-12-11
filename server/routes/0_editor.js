"use strict";

const router = require('express').Router();

const editorConfig = require('../config/editorConfig');
const CONSTANT = require("../config/systemConstant");

const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

// ueditor validate
router.get('/', function(req, res, next) {
    res.send(editorConfig);
});
router.post('/', function(req, res, next) {
    switch (req.query['action']){
        case 'uploadimage':
            let form = new formidable.IncomingForm();   //创建上传表单
            let type = 'editor';

            form.encoding = CONSTANT.CHARACTER.UTF8;		//设置编辑
            form.keepExtensions = true;	 //保留后缀
            form.uploadDir= global.config.path.uploadPath;
            if(type){
                form.uploadDir += '/'+type;
                if(!fs.existsSync(form.uploadDir)){
                    fs.mkdirSync(form.uploadDir);
                }
            }


            form.parse(req, function (err, fields, files) {
                if (err) {
                    logger.error("Error:" + err);
                    res.send(resUtil.error({
                        message : "文件上传失败"
                    }));
                }else{
                    let data = {}, file, fileUrl;
                    file = files.media || files.upfile;

                    data.name = file.name;
                    data.filePath = '/'+path.basename(file.path);
                    data.fileSize = file.size;
                    data.fileType = file.type;
                    data.lastModifiedDate = file.lastModifiedDate;
                    data.type = type;
                    data.filePath = '/' + type + data.filePath;
                    let result = "{\"name\":\""+ data.name +"\", \"originalName\": \""+ data.name +"\"" +
                        ", \"size\": "+ data.fileSize +", \"state\": \"SUCCESS\"" +
                        ", \"type\": \""+ data.fileType +"\"" +
                        ", \"url\": \""+global.config.path.imagePath+data.filePath+"\"}";
                    //var result = {
                    //    name:fileName,
                    //    originalName:fileName,
                    //    size:files.upfile.size,
                    //    state:"SUCCESS",
                    //    type:files.upfile.type,
                    //    url:'/uploadFiles/images/icon_tx.png'
                    //};
                    res.set('Content-Type', 'text/html;charset=utf-8');
                    res.send(result);
                }
            });
            break;
    }
});

module.exports = router;

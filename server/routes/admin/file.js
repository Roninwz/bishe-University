/**
* Created by wangshuyi on 8/9/2017, 9:00:40 AM.
*/

'use strict';

const extend = require('extend');

const express = require('express');
const router = express.Router();

const logger = require('log4js').getLogger("sys");

const resUtil = require("../../module/util/resUtil");
const reqUtil = require("../../module/util/reqUtil");
const CONSTANT = require("../../config/systemConstant");
const config = require("../../config/config");

const service = require("../../service/FileService");

const formidable = require('formidable');
const xlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

/* GET users listing. */
//列表
router.post('/list', function(req, res, next) {
    let condition = req.body, query = req.query,
    populate = '';
    condition = reqUtil.formatCondition(condition);

    service
        .findForPage(req.curUser, query.pageSize, query.pageNumber, condition, populate)
        .then(
            data => res.send(resUtil.success(data)),
            err => res.send(resUtil.error())
        );
});
//所有
router.get('/find', function(req, res, next) {
    let condition = req.query;
    condition = reqUtil.formatCondition(condition);

    service
        .find(req.curUser, condition)
        .then(
            data => res.send(resUtil.success({rows:data})),
            err => res.send(resUtil.error())
        );
});
//更新
router.post('/save/:id', function(req, res, next) {
    let data = req.body;
    let _id = req.params.id;

    service
        .updateById(req.curUser, _id, data)
        .then(
            data => res.send(resUtil.success({data:data})),
            err => res.send(resUtil.error(err))
        );
    });
//新增
router.post('/save', function(req, res, next) {
    let form = new formidable.IncomingForm();   //创建上传表单
    let type = req.query.type;

    form.encoding = CONSTANT.CHARACTER.UTF8;		//设置编辑
    form.keepExtensions = true;	 //保留后缀
    // form.maxFieldsSize = 5 * 1024 * 1024;   //文件大小
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
            if(type){
                data.type = type;
                data.filePath = '/' + type + data.filePath;
            }
            if(data.type === 'editor'){
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
            }else {
                service.save(req.curUser, data).then(
                    data => res.send(resUtil.success({data:data})),
                    err => res.send(resUtil.error())
                );
            }
        }
    });
});


/*
* 失物招领图片上传
* */

router.post('/save/lost', function(req, res, next) {
    let form = new formidable.IncomingForm();   //创建上传表单
    let type = 'lost-item';

    form.encoding = CONSTANT.CHARACTER.UTF8;		//设置编辑
    form.keepExtensions = true;	 //保留后缀
    // form.maxFieldsSize = 5 * 1024 * 1024;   //文件大小
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
            file = files.imgUrl || files.upfile;
            data.type = type;
            data.filePath = '/' + type + data.filePath;
            data.name = file.name;
            data.fileSize = file.size;
            data.fileType = file.type;
            data.lastModifiedDate = file.lastModifiedDate;
            console.log("data1:"+data);
                service.save(req.curUser, data).then(
                    data =>{
                        console.log("data1:"+data);
                        res.send(resUtil.success({data:data}));
                    },
                    err => res.send(resUtil.error())
                );
        }
    });
});

//base64格式的图片
router.post('/base64', function (req, res, next) {
    let file = req.body.media;
    let type = req.query.type;
    let filePath = global.config.path.uploadPath;
    let data = {};
    if(type){
        filePath += '/' + type;
        if(!fs.existsSync(filePath)){
            fs.mkdirSync(filePath);
        }
    }

    let fileBuffer = new Buffer(file, 'base64'); //把base64码转成buffer对象
    let fileName =  uuid.v4() + '.png';
    filePath += '/' + fileName;
    fs.writeFile(filePath, fileBuffer, function(err){//用fs写入文件
        if(err){
            console.log(err);
        }else{
            data.name = fileName;
            if(type){
                data.filePath = '/' + path.join(type, fileName);
            }else{
                data.filePath = '/' + fileName;
            }
            data.fileType = 'image/png';
            data.type = type;
            service.save(req.curUser, data).then(
                data => res.send(resUtil.success({data:data})),
                err => res.send(resUtil.error())
            );
        }
    })
});

//删除
router.get('/remove/:id', function(req, res, next) {
    let _id = req.params.id;

    service
        .removeById(req.curUser, _id)
        .then(
            data => res.send(resUtil.success({data:data})),
            err => res.send(resUtil.error())
        );
});
//批量删除
router.post('/remove', function(req, res, next) {
    let body = req.body;
    let condition = {
        _id : {"$in" : body.ids}
    };

    service
        .remove(req.curUser, condition)
        .then(
            data => res.send(resUtil.success({data:data})),
            err => res.send(resUtil.error())
        );
});
//详情
router.get('/detail/:id', function(req, res, next) {
    let _id = req.params.id;
    let populate = "";

    service
        .findById(req.curUser, _id, populate)
        .then(
            data => res.send(resUtil.success({data:data})),
            err => res.send(resUtil.error())
        );
});
//获取文件
router.get('/get/:id', function(req, res, next) {
    let _id = req.params.id;
    let populate = "";

    service.updateById(req.curUser, _id, {lastUseTime: new Date()}).then(
        file => res.redirect(config.path.publicUploadPath + file.filePath),
        err => res.redirect('/view/common/notFound')
    );
});
//下载文件
router.get('/download/:id', function(req, res, next) {
    let _id = req.params.id;
    let populate = "";

    service.updateById(req.curUser, _id, {lastUseTime: new Date()}).then(
        file => res.download(config.path.uploadPath + file.filePath),
        err => res.redirect('/view/common/notFound')
    );
});

//导入
router.post('/import', function (req, res, next) {
    let form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';		//设置编辑
    form.keepExtensions = true;	 //保留后缀
    form.maxFieldsSize = 5 * 1024 * 1024;   //文件大小

    form.parse(req, function (err, fields, files) {
        if (err) {
            logger.error("Error:" + err);
            res.send(resUtil.error({
                message : "文件上传失败"
            }));
        }else{
            let file,
            importData = [],
            ids = [];
            file = files.media;

            const workSheetsFromFile = xlsx.parse(file.path);
            workSheetsFromFile[0].data.forEach(function (data,i) {
                if(i > 0 && data.length > 0){
                    let _data = {};

                    if(data[0]){ids.push(data[0]);_data['_id'] = data[0];}
                    if(data[1]){_data['name'] = data[1];}
                    if(data[2]){_data['filePath'] = data[2];}
                    if(data[3]){_data['fileSize'] = data[3];}
                    if(data[4]){_data['fileType'] = data[4];}
                    if(data[5]){_data['lastUseTime'] = data[5];}
                    if(data[6]){_data['locked'] = data[6];}
                    if(data[7]){_data['type'] = data[7];}
                    if(data[8]){_data['tenant'] = data[8];}
                    if(data[9]){_data['state'] = data[9];}
                    if(data[10]){_data['createTime'] = data[10];}
                    if(data[11]){_data['creater'] = data[11];}
                    if(data[12]){_data['updateTime'] = data[12];}
                    if(data[13]){_data['updater'] = data[13];}

                    importData.push(_data);
                }
            });

            service.remove(req.curUser, {_id:{'$in':ids}}).then(()=>{
                service.create(req.curUser, importData).then(result => {
                    fs.unlinkSync(file.path);
                    res.send(resUtil.success());
                }, err => {
                    res.send(resUtil.error({massage: err}));
                });
            }, err => {
                res.send(resUtil.error({massage: err}));
            });
        }
    });
});
//导出
router.get('/export', function(req, res, next) {
    let condition = req.query, tableConfig,
    _data = [],
    i, j, y;
    condition = reqUtil.formatCondition(condition);

    service.find(req.curUser, condition).then(data => {
        _data.push([
            '_id',
            '名称',
            'filePath',
            'fileSize',
            'fileType',
            'lastUseTime',
            'locked',
            '类型',
            '租户',
            '状态',
            '创建时间',
            '创建人',
            '更新时间',
            '更新人',
        ]);

        data.forEach(d => {
            _data.push([
                d['_id'],
                d['name'],
                d['filePath'],
                d['fileSize'],
                d['fileType'],
                d['lastUseTime'],
                d['locked'],
                d['type'],
                d['tenant'],
                d['state'],
                d['createTime'],
                d['creater'],
                d['updateTime'],
                d['updater'],
            ]);
        });

        const buffer = xlsx.build([{name: "U_File", data: _data}]);
        let fileName = `/U_File_export${tool.dateFormatter(new Date(), 'yyyyMMdd')}.xlsx`;
        fs.writeFile(`${__dirname}/../../${fileName}`, buffer, function () {
            res.download(`${__dirname}/../../${fileName}`, fileName, function () {
                fs.unlink(`${__dirname}/../../${fileName}`);
            });
        });
    });
});

module.exports = router;

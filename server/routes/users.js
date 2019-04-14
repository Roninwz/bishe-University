'use strict';
const express = require('express');
const router = express.Router();

const logger = require('log4js').getLogger("sys");

const resUtil = require("../module/util/resUtil");
const reqUtil = require("../module/util/reqUtil");
const config = require("../config/config");
const service = require("../service/UserService");
const tool = require("../module/util/tool");
const formidable = require('formidable');
const request = require('request');
var md5 = require('md5-node');
/* GET users listing. */
/**
 * 用户列表--分页
 */
router.post('/list', function (req, res, next) {
    let condition = req.body, query = req.query,
        populate = 'creater updater';
    service
        .findForPage(config['dbUser']['robot'], query.pageSize, query.pageNumber, condition, populate)
        .then(
            data => res.send(resUtil.success(data)),
            err => res.send(resUtil.error())
        );
});

/**
 * 用户查询方法
 */
router.get('/find', function (req, res, next) {
    let condition = req.query;
    condition = reqUtil.formatCondition(condition);
    service
        .find(config['dbUser']['robot'], condition)
        .then(
            data => res.send(resUtil.success({rows: data})),
            err => res.send(resUtil.error())
        );
});


/**
 * 用户更新方法
 */
router.post('/save/:id', function (req, res, next) {
    let data = req.body;
    let _id = req.params.id;

    service
        .updateById(req.curUser, _id, data)
        .then(
            data => res.send(resUtil.success({data: data})),
            err => res.send(resUtil.error())
        );
});


/**
 * 用户
 */
router.post('/save', function (req, res, next) {
    let data = req.body;

    service
        .save(config['dbUser']['robot'], data)
        .then(
            data => res.send(resUtil.success({data: data})),
            err => res.send(resUtil.error())
        );
});


/**
 * 根据id删除用户
 */
router.get('/remove/:id', function (req, res, next) {
    let _id = req.params.id;

    service
        .removeById(req.curUser, _id)
        .then(
            data => res.send(resUtil.success({data: data})),
            err => res.send(resUtil.error())
        );
});
/**
 * 批量删除用户
 */
router.post('/remove', function (req, res, next) {
    let body = req.body;
    let condition = {
        _id: {"$in": body.ids}
    };

    service
        .remove(req.curUser, condition)
        .then(
            data => res.send(resUtil.success({data: data})),
            err => res.send(resUtil.error())
        );
});


/*
*
* 获取短信验证码
* */
router.get('/getCode', function (req, res, next) {
    //let phone = req.body.phone;//18638697525
    let timestamp = (new Date()).getTime()
    let phone = req.query.phone;//18638697525
    let code = tool.random(6);
    let reqData = {
        accountSid: config.miaodi.accountSid,
        to: phone,
        // Msg: '您的验证码是：' + code + '（5分钟有效）请勿向他人泄露。如非本人操作，可不用理会【格兰富】',
        smsContent: '【IT大学网】尊敬的用户，您的验证码为' + code + '，请于30分钟内正确输入，如非本人操作，请忽略此短信。',
        timestamp: timestamp,
        sig: md5(config.miaodi.accountSid + config.miaodi.token + timestamp),
        respDataType: JSON
    };
    request.post({
            url: config.miaodi.api,
            form: reqData
        },
        function (error, response, body) {
            if (!error && response.statusCode === 200) {
                req.session.identifyingCode = code;
                res.send(resUtil.success({message: "获取验证码成功"}));
            } else {
                res.send(resUtil.error({message: body.respDesc}));
            }
        });
    req.session.identifyingCode = code;

});

/**
 * 用户注册
 */
router.post('/register', function (req, res, next) {
    let myData = req.body;
    let user = {name:myData.name, password: myData.password, phone: myData.phone};
    if (req.session['identifyingCode'] && req.session['identifyingCode'].toString() === myData.code.toString()){

        service.findOne(config['dbUser']['robot'], {name:myData.name},populate).then((result) => {
            if(result){
                res.send(resUtil.error({message: '用户名已存在'}));
            }else {
                service
                    .save(config['dbUser']['robot'], user)
                    .then(
                        data => {
                            res.send(resUtil.success({data: data,message: '注册成功'}))
                        },
                        err => res.send(resUtil.error())
                    );
            }

        });

    }else {
        res.send(resUtil.error({message: '验证码不正确'}));
    }
});


/**
 * 用户查询方法
 */
router.post('/login', function (req, res, next) {
    let condition = req.body;
    condition = reqUtil.formatCondition(condition);
    service
        .findOne(config['dbUser']['robot'], condition)
        .then(
            data => {
                if(data){
                    res.send(resUtil.success({data: data,message:'登录成功'}))
                }else {
                    res.send(resUtil.error({data: data,message:'用户名或密码不正确'}))
                }
            },

            err => res.send(resUtil.error({message:'登录失败'}))
        );
});

module.exports = router;

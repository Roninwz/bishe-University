'use strict';
const express = require('express');
const router = express.Router();

const logger = require('log4js').getLogger("sys");

const resUtil = require("../module/util/resUtil");
const reqUtil = require("../module/util/reqUtil");
const config = require("../config/config");
const service = require("../service/UserService");

const formidable = require('formidable');

/* GET users listing. */
/**
 * 用户列表--分页
 */
router.post('/list', function(req, res, next) {
    let condition = req.body, query = req.query,
        populate = 'creater updater';
    service
        .findForPage(req.curUser, query.pageSize, query.pageNumber, condition, populate)
        .then(
            data => res.send(resUtil.success(data)),
            err => res.send(resUtil.error())
        );
});

/**
 * 用户查询方法
 */
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


/**
 * 用户更新方法
 */
router.post('/save/:id', function(req, res, next) {
    let data = req.body;
    let _id = req.params.id;

    service
        .updateById(req.curUser, _id, data)
        .then(
            data => res.send(resUtil.success({data:data})),
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
router.get('/remove/:id', function(req, res, next) {
    let _id = req.params.id;

    service
        .removeById(req.curUser, _id)
        .then(
            data => res.send(resUtil.success({data:data})),
            err => res.send(resUtil.error())
        );
});
/**
 * 批量删除用户
 */
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

module.exports = router;

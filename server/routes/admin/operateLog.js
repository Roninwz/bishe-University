/**
 *
 * @author Roninwz
 * @date 2018/12/24 21:32
 * @since 1.0.0
 */

'use strict';
const express = require('express');
const router = express.Router();

const logger = require('log4js').getLogger("sys");

const resUtil = require("../../module/util/resUtil");
const reqUtil = require("../../module/util/reqUtil");

const service = require("../../service/OperateLogService");

const formidable = require('formidable');
const fs = require('fs');

/* GET users listing. */
//列表
router.post('/list', function (req, res, next) {
    let condition = req.body, query = req.query,
        populate = 'creater updater';
    condition = reqUtil.formatCondition(condition);

    service
        .findForPage(req.curUser, query.pageSize, query.pageNumber, condition, populate)
        .then(
            data => res.send(resUtil.success(data)),
            err => res.send(resUtil.error())
        );
});
//所有
router.get('/find', function (req, res, next) {
    let condition = req.query;
    condition = reqUtil.formatCondition(condition);

    service
        .find(req.curUser, condition)
        .then(
            data => res.send(resUtil.success({rows: data})),
            err => res.send(resUtil.error())
        );
});
//更新
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
//新增
router.post('/save', function (req, res, next) {
    let data = req.body;

    service
        .save(req.curUser, data)
        .then(
            data => res.send(resUtil.success({data: data})),
            err => res.send(resUtil.error())
        );
});
//删除
router.get('/remove/:id', function (req, res, next) {
    let _id = req.params.id;

    service
        .removeById(req.curUser, _id)
        .then(
            data => res.send(resUtil.success({data: data})),
            err => res.send(resUtil.error())
        );
});
//批量删除
router.post('/remove', function (req, res, next) {
    let condition = req.body;
    condition = reqUtil.formatCondition(condition);

    service
        .remove(req.curUser, condition)
        .then(
            data => res.send(resUtil.success({data: data})),
            err => res.send(resUtil.error())
        );
});
//详情
router.get('/detail/:id', function (req, res, next) {
    let _id = req.params.id;
    let populate = "creater";

    service
        .findById(req.curUser, _id, populate)
        .then(
            data => res.send(resUtil.success({data: data})),
            err => res.send(resUtil.error())
        );
});

module.exports = router;
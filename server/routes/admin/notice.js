/**
 *
 * @author Roninwz
 * @date 2018/12/10 18:08
 * @since 1.0.0
 */


'use strict';
const express = require('express');
const router = express.Router();

const logger = require('log4js').getLogger("sys");

const resUtil = require("../../module/util/resUtil");
const reqUtil = require("../../module/util/reqUtil");

const service = require("../../service/NoticeService");
const adminService = require("../../service/adminService");

const formidable = require('formidable');
const xlsx = require('node-xlsx');
const fs = require('fs');

/* GET users listing. */
//列表
router.post('/list', function (req, res, next) {
    let condition = req.body, query = req.query,
        populate = 'creater updater';
    condition = reqUtil.formatCondition(condition);

    service
        .findForPage(req.curUser, query.pageSize, query.pageNumber, condition, populate, {
            isTop: -1,
            topTime: -1,
            createTime: -1
        })
        .then(
            data => res.send(resUtil.success(data)),
            err => res.send(resUtil.error())
        );
});
//所有
router.get('/find', function (req, res, next) {
    let condition = req.query;
    condition = reqUtil.formatCondition(condition);
    let populate = "creater";
    service
        .find(req.curUser, condition, populate, {createTime: -1})
        .then(
            data => res.send(resUtil.success({rows: data})),
            err => res.send(resUtil.error())
        );
});

//查找最新的五篇文章
router.get('/findLastFive', function (req, res, next) {
    let populate = "creater";
    service
        .aggregate(req.curUser, [{$sort: {createTime: -1}}, {$limit: 5}])
        .then(
            data => res.send(resUtil.success({rows: data})),
            err => res.send(resUtil.error())
        );
});


//更新浏览量
router.post('/updateLookNum/:id', function (req, res, next) {
    let _id = req.params.id;
    let condition = req.body;
    condition = reqUtil.formatCondition(condition);
    let populate = "creater";
    service.findOne(req.curUser, {_id: _id}, populate).then((result) => {
        result.lookNum = result.lookNum + 1;
        service.updateById(req.curUser, _id, result).then(
            res.send(resUtil.success({data: result})),
            err => res.send(resUtil.error())
        );


    });
});


// router.get('/findLastTimeTen', function (req, res, next) {
//     let populate = "creater";
//     service
//         .aggregate(req.curUser, [{$lookup:{
//                 from: "M_Admin", // 关联到order表
//                 localField: "creater", // user 表关联的字段
//                 foreignField: "_id", // order 表关联的字段
//                 as: "user"
//             }},{$sort: {createTime: -1}},{$limit: 10}]).then(data => {
//
//                 res.send(resUtil.success({data: data})),
//                     err => res.send(resUtil.error())
//         });
// });


router.get('/findLastTimeTen', function (req, res, next) {
    let populate = "creater";
    service
        .aggregate(req.curUser, [{$sort: {createTime: -1}},{$limit: 10}]).then(data => {
                res.send(resUtil.success({data: data})),
                    err => res.send(resUtil.error())
        });
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
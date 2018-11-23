/**
 *
 * @author Roninwz
 * @date 2018/11/23 11:08
 * @since 1.0.0
 */

/**
 * Created by wangshuyi on 5/22/2017, 3:19:31 PM.
 */

'use strict';
const express = require('express');
const router = express.Router();

const logger = require('log4js').getLogger("sys");

const resUtil = require("../../module/util/resUtil");
const reqUtil = require("../../module/util/reqUtil");
const config = require("../../config/config");
const SMS = require("../../module/util/sms/alicloud-sms");

const userService = require("../../service/adminService");
const RoleService = require("../../service/RoleService");

const formidable = require('formidable');


/**
 * 管理员列表
 */
router.post('/list', function (req, res, next) {
    let condition = req.body, query = req.query,

        populate = 'creater role';
    condition = reqUtil.formatCondition(condition);

    let conditionPromise = [];
    if (condition['role_ref']) {
        conditionPromise.push(new Promise((resolve, reject) => {
            RoleService.findOne(req.curUser, {code: condition['role_ref']}).then(role => {
                condition.role = role ? role._id : null;
                delete condition['role_ref'];
                resolve();
            });
        }));
    }

    if (condition['role_refs']) {
        conditionPromise.push(new Promise((resolve, reject) => {
            RoleService.find(req.curUser, {code: {$in: condition['role_refs']}}).then(roleList => {
                condition.role = [];
                roleList.forEach(r => condition.role.push(r._id));
                delete condition['role_refs'];
                resolve();
            });
        }));
    }

    Promise.all(conditionPromise).then(() => {
        userService
            .findForPage(req.curUser, query.pageSize, query.pageNumber, condition, populate)
            .then(
                data => res.send(resUtil.success(data)),
                err => res.send(resUtil.error())
            );
    });
});

/**
 * 查找管理员
 */
router.get('/find', function (req, res, next) {
    let condition = req.query;
    condition = reqUtil.formatCondition(condition);

    userService
        .find(req.curUser, condition)
        .then(
            data => res.send(resUtil.success({rows: data})),
            err => res.send(resUtil.error())
        );
});



/**
 * 管理员更新
 */
router.post('/save/:id', function (req, res, next) {
    let data = req.body;
    let _id = req.params.id;
    userService
        .updateById(req.curUser, _id, data)
        .then(
            data => res.send(resUtil.success({data: data})),
            err => res.send(resUtil.error())
        );
});

/**
 * 删除管理员
 */
router.get('/remove/:id', function (req, res, next) {
    let _id = req.params.id;

    userService
        .removeById(req.curUser, _id)
        .then(
            data => res.send(resUtil.success({data: data})),
            err => res.send(resUtil.error())
        );
});
/**
 * 批量删除管理员
 */
router.post('/remove', function (req, res, next) {
    let body = req.body;
    let condition = {
        _id: {"$in": body.ids}
    };

    userService
        .remove(req.curUser, condition)
        .then(
            data => res.send(resUtil.success({data: data})),
            err => res.send(resUtil.error())
        );
});


/**
 * 修改密码
 */
router.post('/changePwd', function (req, res, next) {
    let data = req.body;

    userService.findById(req.curUser, req.curUser._id).then(user => {
        if (user.password === data.oldPassword) {
            userService.updateById(req.curUser, req.curUser._id, {password: data.newPassword}).then(
                data => res.send(resUtil.success()),
                err => res.send(resUtil.error())
            )
        } else {
            res.send(resUtil.error({message: '旧密码输入不正确'}));
        }
    });
});
/**
 * 批量修改角色
 */
router.post('/changeRole', function (req, res, next) {
    let data = req.body;

    userService.update(req.curUser, {_id: {$in: data.ids}}, {role: data.role}, {multi: true}).then(
        data => res.send(resUtil.success({data: data})),
        err => res.send(resUtil.error())
    )
});

//新增
router.post('/save', function (req, res, next) {
    let data = req.body;
    userService
        .save(req.curUser, data)
        .then(
            data => res.send(resUtil.success({data: data})),
            err => res.send(resUtil.error())
        );
});
/**
 * 分页查询用户, 可根据条件过滤
 */
router.get('/', function (req, res, next) {
    //查询条件
    let condition = req.query;
    // 分页参数
    const pageSize = condition.pageSize, pageNumber = condition.pageNumber;

    //  删除
    delete condition.pageSize;
    delete condition.pageNumber;

    userService
        .findForPage(req.curUser, pageSize, pageNumber, condition)
        .then(
            data => res.send(resUtil.success({rows: data})),
            err => res.send(resUtil.error())
        );
});



module.exports = router;

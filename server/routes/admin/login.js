'use strict';
const express = require('express');
const router = express.Router();
const logger = require('log4js').getLogger("login");
const uuid = require('uuid');
const adminService = require('../../service/adminService');
const config = require("../../config/config");
const resUtil = require("../../module/util/resUtil");


router.post('/loginCheck', function (req, res, next) {
    logger.info("username:" + req.body.username);
    console.log("body:" + JSON.stringify(req.body));
    console.log("body:" + req.body.username);
    adminService.check({}, req.body.username, req.body.password).then(admin => {
            adminService.login(req, admin.data).then(
                s => res.send(resUtil.success(s))
            );

        }
        , e => res.send(resUtil.error(e)));
});

router.post('/addAdmin', function (req, res, next) {
    let data = {
        name: req.body.name,
        password: req.body.password
    }
    logger.info("username:" + req.body.name);
    logger.info("username:" + req.body.password);
    adminService.save({}, data).then(user => res.send(resUtil.success(user))
        , e => res.send(resUtil.error(e)));
});

module.exports = router;
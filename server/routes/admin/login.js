'use strict';
const express = require('express');
const router = express.Router();
const logger = require('log4js').getLogger("login");
const uuid = require('uuid');
const adminService = require('../../service/adminService');
const loginLogService = require('../../service/LoginLogService');
const config = require("../../config/config");
const resUtil = require("../../module/util/resUtil");
const roninwzUtil = require("../../module/util/myUtil");


router.post('/loginCheck', function (req, res, next) {
    let loginLog = {};
    loginLog.name = req.body.username;
    loginLog.address = roninwzUtil.getClientIp(req);
    if (loginLog.address.indexOf('127.0.0.1') !== -1) {
        loginLog.address = '本机';
        adminService.check({}, req.body.username, req.body.password).then(admin => {
                loginLog.status = 1;
                adminService.login(req, admin.data).then(
                    s => {
                        loginLogService.save(req.curUser, loginLog).then(data => {
                            res.send(resUtil.success(s));
                        });
                    });
            }
            , e => {
                loginLog.status = 0;
                loginLogService.save(req.curUser, loginLog).then(data => {
                    res.send(resUtil.error(e))
                });

            });
    } else {
        loginLogService.getAdressById(config.baiduLocation.api, config.baiduLocation.ak, config.baiduLocation.coor, '180.175.17.29').then(dataAddr => {
            loginLog.address = dataAddr.address;

            adminService.check({}, req.body.username, req.body.password).then(admin => {
                    loginLog.status = 1;
                    adminService.login(req, admin.data).then(
                        s => {
                            loginLogService.save(req.curUser, loginLog).then(data => {
                                res.send(resUtil.success(s));
                            });
                        });
                }
                , e => {
                    loginLog.status = 0;
                    loginLogService.save(req.curUser, loginLog).then(data => {
                        res.send(resUtil.error(e))
                    });

                });
        });
    }


});

router.post('/addAdmin', function (req, res, next) {
    let data = {
        name: req.body.name,
        password: req.body.password
    };
    logger.info("username:" + req.body.name);
    logger.info("username:" + req.body.password);
    adminService.save({}, data).then(user => res.send(resUtil.success(user))
        , e => res.send(resUtil.error(e)));
});

module.exports = router;
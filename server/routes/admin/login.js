'use strict';
const express = require('express');
const router = express.Router();
const logger = require('log4js').getLogger("login");
const uuid = require('uuid');
const adminService = require('../../service/adminService');
const config = require("../../config/config");
const resUtil = require("../../module/util/resUtil");
const WorkWXUtil = require("../../module/util/workWXUtil");



router.post('/', function (req, res, next) {
    adminService.check({}, req.body.username, req.body.password).then(user => res.send(resUtil.success(s))
    , e => res.send(resUtil.error(e)));
});
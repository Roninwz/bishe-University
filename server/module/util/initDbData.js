/**
 * Created by wangshuyi on 2017/1/18.
 */

'use strict';
const config = require('../../config/config');
const menuConfig = require('../../config/menuConfig');
const dictConfig = require('../../config/dictConfig');
const roleConfig = require('../../config/roleConfig');
const logger = require('log4js').getLogger("sys");

const AdminService = require('../../service/adminService');
const MenuService = require('../../service/MenuService');
const RoleService = require('../../service/RoleService');
const DictService = require('../../service/DictService');

const InitDbData = {};

InitDbData.init = function () {
    this.initMenu();
    this.initRole();
    this.initUser();
    this.initDict();
};

InitDbData.initUser = function () {
    const dbUser = config.dbUser;
    let key, data = [];
    AdminService.findById({}, dbUser.admin._id).then(flag => {
        if (!flag) {
            for (key in dbUser) {
                data.push(dbUser[key]);
            }
            AdminService.create({}, data).then(() => {
                logger.info("create " + "default admin" + " success");
            }, err => {
                logger.error("Error:" + err);
            });
        }
    });
};

InitDbData.initMenu = function () {
    MenuService.findOne({}, {_id: menuConfig[0]._id}).then(flag => {
        if (!flag) {
            MenuService.create({}, menuConfig).then(() => {
                logger.info("create " + "default menu" + " success");
            }, err => {
                logger.error("Error:" + err);
            });
        }
    })
};
InitDbData.initRole = function () {
    RoleService.findOne({}, {_id: roleConfig[0]._id}).then(flag => {
        if (!flag) {
            RoleService.create({}, roleConfig).then(() => {
                logger.info("create " + "default role" + " success");
            }, err => {
                logger.error("Error:" + err);
            });
        }
    })
};

InitDbData.initDict = function () {
    DictService.findOne({}, {code : dictConfig[0].code}).then(flag => {
        if(!flag){
            DictService.create({}, dictConfig).then(() => {
                logger.info("create " + "default menu" + " success");
            }, err => {
                logger.error("Error:" + err);
            });
        }
    })
};
module.exports = InitDbData;
/**
 * Created by wangshuyi on 2017/1/18.
 */

'use strict';
const config = require('../../config/config');
const dictConfig = require('../../config/dictConfig');
const menuConfig = require('../../config/menuConfig');
const roleConfig = require('../../config/roleConfig');
const tenantConfig = require('../../config/tenantConfig');
const logger = require('log4js').getLogger("sys");

const TenantService = require('../../service/system/TenantService');
const DictService = require('../../service/system/DictService');
const UserService = require('../../service/system/auth/UserService');
const MenuService = require('../../service/system/MenuService');
const RoleService = require('../../service/system/auth/RoleService');

const InitDbData = {};

InitDbData.init = function () {
    this.initMenu();
    this.initRole();
    this.initUser();
    this.initDict();
    this.initTenant();
};

InitDbData.initUser = function () {
    const dbUser = config.dbUser;
    let key, data = [];
    UserService.findById({}, dbUser.admin._id).then(flag => {
        if(!flag){
            for(key in dbUser){
                data.push(dbUser[key]);
            }
            UserService.create({}, data).then(() => {
                logger.info("create " + "default user" + " success");
            }, err => {
                logger.error("Error:" + err);
            });
        }
    });
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
InitDbData.initMenu = function () {
    MenuService.findOne({}, {_id : menuConfig[0]._id}).then(flag => {
        if(!flag){
            MenuService.create({}, menuConfig).then(() => {
                logger.info("create " + "default menu" + " success");
            }, err => {
                logger.error("Error:" + err);
            });
        }
    })
};
InitDbData.initRole = function () {
    RoleService.findOne({}, {_id : roleConfig[0]._id}).then(flag => {
        if(!flag){
            RoleService.create({}, roleConfig).then(() => {
                logger.info("create " + "default role" + " success");
            }, err => {
                logger.error("Error:" + err);
            });
        }
    })
};
InitDbData.initTenant = function () {
    TenantService.findOne({}, {_id : tenantConfig[0]._id}).then(flag => {
        if(!flag){
            TenantService.create({}, tenantConfig).then(() => {
                logger.info("create " + "default tenant" + " success");
            }, err => {
                logger.error("Error:" + err);
            });
        }
    })
};

module.exports = InitDbData;
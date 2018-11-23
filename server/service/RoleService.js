/**
* Created by wangshuyi on 5/22/2017, 3:13:44 PM.
*/

'use strict';

const extend = require('extend');
const logger = require('log4js').getLogger("sys");

const CommonService = require("../service/common/dbService");
const Model = require("../module/RoleModel");

const defaultParams = {
    model : Model,
};

class ModuleService extends CommonService{
    constructor(param){
        super(param);
        this.opts = extend(true, {}, this.opts, defaultParams, param);
        this._name = "RoleService";
    }
}

module.exports = new ModuleService();



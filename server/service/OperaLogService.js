/**
 *
 * @author Roninwz
 * @date 2018/12/24 15:26
 * @since 1.0.0
 */


'use strict';

const extend = require('extend');
const logger = require('log4js').getLogger("sys");

const CommonService = require("../service/common/dbService");
const Model = require("../module/OperateLogModel");
const defaultParams = {
    model : Model,
};

class ModuleService extends CommonService{
    constructor(param){
        super(param);
        this.opts = extend(true, {}, this.opts, defaultParams, param);
        this._name = "OperaLogService";
    }

}

module.exports = new ModuleService();

/**
 *
 * @author Roninwz
 * @date 2019/4/12 下午13:45
 * @since 1.0.0
 */


'use strict';

const extend = require('extend');
const logger = require('log4js').getLogger("sys");

const CommonService = require("./common/dbService");
const Model = require("../module/ResourceModel");

const defaultParams = {
    model: Model,
};

class ModuleService extends CommonService {
    constructor(param) {
        super(param);
        this.opts = extend(true, {}, this.opts, defaultParams, param);
        this._name = "ResourceService";
    }
}

module.exports = new ModuleService();
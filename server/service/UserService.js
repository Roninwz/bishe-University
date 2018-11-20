/**
 *
 * @author Roninwz
 * @date 2018/11/19 20:29
 * @since 1.0.0
 */

'use strict';

const extend = require('extend');
const logger = require('log4js').getLogger("sys");

const CommonService = require("./common/dbService");
const Model = require("../module/UserModel");

const defaultParams = {
    model: Model,
};

class ModuleService extends CommonService {
    constructor(param) {
        super(param);
        this.opts = extend(true, {}, this.opts, defaultParams, param);
        this._name = "UserService";
    }
}

module.exports = new ModuleService();

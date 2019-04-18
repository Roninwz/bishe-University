/**
 *
 * @author Roninwz
 * @date 2018/12/10 18:09
 * @since 1.0.0
 */


'use strict';

const extend = require('extend');
const logger = require('log4js').getLogger("sys");

const CommonService = require("./common/dbService");
const Model = require("../module/TopicPostCommentModel");

const defaultParams = {
    model: Model,
};

class ModuleService extends CommonService {
    constructor(param) {
        super(param);
        this.opts = extend(true, {}, this.opts, defaultParams, param);
        this._name = "TopicPostCommentService";
    }
}

module.exports = new ModuleService();
/**
 * Created by wangshuyi on 2017/1/13.
 */

'use strict';
const extend = require('extend');
const logger = require('log4js').getLogger("sys");

const config = require("../../config/config");

const defaultParams = {
    model: null,
    basePath: '',
    find: {
        url : '/find',
        method : 'post',
    },
    findForPage: {
        url : '/list',
        method : 'post',
    },
    findById: {
        url : '/detail/{id}',
        method : 'get',
    },
    findOne: {
        url : '/findOne',
        method : 'post',
    },
    save: {
        url : '/save',
        method : 'post',
    },
    create: {
        url : '/create',
        method : 'post',
    },
    remove: {
        url : '/remove',
        method : 'post',
    },
    removeById: {
        url : '/remove/{id}',
        method : 'get',
    },
    update: {
        url : '/update',
        method : 'post',
    },
    updateById: {
        url : '/save/{id}',
        method : 'post',
    },
    count: {
        url : '/count',
        method : 'post',
    },
};
//TODO 是否需要传入当前用户，所有populate未支持
class CommonService {
    constructor(param) {
        this.opts = extend(true, {}, this.opts, defaultParams, param);
        this._name = "CommonService";
    }

    /**
     * 查询
     * @param condition
     * @param populate
     * @param sort
     * @param fields
     * @returns {Promise}
     */
    find(curUser = null, condition = {}, populate = "", sort = {updateTime: -1}, fields = null) {
        const thisService = this;

        let uri = `${config.server.url}${thisService.opts.basePath}${thisService.opts.find.url}`;

        return new Promise((resolve, reject) => {
            uri += '?sort='+sort;
            uri += '&fields='+fields;

            global.tool.request({
                method: thisService.opts.find.method,
                uri: uri,
                json: condition
            }).then((body, response) => {
                logger.info(thisService._name, "request find success", body);
                resolve(body); //{total: count, rows: data}
            }, (error, response) => {
                logger.error(thisService._name, "request find fail", error);
                reject(error);
            });
        });
    }

    /**
     * 分页查询
     * @param pageSize
     * @param pageNumber
     * @param condition
     * @param populate
     * @param sort
     * @param fields
     * @returns {Promise}
     */
    findForPage(curUser = null, pageSize = 10, pageNumber = 0, condition = {}, populate = "", sort = {updateTime: -1}, fields = null) {
        const thisService = this;

        let uri = `${config.server.url}${thisService.opts.basePath}${thisService.opts.findForPage.url}`;

        return new Promise((resolve, reject) => {
            uri += '?pageSize='+pageSize;
            uri += '&pageNumber='+pageNumber;
            uri += '&sort='+sort;
            uri += '&fields='+fields;

            global.tool.request({
                method: thisService.opts.findForPage.method,
                uri: uri,
                json: condition
            }).then((body, response) => {
                logger.info(thisService._name, "request findByPage success", body);
                resolve(body); //{total: count, rows: data}
            }, (error, response) => {
                logger.error(thisService._name, "request findByPage fail", error);
                reject(error);
            });
        });
    }

    /**
     * 根据id查询
     * @param id
     * @param populate
     * @param fields
     * @returns {Promise}
     */
    findById(curUser = null, id = "", populate = "", fields = null) {
        const thisService = this;

        let uri = `${config.server.url}${thisService.opts.basePath}${thisService.opts.findById.url}`;
        let pathData = {id : id};

        return new Promise((resolve, reject) => {
            uri += '&populate='+populate;
            uri += '&fields='+fields;

            global.tool.request({
                method: thisService.opts.findById.method,
                uri: uri,
            }, pathData).then((body, response) => {
                logger.info(thisService._name, "request findById success", body);
                resolve(body);
            }, (error, response) => {
                logger.error(thisService._name, "request findById fail", error);
                reject(error);
            });
        });
    }

    /**
     * 根据条件查询一条
     * @param condition
     * @param populate
     * @param fields
     * @returns {Promise}
     */
    findOne(curUser = null, condition = {}, populate = "", fields = null) {
        const thisService = this;

        let uri = `${config.server.url}${thisService.opts.basePath}${thisService.opts.findOne.url}`;

        return new Promise((resolve, reject) => {
            uri += '?fields='+fields;

            global.tool.request({
                method: thisService.opts.findOne.method,
                uri: uri,
                json: condition
            }).then((body, response) => {
                logger.info(thisService._name, "request findOne success", body);
                resolve(body);
            }, (error, response) => {
                logger.error(thisService._name, "request findOne fail", error);
                reject(error);
            });
        });
    }

    /**
     * 新建
     * @param data
     * @returns {Promise}
     */
    save(curUser = null, data = {}) {
        const thisService = this;

        let uri = `${config.server.url}${thisService.opts.basePath}${thisService.opts.save.url}`;

        return new Promise((resolve, reject) => {
            global.tool.request({
                method: thisService.opts.save.method,
                uri: uri,
                json: data
            }).then((body, response) => {
                logger.info(thisService._name, "request save success", body);
                resolve(body);
            }, (error, response) => {
                logger.error(thisService._name, "request save fail", error);
                reject(error);
            });
        });
    }

    /**
     * 批量新建
     * @param data
     * @returns {Promise}
     */
    create(curUser = null, data = []) {
        const thisService = this;

        let uri = `${config.server.url}${thisService.opts.basePath}${thisService.opts.create.url}`;

        return new Promise((resolve, reject) => {
            global.tool.request({
                method: thisService.opts.create.method,
                uri: uri,
                json: {arrayData: data}
            }).then((body, response) => {
                logger.info(thisService._name, "request create success", body);
                resolve(body);
            }, (error, response) => {
                logger.error(thisService._name, "request create fail", error);
                reject(error);
            });
        });
    }

    /**
     * 删除
     * @param condition
     * @returns {Promise}
     */
    remove(curUser = null, condition = {}) {
        const thisService = this;

        let uri = `${config.server.url}${thisService.opts.basePath}${thisService.opts.remove.url}`;

        return new Promise((resolve, reject) => {
            global.tool.request({
                method: thisService.opts.remove.method,
                uri: uri,
                json: condition
            }).then((body, response) => {
                logger.info(thisService._name, "request remove success", body);
                resolve(body);
            }, (error, response) => {
                logger.error(thisService._name, "request remove fail", error);
                reject(error);
            });
        });
    }

    /**
     * 根据id删除
     * @param id
     * @returns {Promise}
     */
    removeById(curUser = null, id = "") {
        const thisService = this;

        let uri = `${config.server.url}${thisService.opts.basePath}${thisService.opts.removeById.url}`;
        let pathData = {id : id};

        return new Promise((resolve, reject) => {
            global.tool.request({
                method: thisService.opts.removeById.method,
                uri: uri,
            }, pathData).then((body, response) => {
                logger.info(thisService._name, "request removeById success", body);
                resolve(body);
            }, (error, response) => {
                logger.error(thisService._name, "request removeById fail", error);
                reject(error);
            });
        });
    }

    /**
     * 修改
     * @param condition
     * @param data
     * @returns {Promise}
     */
    update(curUser = null, condition = {}, data = {}) {
        const thisService = this;

        let uri = `${config.server.url}${thisService.opts.basePath}${thisService.opts.update.url}`;

        return new Promise((resolve, reject) => {

            global.tool.request({
                method: thisService.opts.update.method,
                uri: uri,
                json: {condition:condition, data:data}
            }).then((body, response) => {
                logger.info(thisService._name, "request update success", body);
                resolve(body);
            }, (error, response) => {
                logger.error(thisService._name, "request update fail", error);
                reject(error);
            });
        });
    }

    /**
     * 根据id修改
     * @param id
     * @param data
     * @returns {Promise}
     */
    updateById(curUser = null, id = "", data = {}) {
        const thisService = this;

        let uri = `${config.server.url}${thisService.opts.basePath}${thisService.opts.updateById.url}`;

        data.updateTime = new Date();

        return new Promise((resolve, reject) => {
            global.tool.request({
                method: thisService.opts.updateById.method,
                uri: uri,
                json: data
            }, {id: id}).then((body, response) => {
                logger.info(thisService._name, "request updateById success", body);
                resolve(body);
            }, (error, response) => {
                logger.error(thisService._name, "request updateById fail", error);
                reject(error);
            });
        });
    }

    /**
     * 计数
     * @param condition
     * @returns {Promise}
     */
    count(curUser = null, condition = {}) {
        const thisService = this;

        let uri = `${config.server.url}${thisService.opts.basePath}${thisService.opts.count.url}`;

        return new Promise((resolve, reject) => {
            global.tool.request({
                method: thisService.opts.count.method,
                uri: uri,
                json: condition
            }).then((body, response) => {
                logger.info(thisService._name, "request count success", body);
                resolve(body);
            }, (error, response) => {
                logger.error(thisService._name, "request count fail", error);
                reject(error);
            });
        });
    }
}

module.exports = CommonService;
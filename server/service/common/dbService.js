/**
 * Created by wangshuyi on 2017/1/13.
 */

'use strict';
const extend = require('extend');
const logger = require('log4js').getLogger("sys");
const config = require("../../config/config");


const defaultParams = {
    model: null,
    findCondition(curUser, thisService, condition){
        return new Promise(resolve => {
            resolve({$and:[condition, { state: 1 }]});
        });
    },
    saveExtend: (curUser, thisService, data) => {
        return new Promise(resolve => {
            resolve(Object.assign({creater: curUser._id}, data));
        });
    }
};

class CommonService {
    constructor(param) {
        this.opts = extend(true, {}, this.opts, defaultParams, param);
        this._name = "CommonService";
    }

    /**
     * 查询
     * @param curUser
     * @param condition
     * @param populate
     * @param sort
     * @param fields
     * @returns {Promise}
     */
    find(curUser = null, condition = {}, populate = "", sort = {updateTime: -1}, fields = null) {
        return new Promise((resolve, reject) => {
            this.opts.findCondition(curUser, this, condition).then(condition => {
                let exec = this.opts.model.find(condition);

                if(populate instanceof Array){
                    populate.forEach(p => {
                        exec.populate(p);
                    })
                }else{
                    exec.populate(populate);
                }

                if(fields){
                    exec.select(fields);
                }

                exec.sort(sort).exec((err, result) => {
                    if (err) {
                        logger.error(this._name, "find fail", err);
                        reject(err);
                    } else {
                        logger.info(this._name, "find success", condition);
                        resolve(result);
                    }
                });
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
        let skip, size;

        skip = pageSize * pageNumber;
        size = Number(pageSize);
        return new Promise((resolve, reject) => {
            condition = extend({}, this.opts.findCondition(curUser, this), condition);
            this.opts.findCondition(curUser, this, condition).then(condition => {
                thisService.opts.model.count(condition).exec((err, count) => {
                    if (err) {
                        logger.error(this._name, "findByPage count fail", err);
                        reject(err);
                    } else {
                        let exec = thisService.opts.model.find(condition).skip(skip).limit(size);

                        if(populate instanceof Array){
                            populate.forEach(p => {
                                exec.populate(p);
                            })
                        }else{
                            exec.populate(populate);
                        }

                        if(fields){
                            exec.select(fields);
                        }

                        exec.sort(sort).exec((err, data) => {
                            if (err) {
                                logger.error(this._name, "findByPage find fail", err);
                                reject(err);
                            } else {
                                logger.info(this._name, "findByPage find success", condition);
                                resolve({total: count, rows: data});
                            }
                        })
                    }
                });
            });
        });
    }

    /**
     * 根据id查询
     * @param curUser
     * @param id
     * @param populate
     * @param fields
     * @returns {Promise}
     */
    findById(curUser = null, id = "", populate = "", fields = null) {
        return new Promise((resolve, reject) => {
            let exec = this.opts.model.findById(id);

            if(populate instanceof Array){
                populate.forEach(p => {
                    exec.populate(p);
                })
            }else{
                exec.populate(populate);
            }

            if(fields){
                exec.select(fields);
            }

            exec.exec((err, result) => {
                if (err) {
                    logger.error(this._name, "findById fail", err);
                    reject(err);
                } else {
                    logger.info(this._name, "findById success", id);
                    resolve(result);
                }
            })
        });
    }

    /**
     * 根据条件查询一条
     * @param curUser
     * @param condition
     * @param populate
     * @param fields
     * @returns {Promise}
     */
    findOne(curUser = null, condition = {}, populate = "", fields = null) {
        return new Promise((resolve, reject) => {
            this.opts.findCondition(curUser, this, condition).then(condition => {
                let exec = this.opts.model.findOne(condition);

                if(populate instanceof Array){
                    populate.forEach(p => {
                        exec.populate(p);
                    })
                }else{
                    exec.populate(populate);
                }

                if(fields){
                    exec.select(fields);
                }

                exec.exec((err, result) => {
                    if (err) {
                        logger.error(this._name, "findOne fail", err);
                        reject(err);
                    } else {
                        logger.info(this._name, "findOne success", condition);
                        resolve(result);
                    }
                })
            });
        });
    }

    /**
     * 新建
     * @param curUser
     * @param data
     * @returns {Promise}
     */
    save(curUser = null, data = {}) {
        return new Promise((resolve, reject) => {
            this.opts.saveExtend(curUser, this, data).then(data => {
                let model = new this.opts.model(data);

                model.save((err, result) => {
                    if (err) {
                        logger.error(this._name, "save fail", err);
                        reject(err);
                    }
                    else {
                        logger.info(this._name, "save success", result);
                        resolve(result)
                    }
                });
            });
        });
    }

    /**
     * 批量新建
     * @param curUser
     * @param data
     * @returns {Promise}
     */
    create(curUser = null, data = []) {
        return new Promise((resolve, reject) => {
            let dataPromise = [];
            data.forEach((d, i) => dataPromise.push(new Promise(resolve => {
                this.opts.saveExtend(curUser, this, d).then(_d => {
                    data[i] = _d;
                    resolve();
                })
            })));

            Promise.all(dataPromise).then(() => {
                this.opts.model.create(data, (err, result) => {
                    if (err) {
                        logger.error(this._name, "create fail", err);
                        reject(err);
                    }
                    else {
                        logger.info(this._name, "create success", result);
                        resolve(result)
                    }
                });
            });
        });
    }

    /**
     * 删除
     * @param curUser
     * @param condition
     * @returns {Promise}
     */
    remove(curUser = null, condition = {}) {
        return new Promise((resolve, reject) => {
            this.opts.findCondition(curUser, this, condition).then(condition => {
                this.opts.model.remove(condition, (err, result) => {
                    if (err) {
                        logger.error(this._name, "remove fail", err);
                        reject(err);
                    }
                    else {
                        logger.info(this._name, "remove success", result.result);
                        resolve(result)
                    }
                });
            });
        });
    }

    /**
     * 根据id删除
     * @param curUser
     * @param id
     * @returns {Promise}
     */
    removeById(curUser = null, id = "") {
        return new Promise((resolve, reject) => {
            this.opts.model.findByIdAndRemove(id, (err, result) => {
                if (err) {
                    logger.error(this._name, "removeById fail", err);
                    reject(err);
                }
                else {
                    logger.info(this._name, "removeById success", result);
                    resolve(result)
                }
            });
        });
    }

    /**
     * 修改
     * @param curUser
     * @param condition
     * @param data
     * @param option
     * @returns {Promise}
     */
    update(curUser = null, condition = {}, data = {}, option = {}) {
        return new Promise((resolve, reject) => {
            this.opts.findCondition(curUser, this, condition).then(condition => {
                data.updater = (curUser && curUser._id) || config.dbUser.robot._id;
                data.updateTime = new Date();
                this.opts.model.update(condition, data, option, (err, result) => {
                    if (err) {
                        logger.error(this._name, "update fail", err);
                        reject(err);
                    }
                    else {
                        logger.info(this._name, "update success", result);
                        resolve(result)
                    }
                });
            });
        });
    }

    /**
     * 根据id修改
     * @param curUser
     * @param id
     * @param data
     * @param option
     * @returns {Promise}
     */
    updateById(curUser = null, id = "", data = {}, option = {new : true}) {
        return new Promise((resolve, reject) => {
            data.updater = (curUser && curUser._id) || config.dbUser.robot._id;
            data.updateTime = new Date();

            this.opts.model.findByIdAndUpdate(id, data, option, (err, result) => {
                if (err) {
                    logger.error(this._name, "updateById fail", err);
                    reject(err);
                }
                else {
                    logger.info(this._name, "updateById success", result);
                    resolve(result)
                }
            });
        });
    }

    /**
     * 计数
     * @param curUser
     * @param condition
     * @returns {Promise}
     */
    count(curUser = null, condition = {}) {
        return new Promise((resolve, reject) => {
            this.opts.findCondition(curUser, this, condition).then(condition => {
                this.opts.model.count(condition).exec((err, result) => {
                    if (err) {
                        logger.error(this._name, "count fail", err);
                        reject(err);
                    } else {
                        logger.info(this._name, "count success", condition);
                        resolve(result);
                    }
                })
            });
        });
    }


    /**
     * 聚合
     * @param curUser
     * @param pip
     * @return {Promise}
     */
    aggregate(curUser, pip = []){
        return new Promise((resolve, reject) => {
            this.opts.model.aggregate(pip, (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        });
    }

    /**
     * populate
     * @param curUser
     * @param data
     * @param options
     * @return {Promise}
     */
    populate(curUser, data, options = []){
        return new Promise((resolve, reject) => {
            this.opts.model.populate(data, options, (err, data) => {
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            });
        });
    }
}

module.exports = CommonService;
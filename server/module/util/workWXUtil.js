/**
 * Created by wangshuyi on 2017/1/4.
 */

'use strict';

const request = require('request');
const extend = require('extend');

const logger = require('log4js').getLogger("sys");
const util = require('./tool');

const workWXTokenService = require('../../service/weChat/WorkWXTokenService');

const WorkWXUtil = function (param) {
    this.init(param);
};

WorkWXUtil.prototype = {
    constructor: WorkWXUtil,
    tokenTime: 7000000, //jsapi_ticket的有效期为7200秒，我们在这里提前2s
    defaultParams: {
        name: '巡查企业号',
        corpId: 'wx16bcbe8ca1f06d78',
        agentId: '1000024',
        corpSecret: 'D3KTeIGYULvdm_Gi-3aAs7oZ3O5btFjvTs5H7dlt5eI',
    },

    url: (function () {
        let url = {};
        let api = 'https://qyapi.weixin.qq.com/cgi-bin';

        url.token_url = api + '/gettoken?corpid={corpId}&corpsecret={corpSecret}';
        url.getUserIdByCode = api + '/user/getuserinfo?access_token={token}&code={code}';

        return url;
    })(),

    init(param) {
        this.opts = extend(true, {}, this.defaultParams, param);
    },

    /**
     * 获取token
     * @return Promise resolve(token) reject('000000')
     */
    getToken() {
        let n = new Date().getTime();

        return new Promise((resolve, reject) => {
            workWXTokenService.findOne({}, {
                corpId: this.opts.corpId,
                agentId: this.opts.agentId,
                corpSecret: this.opts.corpSecret
            }).then(tokenObj => {
                if (tokenObj) {
                    if (n - tokenObj.tokenTime > this.tokenTime) {
                        this._getToken().then(token => {
                            workWXTokenService.update({}, {
                                corpId: this.opts.corpId,
                                agentId: this.opts.agentId,
                                corpSecret: this.opts.corpSecret
                            }, {
                                token: token,
                                tokenTime: n
                            }).then(() => resolve(token));
                        }).catch(err => reject('000000'))
                    } else {
                        resolve(tokenObj.token);
                    }
                } else {
                    this._getToken().then(token => {
                        workWXTokenService.save({}, {
                            name: this.opts.name,
                            corpId: this.opts.corpId,
                            agentId: this.opts.agentId,
                            corpSecret: this.opts.corpSecret,
                            token: token,
                            tokenTime: n
                        }).then(() => resolve(token));
                    }).catch(err => reject('000000'));
                }
            });
        });
    },
    _getToken() {
        let tokenUrl, retData;

        tokenUrl = util.setPathData(this.url.token_url, {
            corpId: this.opts.corpId,
            corpSecret: this.opts.corpSecret
        });

        return new Promise((resolve, reject) => {
            request({
                method: 'get',
                uri: tokenUrl,
                json: true,
            }, (error, response, body) => {
                if (error) {
                    logger.error("get wordWX token error", error);
                    reject({errcode: 83283, errmsg: 'get Token fail'});
                } else {
                    logger.info("workWXUtil.getToken:@", body, "@");
                    if (body.access_token) {
                        resolve(body.access_token);
                    } else {
                        logger.error("fetch token error!");
                        reject({errcode: 83283, errmsg: 'get Token fail'});
                    }
                }
            });
        })
    },

    /**
     * 通用方法
     * @param url
     * @param data
     * @param pathData
     * @param type
     * @return {Promise} resolve(body) reject(err)
     */
    common(url, data = {}, pathData = {}, type = 'post') {
        return new Promise((resolve, reject) => {
            new Promise(resolve => {
                if (pathData.token) {
                    resolve();
                } else {
                    this.getToken().then(token => {
                        pathData.token = token;
                        resolve();
                    })
                }
            }).then(() => {
                let api = util.setPathData(url, pathData);
                request({
                    method: type,
                    uri: api,
                    json: type === 'get' ? true : data
                }, (err, httpResponse, body) => {
                    if (err) {
                        logger.error('wordWX', api, err);
                        reject(err)
                    } else {
                        if (body && body.errcode && body.errcode != 0) {
                            logger.error('wordWX', api, body);
                            reject(body)
                        } else {
                            logger.info('wordWX request success', api);
                            resolve(body);
                        }
                    }
                })
            });
        });
    },

    getUserIdByCode(code) {
        return this.common(this.url.getUserIdByCode, {}, {code: code}, 'get');
    }
};

let thisUtil = new WorkWXUtil();

module.exports = thisUtil;
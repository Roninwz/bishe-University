/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

"use strict";

const fs = require('fs');

const log4js = require('log4js');
const logger = log4js.getLogger('default');

/**
 * 如果我们使用KONG（https://getkong.org/）的话，则此处的映射可以关闭掉。
 * 在init的时候，从kong上load出api的映射关系
 */
module.exports = (function () {
    /**
     * 出口的值
     * @type {{_data: {}, init: apiRoute.init, register: apiRoute.register, get: apiRoute.get, listen: apiRoute.listen, apiAuthentication: apiRoute.apiAuthentication}}
     */
    let apiRoute = {

        _data: {},

        /**
         * api文件
         */
        _apiFile: __dirname + global.config.api.filePath,

        /**
         * 初始化api列表
         * @returns {exports}
         */
        init: function () {
            //TODO: 我们需要加判断，如果有Kong存在的话，则不需要listen，直接从api gateway 空上下载api对应关系
            this.loadAll();
            this.listen();
            logger.info('init the api gate way!');
            return this;
        },

        /**
         * 注册某个api
         * @param api
         */
        register: function (api) {
            this._data[global.tool.uuid()] = api;
            //TODO: flush into filesystem
        },

        /**
         * 根据uuid获取api接口
         * @param uuid
         * @returns {*}
         */
        get: function (uuid) {
            let url = '';
            if(!global.config.mock){
                url += global.config.api.serverUrl;
            }
            url += this._data[uuid];

            return url;
        },

        /**
         * 加载所有的配置
         */
        loadAll: function () {
            let me = this;
            fs.readFile(this._apiFile, "utf-8", function (error, context) {
                if(error){
                    logger.error("api load error", error);
                }else{
                    logger.info("api config update", context);
                    me._data = JSON.parse(context);
                }
            });
        },

        /**
         * 监听文件变化
         */
        listen: function () {
            let me = this;
            fs.watchFile(me._apiFile, {
                interval: 60000
            }, function (curStat, preStat) {
                me.loadAll();
            });
        },

        /**
         * 根据映射关系，进行地址转换
         * 发送的地址为：/api/uuid@pathv1=v1&pathv2=v2?paramv1=pv1&paramv2=pv2
         *
         * @param path
         */
        pathMapping : function(path) {
            let sUrl = path.match(/\/api\/([\w-]+)@*([^\?]*)\?*(.*)/),
                uuid = sUrl[1],
                pathVar = sUrl[2],
                paramVar = sUrl[3],
                realUri = apiRoute.get(uuid),
                pathVar_ = pathVar.split('&'),
                items,
                regExp;
            if (realUri) {
                for (var i = 0; i < pathVar_.length; i++) {
                    items = pathVar_[i].split("=");
                    regExp = new RegExp('{' + items[0] + '}');
                    realUri = realUri.replace(regExp, items[1]);
                }
                if (paramVar)
                    realUri += '?' + paramVar;
            }
            return realUri;
        },

        /**
         * API接口调用的安全认证
         * @param req
         * @param res
         * @param next
         */
        apiAuthentication: function (req, res, next) {
            console.info('auth::apiAuthentication');
            if (!req.session.userData) {
                res.json({success: false, msg: '登录已过期，请重新登录'})
            } else {
                //判断从浏览器头部传输过来的token或者session是否有效
                //?或者从cookie中获取？
                //确认权限
                next();
            }
        }
    };
    apiRoute.init();
    return apiRoute;
})();

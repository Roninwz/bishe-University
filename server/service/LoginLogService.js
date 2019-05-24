/**
 *
 * @author Roninwz
 * @date 2018/12/24 15:24
 * @since 1.0.0
 */


'use strict';

const extend = require('extend');
const logger = require('log4js').getLogger("sys");
const request = require('request');
const CommonService = require("../service/common/dbService");
const Model = require("../module/LoginLogModel");
const config = require("../config/config");
const defaultParams = {
    model : Model,
};

class ModuleService extends CommonService{
    constructor(param){
        super(param);
        this.opts = extend(true, {}, this.opts, defaultParams, param);
        this._name = "LoginLogService";
    }


    /**
     * 通过百度地图接口获取地址
     * @param api
     * @param ak
     * @param coor
     * @param ip
     * @returns {Promise<any>}
     */
     getAddress(api,ak,coor,ip){
        return new Promise((resolve,reject)=>{
            request({
                method: 'get',
                uri: api+'?ip='+ip+'&ak='+ak+'&coor='+coor,
                json: true,
            }, (err, httpResponse, body) => {
                if (err) {
                    logger.error('address', api, err);
                    reject(err);
                } else {
                    if (body && body.errcode && body.errcode !== 0) {
                        logger.error('address', api, body);
                        reject(body)
                    } else {
                        logger.info('address request success', api);
                        logger.info('response:', body);
                        resolve(body['content']);
                    }
                }
            })
        })

    }

    async getAdressById(api,ak,coor,ip){
        const result = await this.getAddress(api,ak,coor,ip);
        return result;
    }

}

module.exports = new ModuleService();



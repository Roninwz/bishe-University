/**
 * Created by wangshuyi on 5/22/2017, 3:19:31 PM.
 */

'use strict';

const extend = require('extend');
const logger = require('log4js').getLogger("sys");

const CommonService = require("./common/dbService");
const Model = require("../module/AdminModel");

const defaultParams = {
    model : Model,
};

class ModuleService extends CommonService{
    constructor(param){
        super(param);
        this.opts = extend(true, {}, this.opts, defaultParams, param);
        this._name = "AdminService";
    }
    /**
     *
     * @param curUser
     * @param code
     * @param password
     * @return {Promise}
     */
    check(curAdmin, name, password){
        return new Promise((resolve, reject) => {
            this.findOne(curAdmin, {name: name}, '').then(admin => {
                if(admin){
                    if(admin.password === password){
                        resolve(admin)
                    }else{
                        reject({message: '密码不正确'});
                    }
                }else{
                    reject({message: '该用户不存在'});
                }
            });
        });
    }



}

module.exports = new ModuleService();



/**
 * Created by wangshuyi on 5/22/2017, 3:19:31 PM.
 */

'use strict';

const extend = require('extend');
const logger = require('log4js').getLogger("sys");

const CommonService = require("./common/dbService");
const Model = require("../module/AdminModel");
const MenuService = require("./MenuService");
const RoleService = require("./RoleService");
const defaultParams = {
    model: Model,
};

class ModuleService extends CommonService {
    constructor(param) {
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
    check(curAdmin, name, password) {
        return new Promise((resolve, reject) => {
            this.findOne(curAdmin, {name: name}, 'role').then(admin => {
                if (admin) {
                    if (admin.password === password) {
                        resolve({data: admin, message: "登录成功"})
                    } else {
                        reject({message: '密码不正确'});
                    }
                } else {
                    reject({message: '该用户不存在'});
                }
            });
        });
    }

    login(req, admin) {
        return new Promise((resolve, reject) => {
            MenuService.tree(admin, null, {_id: {'$in': admin.role ? admin.role.menus : []}}).then(menus => {
                resolve({
                    message: '登录成功', data: {
                        _id: admin._id,
                        name: admin.name,
                        phone: admin.phone,
                        role: admin.role,
                        menu: menus
                    }
                });
            });
        });
    }


}

module.exports = new ModuleService();



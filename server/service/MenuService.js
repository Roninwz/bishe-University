/**
* Created by wangshuyi on 5/22/2017, 3:09:12 PM.
*/

'use strict';

const extend = require('extend');
const logger = require('log4js').getLogger("sys");

const CommonService = require("../service/common/dbService");
const Model = require("../module/MenuModel");

const SYSTEM_CONSTANT = require('../config/systemConstant');

const defaultParams = {
    model : Model,
};

class ModuleService extends CommonService{
    constructor(param){
        super(param);
        this.opts = extend(true, {}, this.opts, defaultParams, param);
        this._name = "MenuService";
    }
    tree(curUser, parentId = null, condition = {}){
        let total = 1, count = 0, data = {_id: parentId}, _level = 0;

        return new Promise((resolve, reject) => {
            let cb = () => {
                count++;
                if(count === total){
                    resolve({level: _level, rows:data.children});
                }
            };

            let find = (parent, level) => {
                super.find(curUser, extend({parent: parent._id}, condition), 'parent', {'sort':1}).then(result => {
                    if(result.length > 0){
                        _level = Math.max(level, _level);
                        if(parent._doc){
                            parent._doc.children = result;
                        }else{
                            parent.children = result;
                        }

                        result.forEach(node => {
                            if(node.__type === SYSTEM_CONSTANT.TREE_MODEL.FOLDER){
                                total++;
                                find(node, level+1);
                            }else{

                            }
                        })
                    }

                    cb();
                })
            };

            find(data, 1);
        });
    }
    save(curUser, data){
        let promise;

        if(data.parent){
            promise = new Promise((resolve, reject) => {
                super.updateById(curUser, data.parent, {__type : SYSTEM_CONSTANT.TREE_MODEL.FOLDER}).then(result => {
                    super.save(curUser, data).then(
                        r => resolve(r),
                        e => reject(e)
                    );
                }, err => reject(err));
            });
        }else{
            promise = super.save(curUser, data);
        }

        return promise;
    }
    removeById(curUser, id){
        return new Promise((resolve, reject) => {
            super.removeById(curUser, id).then(data => {
                if(data && data.parent){
                    super.find(curUser, {parent:data.parent}).then(hasChildren => {
                        if(hasChildren.length == 0){
                            super.updateById(curUser, data.parent, {__type:SYSTEM_CONSTANT.TREE_MODEL.LEAF}).then(result => {
                                resolve(data);
                            }, err => reject(err))
                        }else{
                            resolve(data);
                        }
                    }, err => reject(err))
                }else{
                    resolve(data);
                }
            }, err => reject(err))
        });
    }
}

module.exports = new ModuleService();



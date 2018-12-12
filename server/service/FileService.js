/**
* Created by wangshuyi on 8/9/2017, 9:00:40 AM.
*/

'use strict';

const extend = require('extend');
const logger = require('log4js').getLogger("sys");
const fs = require('fs');
const path = require('path');

const config = require("../config/config");
const CommonService = require("../service/common/dbService");
const Model = require("../module/FileModel");


const defaultParams = {
    model : Model
};

class ModuleService extends CommonService{
    constructor(param){
        super(param);
        this.opts = extend(true, {}, this.opts, defaultParams, param);
        this._name = "U_FileService";
    }
    removeById(curUser, id){
        return new Promise((resolve, reject) => {
            super.findById(curUser, id, undefined, 'filePath').then(file => {
                let path = config.path.uploadPath+file.filePath;
                fs.unlink(path, err => {
                    if(err){

                    }

                    super.removeById(curUser, id).then(
                        reject => resolve(reject),
                        err => reject(err)
                    )
                })
            })
        });
    }
    remove(curUser, condition){
        return new Promise((resolve, reject) => {
            super.find(curUser, condition, undefined, undefined, 'filePath').then(files => {
                let total = files.length, count = 0;
                let cb = () => {
                    count++;
                    if(count === total){
                        super.remove(curUser, condition).then(
                            result => resolve(result),
                            err => reject(err)
                        )
                    }
                };

                files.forEach(file => {
                    let path = config.path.uploadPath+file.filePath;
                    fs.unlink(path, err => {
                        if(err){

                        }
                        cb();
                    })
                })
            })
        })
    }

    updateById(curUser, id, data){
        return new Promise((resolve, reject) => {

            super.findById(curUser, id).then(file => {
                let cb = () => {
                    super.updateById(curUser, id, data).then(
                        result => resolve(result),
                        err => reject(err)
                    )
                };
                if(data.type !== undefined && file.type !== data.type){
                    let newPath = '/' + data.type + '/' + path.basename(file.filePath);
                    if(!fs.existsSync(config.path.uploadPath + '/' + data.type)){
                        fs.mkdirSync(config.path.uploadPath + '/' + data.type);
                    }
                    fs.rename(config.path.uploadPath + file.filePath, config.path.uploadPath + newPath, err => {
                        if(err){
                            reject(err);
                        }else{
                            data.filePath = newPath;
                            cb();
                        }
                    })
                }else{
                    cb();
                }
            })
        });
    }


}

module.exports = new ModuleService();



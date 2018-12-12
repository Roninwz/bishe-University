/**
 * Created by wangshuyi on 2016/12/27.
 */

'use strict';

/**
 * 文件管理
 */

const uuid = require('uuid');

const mongoose = require('./util/mongoDB'),
    Schema = mongoose.Schema;
const config = require('../config/config');
const tool = require('../module/util/tool');

const schema = new Schema({
    _id : {type : String, default: uuid.v4},
    name : { type: String },                        //文件名称
    filePath : { type: String },                    //存储地址
    fileSize : { type: Number },                    //文件大小
    fileType : { type: String },                    //文件类型
    lastModifiedDate : { String },                  //最后更新使用
    lastUseTime : { type: Date, default: Date.now },            //最后使用时间
    locked : {type: Number, default: 0},            //是否锁定

    type : { type : String},                        //业务类型

    tenant : { type: String, ref : "M_Tenant", default: config.dbUser.admin.tenant },    //所属租户

    state : { type: Number, default : 1},           //是否有效
    createTime: {type: Date, default: Date.now},    //创建时间
    creater: {type: String, ref : "M_User", default: config.dbUser.robot._id},          //创建者
    updateTime : { type: Date, default: Date.now},  //最后更新时间
    updater : { type: String, ref : "M_User", default: config.dbUser.robot._id}         //最后更新者
});
schema.path('lastUseTime').get(v => tool.date2string(v, 'yyyy-MM-dd hh:mm:ss'));
schema.set('toJSON', { getters: true});

const model = mongoose.model('U_File',schema);


module.exports = model;

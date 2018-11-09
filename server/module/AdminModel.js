'use strict';

/**
 *管理员
 */

const uuid = require('uuid');

const mongoose = require('./util/mongoDB'),
    Schema = mongoose.Schema;
const config = require('../config/config');
const tool = require('./util/tool');

const schema = new Schema({
    _id : {type : String, default: uuid.v4},
    name : { type: String, default:'default' },     //名称
    password : { type: String },                    //密码
    phone : { type: Number, default: () => parseInt(Math.random() * Math.pow(10, 11)) },         //手机号
    sex : { type: String },                      //性别
    email: {type: String},                          //邮箱
    state : { type: Number, default : 1},           //状态  1启用 0禁用
    createTime: {type: Date, default: Date.now},    //创建时间
    creater: {type: String, ref : "M_User", default: config.dbUser.robot._id},          //创建者
    updateTime : { type: Date, default: Date.now},  //最后更新时间
    updater : { type: String, ref : "M_User", default: config.dbUser.robot._id}         //最后更新者
});
schema.path('createTime').get(v => tool.date2string(v, 'yyyy-MM-dd hh:mm'));
schema.set('toJSON', { getters: true});

const Model = mongoose.model('admin',schema);

module.exports = Model;

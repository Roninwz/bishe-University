/**
 * Created by Roninwz on 2018/11/11.
 */
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
    _id: {type: String, default: uuid.v4},
    name: {type: String, default: 'default'},     //名称
    password: {type: String},                    //密码
    phone: {type: Number, default: () => parseInt(Math.random() * Math.pow(10, 11))},         //手机号
    sex: {type: String},                      //性别
    email: {type: String},                          //邮箱
    imgUrl:{type:String},    //头像

    /**
     * 角色
     */
    role: {type: String, ref: "M_Role"},

    remark:{type:String},   //备注

    state: {type: Number, default: 1},           //状态  1启用 0禁用
    createTime: {type: Date, default: Date.now},    //创建时间
    creater: {type: String, ref: "M_Admin", default: config.dbUser.robot._id},          //创建者
    updateTime: {type: Date, default: Date.now},  //最后更新时间
    updater: {type: String, ref: "M_Admin", default: config.dbUser.robot._id}         //最后更新者
});
schema.path('createTime').get(v => tool.date2string(v, 'yyyy-MM-dd hh:mm'));
schema.set('toJSON', {getters: true});

const Model = mongoose.model('M_Admin', schema, 'm_admin');
module.exports = Model;

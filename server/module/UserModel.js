/**
 * Created by Roninwz on 2018/11/11.
 */

'use strict';

/**
 * 用户管理
 */

const uuid = require('uuid');

const mongoose = require('./util/mongoDB'),
    Schema = mongoose.Schema;
const config = require('../config/config');
const tool = require('./util/tool');

const schema = new Schema({
    /**
     * ID
     */
    _id: {type: String, default: uuid.v4},
    /**
     * 用户名
     */
    name: {type: String, default: 'default'},
    /**
     * 编码
     */
    code: {type: String,},
    /**
     * 密码
     */
    password: {type: String,default:'123456'},
    /*
    * 手机号
    * */
    phone: {type: String},
    /*
    * 邮箱
    * */
    email: {type: String},
    /*
    * 性别
    * */
    sex: {type: Number},//0 男  1 女
    /**
     * 头像
     */
    imgUrl: {type: String},

    /**
     * 省份
     */
    province: {type: String},
    /**
     * 城市
     */
    city: {type: String},
    /**
     * 区域
     */
    area: {type: String},
    /**
     * 地址
     */
    address: {type: String},
    /**
     * 详细地址
     */
    detailAddress: {type: String},

    /**
     * 状态
     */
    state: {type: Number, default: 1},
    /**
     * 创建时间
     */
    createTime: {type: Date, default: Date.now},
    /**
     * 创建人
     */
    creater: {type: String, ref: "M_User", default: config.dbUser.robot._id},
    /**
     * 更新时间
     */
    updateTime: {type: Date, default: Date.now},
    /**
     * 最后更新人
     */
    updater: {type: String, ref: "M_User", default: config.dbUser.robot._id}
});
schema.path('createTime').get(v => tool.date2string(v, 'yyyy-MM-dd hh:mm'));
schema.set('toJSON', {getters: true});

const Model = mongoose.model('M_User', schema, 'm_user');

module.exports = Model;

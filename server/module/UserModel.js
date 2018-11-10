/**
 * Created by wangshuyi on 2016/12/27.
 */

'use strict';

/**
 * 用户管理
 */

const uuid = require('uuid');

const mongoose = require('../../util/mongoDB'),
    Schema = mongoose.Schema;
const config = require('../../../config/config');
const tool = require('../../../module/util/tool');

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
    password: {type: String},

    /**
     * 用户类型: 1.移动端用户/2.web端用户
     */
    type: {type: Number, default: 2},
    /**
     * 微信openId
     */
    wxOpenId: {type: []},
    /**
     * 头像
     */
    icon: {type: String},

    /**
     * 家长姓名
     */
    parName: {type: String},
    /**
     * 家长手机号码
     */
    parPhone: {type: String,},
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
    region:{type:String},
    /**
     * 积分
     */
    score: {type: Number, default: 0},
    /**
     * 捐赠次数
     */
    donateNum: {type: Number},
    /**
     * 申领次数
     */
    receiveNum: {type: Number},
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

const Model = mongoose.model('M_User', schema);

module.exports = Model;

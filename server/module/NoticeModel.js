/**
 * @author Roninwz
 * @date 2018/11/11 14:15
 * @since 1.0.0
 */
'use strict';

/**
 *公告表
 */

const uuid = require('uuid');

const mongoose = require('./util/mongoDB'),
    Schema = mongoose.Schema;
const config = require('../config/config');
const tool = require('./util/tool');

const schema = new Schema({
    _id: {type: String, default: uuid.v4},
    title: {type: String, default: 'default'},     //标题
    tag:{type:String, default: 'IT大学网'},
    content: {type: String},                    //内容
    lookNum: {type: Number,default:0}, //浏览量
    zanNum: {type: Number,default:0},  //点赞量
    state: {type: Number, default: 1},           //状态  1启用 0禁用
    createTime: {type: Date, default: Date.now},    //创建时间
    creater: {type: String, ref: "M_Admin", default: config.dbUser.robot._id},          //创建者
    updateTime: {type: Date, default: Date.now},  //最后更新时间
    updater: {type: String, ref: "M_Admin", default: config.dbUser.robot._id}         //最后更新者
});
schema.path('createTime').get(v => tool.date2string(v, 'yyyy-MM-dd hh:mm'));
schema.set('toJSON', {getters: true});

const Model = mongoose.model('T_Notice', schema, 't_notice');
module.exports = Model;

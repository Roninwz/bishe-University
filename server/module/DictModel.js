/**
 * Created by wangshuyi on 2016/12/27.
 */

'use strict';

/**
 * 数据字典
 */

const uuid = require('uuid');
const mongoose = require('./util/mongoDB'),
    Schema = mongoose.Schema;
const config = require('../config/config');

const optionSchema = new Schema({
    code : { type: String},                         //编码
    text : {type: String},                          //文本
    state : {type : Number, default : 1}            //状态
});

const schema = new Schema({
    _id : {type : String, default: uuid.v4},
    code : {type : String},                         //编码
    name : { type: String },                        //名称
    options: [optionSchema],                        //选项
    remark : { type: String },                      //备注
    state : { type: Number, default : 1},           //状态，是否删除
    createTime: {type: Date, default: Date.now},    //创建时间
    creater: {type: String, ref : "M_Admin", default: config.dbUser.robot._id},          //创建者
    updateTime : { type: Date, default: Date.now},  //最后更新时间
    updater : { type: String, ref : "M_Admin", default: config.dbUser.robot._id}         //最后更新者
});
schema.index({code: 1});

const model = mongoose.model('M_Dict',schema);


module.exports = model;

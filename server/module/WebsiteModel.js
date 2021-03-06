/**
 * 网站大全model
 * @author Roninwz
 * @date 2018/11/11 14:35
 * @since 1.0.0
 */
const uuid = require('uuid');

const mongoose = require('./util/mongoDB'),
    Schema = mongoose.Schema;
const config = require('../config/config');
const tool = require('./util/tool');

const schema = new Schema({
    _id: {type: String, default: uuid.v4},
    title: {type: String, default: 'default'},     //标题
    content: {type: String},                    //内容 -- 做限制  不超过200字
    imgUrl: {type: String},                          //图片  单图
    link: {type: String},   //网址
    state: {type: Number, default: 1},           //状态  1启用 0禁用
    createTime: {type: Date, default: Date.now},    //创建时间
    creater: {type: String, ref: "M_Admin", default: config.dbUser.robot._id},          //创建者
    updateTime: {type: Date, default: Date.now},  //最后更新时间
    updater: {type: String, ref: "M_Admin", default: config.dbUser.robot._id}         //最后更新者
});
schema.path('createTime').get(v => tool.date2string(v, 'yyyy-MM-dd hh:mm'));
schema.set('toJSON', {getters: true});

const Model = mongoose.model('T_Website', schema, 't_website');
module.exports = Model;

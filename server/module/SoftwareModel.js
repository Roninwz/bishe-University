/**
 * 软件中心model   模仿有趣网址之家  https://youquhome.com/
 * @author Roninwz
 * @date 2018/11/11 14:32
 * @since 1.0.0
 */
const uuid = require('uuid');

const mongoose = require('./util/mongoDB'),
    Schema = mongoose.Schema;
const config = require('../config/config');
const tool = require('./util/tool');

const schema = new Schema({
    _id: {type: String, default: uuid.v4},
    title: {type: String, ref: 'T_Technology'},     //评论文章id
    content: {type: String},                    //评论内容
    lookNum: {type: Number}, //浏览量
    zanNum: {type: Number},  //点赞量
    link: {type: String},  //资源链接
    pass: {type: String}, //资源链接密码
    linkType: {type: Number},   //0 百度云资源  1 蓝奏云资源
    state: {type: Number, default: 1},           //状态  1启用 0禁用
    createTime: {type: Date, default: Date.now},    //创建时间
    creater: {type: String, ref: "M_User", default: config.dbUser.robot._id},          //创建者
    updateTime: {type: Date, default: Date.now},  //最后更新时间
    updater: {type: String, ref: "M_User", default: config.dbUser.robot._id}         //最后更新者
});
schema.path('createTime').get(v => tool.date2string(v, 'yyyy-MM-dd hh:mm'));
schema.set('toJSON', {getters: true});

const Model = mongoose.model('T_Software', schema, 't_software');
module.exports = Model;
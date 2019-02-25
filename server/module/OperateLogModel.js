/**
 * 操作日志
 * @author Roninwz
 * @date 2018/12/19 19:15
 * @since 1.0.0
 */

const uuid = require('uuid');

const mongoose = require('./util/mongoDB'),
    Schema = mongoose.Schema;
const config = require('../config/config');
const tool = require('./util/tool');
const schema = new Schema({
    _id : {type : String, default: uuid.v4},
    name : { type: String },                        //日志名称
    address: {type: String },                       //操作地点
    type:{type:String},                             //操作类型
    action:{type:String},                           //操作请求url
    status:{type:Number},                           //1操作成功  0操作失败
    state: {type: Number, default: 1},           //状态  1启用 0禁用
    createTime: {type: Date, default: Date.now},    //创建时间
    creater: {type: String, ref: "M_Admin", default: config.dbUser.robot._id},          //创建者
    updateTime: {type: Date, default: Date.now},  //最后更新时间
    updater: {type: String, ref: "M_Admin", default: config.dbUser.robot._id}         //最后更新者
});
schema.path('createTime').get(v => tool.date2string(v, 'yyyy-MM-dd hh:mm'));
schema.set('toJSON', {getters: true});

const Model = mongoose.model('T_OperateLog', schema, 't_operatelog');
module.exports = Model;
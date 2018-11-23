/**
 *
 * @author Roninwz
 * @date 2018/11/23 10:44
 * @since 1.0.0
 */
/**
 * 菜单权限
 * @type {*|v4}
 */

const uuid = require('uuid');

const mongoose = require('./util/mongoDB'),
    Schema = mongoose.Schema;
const config = require('../config/config');
const tool = require('./util/tool');
const Constant = require('../config/systemConstant');
const schema = new Schema({
    _id : {type : String, default: uuid.v4},
    name : { type: String },                        //名称
    code: {type: String, unique: true},             //编码
    link: {type: String },                          //链接
    icon: {type: String },                          //图标
    sort : { type: Number },                        //排序

    parent : { type: String, ref: 'M_Menu' },         //父级节点
    __type: {type: String, default : Constant.TREE_MODEL.LEAF},       //节点类型

    state: {type: Number, default: 1},           //状态  1启用 0禁用
    createTime: {type: Date, default: Date.now},    //创建时间
    creater: {type: String, ref: "M_User", default: config.dbUser.robot._id},          //创建者
    updateTime: {type: Date, default: Date.now},  //最后更新时间
    updater: {type: String, ref: "M_User", default: config.dbUser.robot._id}         //最后更新者
});
schema.path('createTime').get(v => tool.date2string(v, 'yyyy-MM-dd hh:mm'));
schema.set('toJSON', {getters: true});

const Model = mongoose.model('M_Menu', schema, 'm_menu');
module.exports = Model;
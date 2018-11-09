/**
 * Created by wangshuyi on 2016/12/28.
 */

'use strict';
const extend = require('extend');

const resUtil = {};
const defaultData = {
    success : true,
    data : {},
    rows : [],
    total : 0,
    message : "操作成功。",
    errorCode : 0
}

resUtil.success = function (data) {
    return extend({}, defaultData, data);
}

resUtil.error = function (data) {
    return extend({}, defaultData, {
        success : false,
        message : "系统异常，请联系管理员。",
        errorCode: -1
    }, data)
}
resUtil.forbidden = function (data) {
    return extend({}, defaultData, {
        success : false,
        message : "无权限访问。",
        errorCode: 403
    }, data)
}

module.exports = resUtil;
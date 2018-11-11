'use strict';
const request = require('request');
const extend = require('extend');
const uuid = require('uuid');
const fs = require('fs');

const myUtil = {
    endTypeEnum: {
        desktop: 1,
        mobile: 3,
        pad: 5
    }
};

myUtil.send = function (param, callback) {
    let data;
    if (global.config.mock) {
        //TODO: mock框架的优化
        try {
            data = require(`../mockService${param.uri.substr(0, param.uri.indexOf('?'))}_${param.method}.js`);
            callback(null, null, data);
        } catch (e) {
            callback(e, null, data);
        }
    } else {
        let defaultParam = {
            json: {},
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Accept-Language": param.language || "zh"
            }
        };
        let _param = extend(true, {}, defaultParam, param);
        request(_param, callback);
    }
};

/**
 * 深度合并对象
 * @param defaultParam
 * @param myParam
 */
myUtil.extend = function (defaultParam, myParam) {
    return extend(true, {}, defaultParam, myParam);
};

myUtil.isToday = function (date) {
    let today = new Date();
    let todayTime = today.getTime() - today.getTime() % (1000 * 60 * 60 * 24);
    let dateTime = date.getTime();
    if (dateTime > todayTime && dateTime < (todayTime + (1000 * 60 * 60 * 24))) {
        return true;
    } else {
        return false;
    }
};

myUtil.addLength = function (str, length) {
    let newStr = str + "";
    while (newStr.length < length) {
        newStr = "0" + newStr;
    }
    return newStr;
};

/**
 * 日期格式化
 * @param date 日期
 * @param format 格式
 * @returns {*} 格式化后的字符串值
 */
myUtil.dateFormatter = function (date, format) {
    let o = {
        "M+": date.getMonth() + 1, //month
        "d+": date.getDate(),      //day
        "h+": date.getHours(),     //hour
        "m+": date.getMinutes(),   //minute
        "s+": date.getSeconds(),   //second
        "w+": "天一二三四五六".charAt(date.getDay()),   //week
        "q+": Math.floor((date.getMonth() + 3) / 3),  //quarter
        "S": date.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1,
            (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                    ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};
myUtil.string2date = function (string, format) {
    format = format || 'yyyy-MM-dd';
    var y = string.substring(format.indexOf('y'), format.lastIndexOf('y') + 1);//年
    var M = string.substring(format.indexOf('M'), format.lastIndexOf('M') + 1);//月
    var d = string.substring(format.indexOf('d'), format.lastIndexOf('d') + 1);//日
    var h = string.substring(format.indexOf('h'), format.lastIndexOf('h') + 1);//时
    var m = string.substring(format.indexOf('m'), format.lastIndexOf('m') + 1);//分
    var s = string.substring(format.indexOf('s'), format.lastIndexOf('s') + 1);//秒

    if (s == null || s == "" || isNaN(s)) {
        s = new Date().getSeconds();
    }
    if (m == null || m == "" || isNaN(m)) {
        m = new Date().getMinutes();
    }
    if (h == null || h == "" || isNaN(h)) {
        h = new Date().getHours();
    }
    if (d == null || d == "" || isNaN(d)) {
        d = new Date().getDate();
    }
    if (M == null || M == "" || isNaN(M)) {
        M = new Date().getMonth() + 1;
    }
    if (y == null || y == "" || isNaN(y)) {
        y = new Date().getFullYear();
    }
    var dt = null;
    eval("dt = new Date('" + y + "', '" + (M - 1) + "','" + d + "','" + h + "','" + m + "','" + s + "')");
    return dt;
};
myUtil.date2string = function (date, format = 'yyyy-MM-dd', todayFlag = false) {
    var o = {
        "M+": date.getMonth() + 1, //month
        "d+": date.getDate(),      //day
        "h+": date.getHours(),     //hour
        "m+": date.getMinutes(),   //minute
        "s+": date.getSeconds(),   //second
        "w+": "天一二三四五六".charAt(date.getDay()),   //week
        "q+": Math.floor((date.getMonth() + 3) / 3),  //quarter
        "S": date.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1,
            (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                    ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    if (todayFlag) {
        let today = this.date2string(new Date());
        if (today === format.substr(0, 10)) {
            format = '今天' + format.substr(10);
        }
        let yesterday = this.date2string(new Date(new Date().getTime() - 1000 * 60 * 60 * 24));
        if (yesterday === format.substr(0, 10)) {
            format = '昨天' + format.substr(10);
        }
    }
    return format;
};

/**
 * 客户信息的获取
 * @param url
 * @param callback
 */
myUtil.customerInfo = function (url, callback) {
    request({
        method: 'get',
        //uri: global.config.service['crm']+'/user/code/'+openId,
        uri: url,
        json: {},
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }, function (error, response, body) {
        //判断body
        let userData = {userType: 'public'};
        if (body && body.id > 0) {
            userData.userType = body.type;
            userData.siteId = body.company;
            userData.userId = body.id;
            userData.userCode = body.code;
            userData.userName = body.name;
            userData.userMobile = body.phone;
            userData.addressCount = body.addressCount;
            userData.userJob = body.userJob;
            if (body.defaultAddress) {
                userData.defaultAddress = body.defaultAddress;
            }
        }
        callback(userData);
    });
};

myUtil.traversalFolderSync = function (folder, param, path, level) {
    level = level || 0;
    path = path || [];
    let files = fs.readdirSync(folder);
    files.forEach(function (f, i) {
        path[level] = f;
        let FilePath = folder + '/' + f;
        if (fs.statSync(FilePath).isFile()) {
            if (typeof param.each == 'function') {
                param.each('file', FilePath, path, level);
            }
            if (typeof param.eachFile == 'function') {
                param.eachFile(FilePath, path, level);
            }
        } else {
            if (typeof param.each == 'function') {
                param.each('folder', FilePath, path, level);
            }
            if (typeof param.eachFolder == 'function') {
                param.eachFolder(FilePath, path, level);
            }
            myUtil.traversalFolderSync(FilePath, param, path.concat(), level + 1);
        }
    });
    path.shift();
};

myUtil.escape2Html = function (str) {
    let arrEntities = {'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"'};
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
        return arrEntities[t];
    });
};

/**
 * 在指定字符前面补0，以达到指定的长度
 * @param str 需要补0的字符串
 * @param length 需要达到的长度
 * @returns {string} 补0后的字符串
 */
myUtil.padZero = function (str, length) {
    let newStr = str + "";
    while (newStr.length < length) {
        newStr = "0" + newStr;
    }
    return newStr;
};

/**
 * 获取请求端的类型
 * @param str
 * @returns {string}
 */
myUtil.endType = function (str) {
    return /mobile|Mobile/.test(str) ? "mobile" : "desktop";
};

/**
 * 获取随机串
 */
myUtil.uuid = function () {
    return uuid.v4();
};

/**
 * 替换url上的变量
 */
myUtil.setPathData = function (url, data) {
    let key;
    for (key in data) {
        url = url.replace('{' + key + '}', data[key]);
    }
    return url;
};

/**
 * 生成随机数
 */
myUtil.random = function (length) {
    let _Length = length || 6;
    let randomNumber = Math.round(Math.random() * Math.pow(10, _Length));
    let randomStr = randomNumber + "";
    if (randomStr.length < _Length) {
        for (let i = 0; i < _Length - randomStr.length;) {
            randomStr = "0" + randomStr;
        }
    }
    return randomStr;
};
myUtil.randomInt = function (max, min) {
    min = min || 0;
    let result = min + Math.floor(Math.random() * (max + 1 - min));
    if (result > max) {
        result = max;
    }
    return result;
};


module.exports = myUtil;
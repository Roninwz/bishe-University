/**
 * Created by wangshuyi on 2017/1/18.
 */
'use strict';
const logger = require('log4js').getLogger("sys");
const JobMethod = {};

const {dbUser} = require('../../config/config');


JobMethod.test = function (param) {
    return new Promise((resolve, reject) => {
        let data = new Date();
        console.log(data);
        resolve({message: `当前时间：${data.toLocaleString()}`});
    });
};
JobMethod.testParam = function (param) {
    return new Promise((resolve, reject) => {
        resolve({message: JSON.stringify(param)});
    });
};

module.exports = JobMethod;
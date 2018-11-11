/**
 * Created by wangshuyi on 2016/12/27.
 */

'use strict';
//TODO 解决时间区间及日期格式化
const mongoose = require('mongoose');
const logger = require('log4js').getLogger("sys");
const config = require('../../config/config');

let db_connect = `mongodb://${config.db.username}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.database}`;
// let db_connect = `mongodb://${config.db.host}:${config.db.port}/${config.db.database}`;

//重点在这一句，赋值一个全局的承诺.
mongoose.Promise = global.Promise;

/**
 * 连接
 */
mongoose.connect(db_connect, config.db.options);

/**
 * 连接成功
 */
mongoose.connection.on('connected', function () {
    logger.info('Mongoose connection open to ' + db_connect);
});

/**
 * 连接异常
 */
mongoose.connection.on('error', function (err) {
    logger.error('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
    logger.warn('Mongoose connection disconnected');
});

module.exports = mongoose;
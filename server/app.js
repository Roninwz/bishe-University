var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const xmlParser = require('express-xml-bodyparser');
const log4js = require('log4js');
let logger = log4js.getLogger("sys");
var usersRouter = require('./routes/users');
const fs = require('fs');
var app = express();
var cors = require('cors');
//config
console.log("/------------------------ 系统配置信息 ------------------------/");
global.config = require(path.join(__dirname, 'config/config'));
console.log(global.config);
console.log("///////////////////////// 系统配置信息 /////////////////////////");
log4js.configure(global.config.log);
global.tool = require(path.join(__dirname, 'module/util/tool'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(xmlParser({}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(log4js.connectLogger(logger, {level: 'info', format: ':method | :status | :response-time ms | :url '}));
logger.debug('/--------------------- init Router -------------------/');
logger.debug('/----------------------- routes ---------------------/');
global.tool.traversalFolderSync(path.join(__dirname, 'routes'), {
    eachFile: function (path, pathArr, level) {
        let url = pathArr.join('/').replace('.js', '');
        url = url.replace(/(\/?)(\d+)_/g, '$1');
        switch (url) {               //在这里可以有一些特殊处理
            case "index":
                url = '';
                break;
        }
        logger.info(url, path);
        if (url.indexOf(".DS_Store") < 0) {
            app.use('/' + url, require(path));
        }
    }
});
logger.debug('///////////////////////// routes //////////////////////');
logger.debug('/--------------------- init Router shot down -------------------/');
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
logger.debug('///////////////////////// routes //////////////////////');

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
const resUtil = require("./module/util/resUtil");
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    // res.status(err.status || 500);
    // res.render('common/error');
    let dataFlag = req.headers["ajax-flag"], resPage, resData = {
        message: err.message,
        error: err
    };
    if (err.status === 404 || err.message.indexOf('Failed to lookup view') > -1) {
        resPage = 'common/notFound';
    } else if (err.status === 401) {
        resPage = 'common/forbidden';
    } else {
        resPage = 'common/error';
        res.status(err.status || 500);
    }
    res.send(resUtil.error(resData));
    // if(dataFlag){
    //     res.send(resUtil.error(resData));
    // }else{
    //     res.render(resPage, resData)
    // }
});

logger.debug('/----------------------- Init Data ---------------------/');
const InitDbData = require('./module/util/initDbData');
InitDbData.init();
app.use(cors({
    origin: ['http://localhost'],
    methods: ['GET', 'POST'],
    alloweHeaders: ['Conten-Type', 'Authorization']
}));


module.exports = app;

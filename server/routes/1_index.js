
'use strict';
const express = require('express');
const router = express.Router();

const resUtil = require("../module/util/resUtil");
const UserService = require("../service/UserService");
const config = require("../config/config");

/* GET home page. */
// router.get('/', function(req, res, next) {
//     res.redirect(global.config.path.contextPath+'/view/index');
// });

router.use('*', function(req, res, next) {
    let language, loginFlag, dataFlag, local = 'zh';

    // if(req.query.local){
    //     local = req.query.local;
    //     req.session.local = local;
    // }else if(req.session.local){
    //     local = req.session.local;
    // }else{
    //     language = req.headers["accept-language"] || 'zh-CN';
    //     local = language.substr(0,2);
    //     req.session.local = local;
    // }
    // req.setLocale(local);

    // req.endType = "";
    req.endType = global.tool.endType(req.headers['user-agent']);

    req.defaultParam = {
        path : null,
        redirect : null,
        data : req.query || {},
        body : {},
        userData:{},
        cookie : req.cookies,
        local : local,
    };

    //check login
    // loginFlag = Boolean(req.session.userData);  save|update|remove|register|getCode|order|user|login

    let passUrl = /detail|find|list|dict|export|register|getCode|count|lost|/;
    // let siteUrl = /donate/;

    let checkLogin = new Promise((resolve, reject) => {
        if(req.headers.token){
            UserService.findById(config['dbUser']['robot'], req.headers.token).then(user => {
                if(user){
                    resolve(user);
                }else{
                    reject({message:'无效的token'});
                }
            });
        }else{
            reject({});
        }
    });
    checkLogin.then(user => {
        req.curUser = user;
        console.log("req.curUser:"+user);
        next();
    }).catch(err => {
        // if(passUrl.test(req.baseUrl)){
            req.curUser = config['dbUser']['robot'];
            next();
        // }else{
        //     res.send(resUtil.forbidden(err));
        // }
    });
});

module.exports = router;

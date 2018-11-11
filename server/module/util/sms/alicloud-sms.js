//Created by wangshuyi on 2018/5/15.

'use strict';

/**
 * 云通信基础能力业务短信发送、查询详情以及消费消息示例，供参考。
 * Created on 2017-07-31
 */
const SMSClient = require('@alicloud/sms-sdk');
// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = 'LTAISVF73SK3KKgC';
const secretAccessKey = 'rCzmrkEvgVWFalii0ftHd2M22zZHVm';
//初始化sms_client
let smsClient = new SMSClient({accessKeyId, secretAccessKey});
//发送短信
// smsClient.sendSMS({
//     PhoneNumbers: '15801689774',
//     SignName: '货嘀嘀嘀',
//     TemplateCode: 'SMS_26205194',
//     TemplateParam: '{"code":"12345"}'
// }).then(function (res) {
//     let {Code}=res;
//     if (Code === 'OK') {
//         //处理返回参数
//         console.log(res)
//     }
// }, function (err) {
//     console.log(err)
// });

let smsUtil = {
    /**
     * 发送短信
     * @param phone
     * @param code
     * @param data
     * @return Promise
     */
    sendMsg(phone, code, data) {
        return new Promise((resolve, reject) => {
            smsClient.sendSMS({
                PhoneNumbers: phone,
                SignName: '货嘀嘀嘀',
                TemplateCode: code,
                TemplateParam: data
            }).then(result => {
                if (result.Code === 'OK') {
                    resolve(result);
                } else {
                    reject(result);
                }
            }).catch(e => {
                reject(e);
            });
        });
    },

    /**
     * 司机注册通知
     * @param phone
     * @param data Object {name:司机名称, cname:注册人, dtype:司机, contacter:注册人手机号}
     * @return Promise
     */
    registerDriver(phone, data) {
        return this.sendMsg(phone, 'SMS_26270162', JSON.stringify(data));
    },

    /**
     * 获取动态密码
     * @param phone
     * @param code
     * @return Promise
     */
    loginPwd(phone, code) {
        return this.sendMsg(phone, 'SMS_26085209', JSON.stringify({code: code}));
    },

    /**
     * 忘记密码
     * @param phone
     * @param code
     * @return Promise
     */
    forgetPwd(phone, code) {
        return this.sendMsg(phone, 'SMS_26205194', JSON.stringify({code: code}));
    },

    /**
     * 注册验证码
     * @param phone
     * @param code
     * @return Promise
     */
    registerUser(phone, code) {
        return this.sendMsg(phone, 'SMS_12810794', JSON.stringify({code: code}));
    },
};

module.exports = smsUtil;
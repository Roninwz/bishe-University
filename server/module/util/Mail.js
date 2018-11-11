'use strict';
const mailer = require('nodemailer');

const defaultParams = {
    service: 'qq',
    auth: {
        user: '494297161@qq.com', // generated ethereal user
        pass: 'ghzmebpbndtvbghi'  // generated ethereal password
    }
};
const config_qq = {
    service: 'qq',
    auth: {
        user: '494297161@qq.com', // generated ethereal user
        pass: 'ghzmebpbndtvbghi'  // generated ethereal password
    }
};
const config_163 = {
    service: '163',
    auth: {
        user: 'cy_wangsy@163.com', // generated ethereal user
        pass: 'mouse123456'  // generated ethereal password
    }
};

class Mail {
    constructor(param) {
        this.opts = Object.assign({}, this.opts, defaultParams, param);
        this.transporter = null;

        this.init();
    }

    init() {
        this.transporter = mailer.createTransport(this.opts);
    }

    /**
     * 发送邮件
     * @param to
     * @param subject
     * @param content
     * @param cc
     * @param bcc
     * @param attachments []
     * @return {Promise}
     */
    sendMail(options) {
        return new Promise((resolve, reject) => {
            let mailOption = Object.assign({}, options, {
                from: this.opts.sendUser || this.opts.auth.user, // sender address
                html: options.content,
            });

            this.transporter.sendMail(mailOption, (error, info) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(info);
                }
            });
        });
    }
}

let mail = new Mail();

module.exports = mail;
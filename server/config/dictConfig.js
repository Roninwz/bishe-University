/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

module.exports = [
    /* 1 */
    {
        "code": "formInputType",
        "name": "表单输入类型",
        "state": 1,
        "options": [
            {
                "text": "文本",
                "code": "string",
                "state": 1
            },
            {
                "text": "选择",
                "code": "select",
                "state": 1
            },
            {
                "text": "数字",
                "code": "number",
                "state": 1
            }
        ],
    },

    /* 2 */
    {
        "code": "attributeBelong",
        "name": "属性类型",
        "state": 1,
        "options": [
            {
                "code": "inherit",
                "text": "继承",
                "state": 1
            },
            {
                "code": "self",
                "text": "自有",
                "state": 1
            }
        ],
    },

    /* 3 */
    {
        "name": "文件业务类型",
        "code": "fileFolder",
        "state": 1,
        "options": [
            {
                "text": "无",
                "code": "",
                "state": 1
            },
            {
                "text": "测试",
                "code": "test",
                "state": 1
            },
            {
                "code": "systemConfig",
                "text": "系统配置",
                "state": 1
            },
            {
                "code": "articleIcon",
                "text": "文章图标",
                "state": 1
            },
            {
                "code": "articleImg",
                "text": "文章封面",
                "state": 1
            },
            {
                "code": "bookcaseIcon",
                "text": "目录图标",
                "state": 1
            },
            {
                "code": "bookcaseBanner",
                "text": "目录轮播",
                "state": 1
            },
            {
                "code": "licenseImg",
                "text": "资格证书",
                "state": 1
            },
            {
                "code": "companyLogo",
                "text": "公司LOGO",
                "state": 1
            },
            {
                "code": "roadTransportImg",
                "text": "道路通行证",
                "state": 1
            },
            {
                "text": "电子签名",
                "code": "sign",
                "state": 1
            }
        ],
        "__v": 0
    },

    /* 4 */
    {
        "code": "orgCategory",
        "name": "组织级别",
        "state": 1,
        "options": [
            {
                "code": "1",
                "text": "客户",
                "state": 1
            },
            {
                "code": "2",
                "text": "站点",
                "state": 1
            },
            {
                "code": "3",
                "text": "服务线",
                "state": 1
            }
        ],
    },

    /* 5 */
    {
        "code": "sex",
        "name": "性别",
        "state": 1,
        "options": [
            {
                "code": "male",
                "text": "男",
                "state": 1
            },
            {
                "code": "female",
                "text": "女",
                "state": 1
            }
        ],
    },

    /* 6 */
    {
        "code": "validateType",
        "name": "验证类型",
        "state": 1,
        "options": [
            {
                "code": "EMAIL",
                "text": "企业邮箱",
                "state": 1
            },
            {
                "code": "PIN",
                "text": "安全码",
                "state": 1
            }
        ],
    },

    /* 7 */
    {
        "code": "Boolean",
        "name": "布尔值",
        "state": 1,
        "options": [
            {
                "code": "1",
                "text": "是",
                "state": 1
            },
            {
                "code": "0",
                "text": "否",
                "state": 1
            }
        ],
    },

    /* 8 */
    {
        "code": "companyType",
        "name": "公司类型",
        "state": 1,
        "options": [
            {
                "code": "personal",
                "text": "个体",
                "state": 1
            },
            {
                "code": "enterprise",
                "text": "企业",
                "state": 1
            }
        ],
    },

    /* 9 */
    {
        "code": "companyAuthStatus",
        "name": "车队认证状态",
        "state": 1,
        "options": [
            {
                "code": "not",
                "text": "未认证",
                "state": 1
            },
            {
                "code": "onGoing",
                "text": "认证中",
                "state": 1
            },
            {
                "code": "finished",
                "text": "已认证",
                "state": 1
            }
        ],
    },

    /* 10 */
    {
        "code": "bookcasePageType",
        "name": "目录展现类型",
        "state": 1,
        "options": [
            {
                "code": "common",
                "text": "通用",
                "state": 1
            }
        ],
    },

    /* 11 */
    {
        "code": "newsStatus",
        "name": "消息状态",
        "state": 1,
        "options": [
            {
                "text": "草稿",
                "code": "draft",
                "state": 1
            },
            {
                "text": "发布中",
                "code": "active",
                "state": 1
            },
            {
                "text": "已过期",
                "code": "expired",
                "state": 1
            }
        ],
    },

    /* 12 */
    {
        "code": "identifyingCodeType",
        "name": "验证码类型",
        "state": 1,
        "options": [
            {
                "text": "手机",
                "code": "phone",
                "state": 1
            },
            {
                "text": "邮箱",
                "code": "email",
                "state": 1
            },
            {
                "text": "网页",
                "code": "web",
                "state": 1
            }
        ],
    },

    /* 13 */
    {
        "code": "articleTag",
        "name": "文章标签",
        "state": 1,
        "options": [
            {
                "code": "test",
                "text": "测试",
                "state": 1
            },
            {
                "code": "html",
                "text": "HTML",
                "state": 1
            }
        ],
    },

    /* 14 */
    {
        "code": "articleType",
        "name": "文章类型",
        "state": 1,
        "options": [
            {
                "code": "local",
                "text": "本地文章",
                "state": 1
            },
            {
                "code": "third",
                "text": "第三方链接",
                "state": 1
            }
        ],
    },

    /* 15 */
    {
        "code": "systemConfig",
        "name": "系统配置",
        "state": 1,
        "options": [
            {
                "text": "400-000-0000",
                "code": "customerServicePhone",
                "state": 1
            },
            {
                "text": "QQ 40000000",
                "code": "questionOnline",
                "state": 1
            }
        ],
    },

    /* 16 */
    {
        "code": "noticeType",
        "name": "通知类型",
        "state": 1,
        "options": [
            {
                "code": "system",
                "text": "系统通知",
                "state": 1
            }
        ],
    },

    /* 17 */
    {
        "code": "noticeStatus",
        "name": "通知状态",
        "state": 1,
        "options": [
            {
                "code": "read",
                "text": "已读",
                "state": 1
            },
            {
                "code": "unread",
                "text": "未读",
                "state": 1
            }
        ],
    },
];
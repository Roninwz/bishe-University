/**
 * Created by wangshuyi on 2017/1/18.
 */

'use strict';

const fs = require('fs');
const logger = require('log4js').getLogger("sys");
const ejs = require('ejs');

const MenuService = require('../../service/system/MenuService');

const generateConfig = {
    generatePart: [],

    service: {
        template: "service",
        basePath: "../../service/",
        fileSuffix: "Service.js"
    },
    route: {
        template: "route",
        basePath: "../../routes/",
        lowerCaseFilename: true,
        fileSuffix: ".js"
    },
    treeService: {
        template: "treeService",
        basePath: "../../service/",
        fileSuffix: "Service.js"
    },
    treeRoute: {
        template: "treeRoute",
        basePath: "../../routes/",
        lowerCaseFilename: true,
        fileSuffix: ".js"
    },
    managementPage: {
        template: "managementPage",
        basePath: "../../views/",
        lowerCaseFilename: true,
        fileSuffix: "Management.ejs"
    },
    managementPageScript: {
        template: "managementPageScript",
        basePath: "../../frontend/page-script/",
        lowerCaseFilename: true,
        fileSuffix: "Management.js"
    },
    managementModelPage: {
        template: "managementModelPage",
        basePath: "../../views/",
        lowerCaseFilename: true,
        fileSuffix: "Management.ejs"
    },
    managementModelPageScript: {
        template: "managementModelPageScript",
        basePath: "../../frontend/page-script/",
        lowerCaseFilename: true,
        fileSuffix: "Management.js"
    },
    managementTreePage: {
        template: "managementTreePage",
        basePath: "../../views/",
        lowerCaseFilename: true,
        fileSuffix: "Management.ejs"
    },
    managementTreePageScript: {
        template: "managementTreePageScript",
        basePath: "../../frontend/page-script/",
        lowerCaseFilename: true,
        fileSuffix: "Management.js"
    },
    vuePage: {
        template: "vuePage",
        basePath: "../../../web-backoffice/src/page/",
        lowerCaseFilename: true,
        fileSuffix: ".vue"
    },
    vueTreePage: {
        template: "vueTreePage",
        basePath: "../../../web-backoffice/src/page/",
        lowerCaseFilename: true,
        fileSuffix: ".vue"
    },
};

let modelPathConfig = ['system', 'Test'];
let modelName = '测试';
let serviceType = 'dbService';//apiService   dbService
// let generateMenu = true;//是否在mongo中添加菜单
/**
 * 生面配置
 * @param generatePart 可选项：
 *    "service", "route",
 *    "managementPage", "managementPageScript",
 *    "managementModelPage", "managementModelPageScript"
 *    "treeService", "treeRoute",
 *    "managementTreePage", "managementTreePageScript"
 *    "vuePage"
 *    "vueTreePage"
 */
generateConfig.generatePart = ["vueTreePage"];

let basePath = "../".repeat(modelPathConfig.length);
let modelPath = modelPathConfig.join('/');

const Model = require(`../${modelPath}Model`);

let model = {
    modelName: Model.modelName,
    modelNameText: modelName || Model.modelName,
    serviceType: serviceType,
    path: {
        basePath: basePath,
        Model: `${basePath}module/${modelPath}Model`,
        service: `${basePath}service/${modelPath}Service`,
        route: `/${lowerCaseFilename(modelPath)}`,
        api: `/api`,
    },
    field: Model.schema.obj,
    codeFormatter: {},
    nameFormatter: {
        code: '编码',
        name: '名称',
        state: '状态',
        createTime: '创建时间',
        creater: '创建人',
        updateTime: '更新时间',
        updater: '更新人',
        parent: '上级节点',
        __type: '节点类型',

        price: '价格',
        amount: '金额',
        img: '图片',
        point: '积分',
        count: '数量',
        type: '类型',
        link: '链接',
        sort: '排序',
        remark: '备注',
        tenant: '租户',
    },

    unEditor: {
        _id: 'id',
        state: '状态',
        createTime: '创建时间',
        creater: '创建人',
        updateTime: '更新时间',
        updater: '更新人',
        __type: '节点类型',
        tenant: '租户',
    },
    unDetail: {
        _id: 'id',
        __type: '节点类型',
        state: '状态',
        creater: '创建人',
        updater: '更新人',
        tenant: '租户',
    },
    unLister: {
        _id: 'id',
        state: '状态',
        createTime: '创建时间',
        creater: '创建人',
        updateTime: '更新时间',
        updater: '更新人',
        __type: '节点类型',
        tenant: '租户',
    }
};

generateConfig.generatePart.forEach(function (part) {
    let template = fs.readFileSync(`./template/${generateConfig[part].template}.ejs`).toString();
    let module = ejs.render(template, model);
    let filename;

    if (generateConfig[part].lowerCaseFilename) {
        filename = lowerCaseFilename(modelPath);
    } else {
        filename = modelPath;
    }

    let folder = generateConfig[part].basePath;
    modelPathConfig.forEach(function (folderName, i) {
        if (i == modelPathConfig.length - 1) {
            return false;
        }
        if (i > 0) {
            folder += '/';
        }
        folder += folderName;
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder);
        }
    });

    fs.writeFileSync(`${generateConfig[part].basePath}${filename}${generateConfig[part].fileSuffix}`, module, "utf8");
});

logger.info("generate success");

function lowerCaseFilename(name) {
    let nameArr = name.split('/');
    let lastName = nameArr[nameArr.length - 1];
    let firstLetter = lastName.charAt(0);

    lastName = firstLetter.toLowerCase() + lastName.substr(1);
    nameArr[nameArr.length - 1] = lastName;

    return nameArr.join('/');
}






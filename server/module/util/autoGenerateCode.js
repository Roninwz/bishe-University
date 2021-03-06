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
let modelName = '??????';
let serviceType = 'dbService';//apiService   dbService
// let generateMenu = true;//?????????mongo???????????????
/**
 * ????????????
 * @param generatePart ????????????
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
        code: '??????',
        name: '??????',
        state: '??????',
        createTime: '????????????',
        creater: '?????????',
        updateTime: '????????????',
        updater: '?????????',
        parent: '????????????',
        __type: '????????????',

        price: '??????',
        amount: '??????',
        img: '??????',
        point: '??????',
        count: '??????',
        type: '??????',
        link: '??????',
        sort: '??????',
        remark: '??????',
        tenant: '??????',
    },

    unEditor: {
        _id: 'id',
        state: '??????',
        createTime: '????????????',
        creater: '?????????',
        updateTime: '????????????',
        updater: '?????????',
        __type: '????????????',
        tenant: '??????',
    },
    unDetail: {
        _id: 'id',
        __type: '????????????',
        state: '??????',
        creater: '?????????',
        updater: '?????????',
        tenant: '??????',
    },
    unLister: {
        _id: 'id',
        state: '??????',
        createTime: '????????????',
        creater: '?????????',
        updateTime: '????????????',
        updater: '?????????',
        __type: '????????????',
        tenant: '??????',
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






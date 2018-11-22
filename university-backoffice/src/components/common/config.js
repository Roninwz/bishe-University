//Created by wangshuyi on 07/03/2018.

'use strict';
function config(Vue){
  Vue.prototype.$Dolphin.path.contextPath = '';
  Vue.prototype.$Dolphin.path.apiPath = '/api';
  Vue.prototype.$Dolphin.path.publicPath = '/api/uploadFiles';
}


export default config

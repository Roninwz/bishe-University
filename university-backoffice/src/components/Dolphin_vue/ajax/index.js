//Created by wangshuyi on 07/03/2018.

'use strict';

import ajax from './Dol-ajax'

export default {
  install(Vue){
    Vue.prototype.$ajax = ajax;
  }
};

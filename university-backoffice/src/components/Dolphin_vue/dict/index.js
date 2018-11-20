//Created by wangshuyi on 07/03/2018.

'use strict';

import plugin from './Dol-dict'
import component from './Dol-dict.vue'

export default {
  install(Vue){
    Vue.prototype.$dict = plugin;
    Vue.component('dol-dict',component);
  }
};

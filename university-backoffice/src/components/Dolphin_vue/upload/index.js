//Created by wangshuyi on 07/03/2018.

'use strict';

import component from './Dol-upload.vue'
import component_ from './Dol-upload-img-List.vue'
import component__ from './Dol-upload-img.vue'

export default {
  install(Vue){
    Vue.component('dol-upload',component);
    Vue.component('dol-upload-img-list',component_);
    Vue.component('dol-upload-img',component__);
  }
};

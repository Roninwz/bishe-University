//Created by wangshuyi on 07/03/2018.

'use strict';

//plugin
import core from './core/Dol-core'
import ajax from './ajax/Dol-ajax'
import dict from './dict/Dol-dict'
import util from './util/Dol-util'

//component
import DolList from './list/Dol-list.vue'
import DolColDict from './list/Dol-col-dict.vue'
import DolDict from './dict/Dol-dict.vue'
import DolSelect from './select/Dol-select.vue'
import DolTree from './tree/Dol-tree.vue'
import DolUpload from './upload/Dol-upload.vue'
import DolImgList from './upload/Dol-upload-img-List.vue'
import DolImg from './upload/Dol-upload-img.vue'
import DolAddress from './address/Dol-address.vue'
import DolSignBox from './signBox/Dol-sign-box.vue'
import DolLoading from './loading/Dol-loading.vue'

export default {
  install(Vue){
    Vue.prototype.$Dolphin = core;
    Vue.prototype.$ajax = ajax;
    Vue.prototype.$dict = dict;
    Vue.prototype.$util = util;

    Vue.component('dol-list',DolList);
    Vue.component('dol-col-dict',DolColDict);
    Vue.component('dol-select',DolSelect);
    Vue.component('dol-dict',DolDict);
    Vue.component('dol-tree',DolTree);
    Vue.component('dol-upload',DolUpload);
    Vue.component('dol-upload-img-list',DolImgList);
    Vue.component('dol-upload-img',DolImg);
    Vue.component('dol-address',DolAddress);
    Vue.component('dol-sign-box',DolSignBox);
    Vue.component('dol-loading',DolLoading);
  }
}

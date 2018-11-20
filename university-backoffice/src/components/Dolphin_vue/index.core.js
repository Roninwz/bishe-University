//Created by wangshuyi on 07/03/2018.

'use strict';

//plugin
import core from './core/Dol-core'
import ajax from './ajax/Dol-ajax'
import dict from './dict/Dol-dict'
import util from './util/Dol-util'

//component
import DolList from './list/Dol-list.vue'
import DolDict from './dict/Dol-dict.vue'
import DolSelect from './select/Dol-select.vue'
import DolTree from './tree/Dol-tree.vue'

export default {
  install(Vue){
    Vue.prototype.$Dolphin = core;
    Vue.prototype.$ajax = ajax;
    Vue.prototype.$dict = dict;
    Vue.prototype.$util = util;

    Vue.component('dol-dict',DolDict);
  }
}

//Created by wangshuyi on 07/03/2018.

'use strict';
import DolList from './Dol-list.vue'
import DolColDict from './Dol-col-dict.vue'

// 这里是重点
const DolListIndex = {
  install: function(Vue){
    Vue.component('dol-list',DolList);
    Vue.component('dol-col-dict',DolColDict);
  }
}

// 导出组件
export default DolListIndex

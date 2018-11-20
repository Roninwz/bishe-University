//Created by wangshuyi on 07/03/2018.

'use strict';
import DolAddress from './Dol-address.vue'

// 这里是重点
const DolListIndex = {
  install: function(Vue){
    Vue.component('dol-address',DolAddress);
  }
};

// 导出组件
export default DolListIndex

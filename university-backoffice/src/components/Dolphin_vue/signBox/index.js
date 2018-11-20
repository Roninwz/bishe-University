//Created by wangshuyi on 07/03/2018.

'use strict';
import DolSignBox from './Dol-sign-box.vue'

// 这里是重点
const DolListIndex = {
  install: function(Vue){
    Vue.component('dol-sign-box',DolSignBox);
  }
};

// 导出组件
export default DolListIndex

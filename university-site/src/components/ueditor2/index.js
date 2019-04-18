//Created by wangshuyi on 07/03/2018.

'use strict';

//plugin

//component
import UEditor from './ueditor.vue'

export default {
  install(Vue){
    Vue.component('u-editor',UEditor);
  }
}

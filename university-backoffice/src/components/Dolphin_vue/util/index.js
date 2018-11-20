//Created by wangshuyi on 07/03/2018.

'use strict';

import plugin from './Dol-util'

export default {
  install(Vue){
    Vue.prototype.$util = plugin;
  }
};

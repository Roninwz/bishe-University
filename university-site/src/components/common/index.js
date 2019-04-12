//Created by wangshuyi on 07/03/2018.

'use strict';

import plugin from './common'
import config from './config'

export default {
  install(Vue){
    config(Vue);
    Vue.prototype.$common = plugin;
  }
};

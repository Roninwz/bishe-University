//Created by wangshuyi on 07/03/2018.

'use strict';
let Util = {
  Vue: null,
  getFileSize(num, unit){
    unit = unit || 'B';
    let units = ['B', 'K', 'M', 'G'];

    let i = units.findIndex(function (u) {
      return u === unit;
    });
    for (; i < units.length && num > 1024; i++) {
      num = num / 1024;
    }

    return num.toFixed(2) + units[i];
  },
  hideMiddle(str, prefix = 3, suffix = 4){
    let string = str + '';
    let repeatNumber = string.length - prefix - suffix;
    if(repeatNumber < 0){
      repeatNumber = 0;
      return string;
    }else{
      return string?string.substr(0, prefix) + '*'.repeat(repeatNumber) + string.substr(-suffix):'';
    }
  },
};

export default Util

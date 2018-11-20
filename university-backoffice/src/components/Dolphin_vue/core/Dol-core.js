//Created by wangshuyi on 07/03/2018.

'use strict';
const core = function (param) {
  return new Promise((resolve, reject) => {

  });
};

core.path = (function(){
  let obj = {},key;
  for(key in location){
    if(typeof location[key] !== 'function'){
      obj[key] = location[key];
    }
  }
  obj.contextPath = '';
  obj.apiPath = '/api';
  obj.publicPath = obj.apiPath + '/uploadFiles';
  return obj;
})();


export default core;

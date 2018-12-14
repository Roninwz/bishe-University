/**
 *
 * @author Roninwz
 * @date 2018/12/14 17:26
 * @since 1.0.0
 */

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

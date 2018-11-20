//Created by wangshuyi on 07/03/2018.

'use strict';
const defaultParam = {
  ajaxFlag: true,
  server: '/system/dict/options/{code}',
  Vue: null,
};

class Dict{
  constructor(param){
    this.opts = Object.assign({}, defaultParam, param);
    this.dictCache = {};
    this.dictLoading = {};
  }

  addDict(code, data){
    this.dictCache[code] = data;
    return Dict;
  }
  getDict(code, params){
    return new Promise((resolve, reject) => {
      let data = this.dictCache[code];

      if(data){
        resolve(data);
      }else if(this.opts.ajaxFlag){
        this.loadDict(code).then(options => {
          resolve(options);
        }).catch(e => {
          resolve([]);
          console.log(e);
        });
      }else{
        resolve(null);
      }
    });
  }
  loadDict(code){
    return new Promise((resolve, reject) => {
      if(!this.dictCache[code] && this.dictLoading[code]){
        let getDictFormLoading = setInterval(() => {
          if(this.dictCache[code]){
            resolve(this.dictCache[code]);
            clearInterval(getDictFormLoading);
          }
        }, 200);
      }else{
        this.dictLoading[code] = true;
        this.opts.Vue.$ajax({
          url: this.opts.server,
          pathData: {code : code},
        }).then(reData => {
          if(reData.rows.length > 0){
            this.dictCache[code] = reData.rows;
            resolve(reData.rows);
          }else{
            reject(reData.message);
          }
        }).catch(err => {
          reject(err.message);
        });
      }
    });
  }

  getDictText(code, option, params){
    return new Promise((resolve, reject) => {
      this.getDict(code).then(options => {
        let text = option;
        options.forEach(o => {
          if(o.code == option){
            text = o[params['labelField'] || 'text'];
          }
        });
        resolve(text);
      })
    });
  }
}

let dict = new Dict();

let $dict = function (code, option, params) {
  dict.opts.Vue = this;
  if(option){
    return dict.getDictText(code, option, params);
  }else{
    return dict.getDict(code, params);
  }
};
$dict.addDict = function (name, data) {
  dict.addDict(name, data);
};
export default $dict

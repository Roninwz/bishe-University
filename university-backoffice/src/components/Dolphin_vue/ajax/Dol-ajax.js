//Created by wangshuyi on 07/03/2018.

'use strict';
import axios from 'axios'

const defaultParam = {
  forceUrl: false,
};

const ajax = function (params) {
  return new Promise((resolve, reject) => {
    let param = Object.assign({}, defaultParam, params);

    if(!param.forceUrl && !new RegExp(`^${this.$Dolphin.path.apiPath}`).test(param.url)){
      param.url = this.$Dolphin.path.apiPath + param.url;
    }

    if(param.pathData){
      for(let key in param.pathData){
        param.url = param.url.replace(`{${key}}`, param.pathData[key]);
      }
    }

    let token = this.$store.state.token;
    if(param.loading && typeof this.$store.state.loading === 'boolean'){
      this.$store.commit('setLoading', true);
    }
    axios.request(Object.assign({
      headers: {token:token}
    }, param)).then(reData => {
      if(param.loading && typeof this.$store.state.loading === 'boolean'){
        this.$store.commit('setLoading', false);
      }
      if(reData.data && reData.data.success){
        resolve(reData.data);
      }else{
        this.$message(reData.data.message);
        reject(reData.data);
      }
    }).catch(e => {
      if(param.loading && typeof this.$store.state.loading === 'boolean'){
        this.$store.commit('setLoading', false);
      }
      this.$message(e.message);
    });
  });
};


export default ajax;

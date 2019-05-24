
import axios from 'axios'
import VueCookies from 'vue-cookies';



export default {
    login({commit, state, getters}, admin){
    return new Promise((resolve, reject) => {
          axios.post(this._vm.$Dolphin.path.apiPath + '/admin/login/loginCheck', admin).then(({data}) => {
            if(data.success){
              commit('saveAdminInfo', data.data);
              resolve(data);
            }else{
              reject(data.message);
            }
          });
    });
  },



  operateLog({commit, state, getters}, operateLog){
    return new Promise((resolve, reject) => {
          axios.post(this._vm.$Dolphin.path.apiPath + '/admin/operateLog/save', operateLog).then(({data}) => {
            if(data.success){
              resolve(data);
            }else{
              reject(data.message);
            }
          });
    });
  },


  saveOperateLog({commit, state},operateLog){
      commit('saveOperarteLog',operateLog);
  },

}



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

}


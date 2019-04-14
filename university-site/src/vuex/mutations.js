/**
 *
 * @author Roninwz
 * @date 2018/11/27 16:12
 * @since 1.0.0
 */
import VueCookies from 'vue-cookies';



export default {
  session(state){
    sessionStorage.setItem(state.cookieName, JSON.stringify(state));
    sessionStorage.setItem('userInfo', JSON.stringify(state.userInfo));
  },
  saveUserInfo(state, userInfo){
    state.userInfo = userInfo;
    this.commit('session');
  },
}


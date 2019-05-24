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
    sessionStorage.setItem('adminInfo', JSON.stringify(state.adminInfo));
  },
  saveAdminInfo(state, adminInfo){
    state.adminInfo = adminInfo;
    this.commit('session');
  },
  saveOperarteLog(state, operarteLog){
    state.operarteLog = operarteLog;
    this.commit('session');
  },
}


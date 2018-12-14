/**
 *
 * @author Roninwz
 * @date 2018/12/14 17:33
 * @since 1.0.0
 */
import  core from './core/Roninwz_core'




export default {
  install(Vue){
    Vue.prototype.$Roninwz = core;
  }
}

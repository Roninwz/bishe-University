/**
 *
 * @author Roninwz
 * @date 2018/12/14 17:33
 * @since 1.0.0
 */
import  core from './core/Roninwz_core'

import DolUpload from './upload/Dol-upload.vue'
import DolImgList from './upload/Dol-upload-img-List.vue'
import DolImg from './upload/Dol-upload-img.vue'


export default {
  install(Vue){
    Vue.prototype.$Roninwz = core;
    Vue.component('dol-upload',DolUpload);
    Vue.component('dol-upload-img-list',DolImgList);
    Vue.component('dol-upload-img',DolImg);
  }
}

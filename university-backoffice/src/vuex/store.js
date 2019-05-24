import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex);

// 应用初始状态
const state = {
  adminInfo: null,
  cookieName: 'University',
  operarteLog: {
    name: null,                        //日志名称
    address: null,                       //操作地点
    type: null,                             //操作类型
    action: null,                           //操作请求url
    status: null,                           //1操作成功  0操作失败
  },
};


// 创建 store 实例
export default new Vuex.Store({
  actions,
  state,
  mutations
})

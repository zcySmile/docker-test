/*
 * @Author: your name
 * @Date: 2020-12-11 13:47:24
 * @LastEditTime: 2020-12-11 13:48:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Ed
 * @FilePath: \testvue2\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vueRouter from 'vue-router'

Vue.use(vueRouter)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

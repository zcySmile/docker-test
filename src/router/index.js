/*
 * @Author: your name
 * @Date: 2020-12-11 11:47:09
 * @LastEditTime: 2020-12-11 13:46:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \testvue2\src\router\index.js
 */
import vueRouter from 'vue-router'

export default new vueRouter({
  routes: [
    {
      path: '/user',
      component: () => import('../components/user.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../components/about.vue')
    }
  ]
})
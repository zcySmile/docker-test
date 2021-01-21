import Vue from 'vue'
import VueRouter from './myVueRouter' //修改代码
import Home from './components/Home.vue'
import About from "./components/About.vue"
Vue.use(VueRouter)
  const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
];
const router = new VueRouter({
  mode:"history",
  routes
})
export default router
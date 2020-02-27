import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

Vue.use(Router)

//导出工厂函数
export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      { path: "/", component: Home },
      { path: "/about", component: About }
    ]
  })
}



import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    redirect: '/welcome',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/about',
        name: 'About',
        // 懒加载，需要使用的时候才加载
        component: () => import('../views/About.vue')
      },
      {
        path: '/welcome',
        name: 'Welcome',
        // 懒加载，需要使用的时候才加载
        component: () => import('../views/Welcome.vue')
      },
      {
        path: '/pms/product',
        name: 'Product',
        // 懒加载，需要使用的时候才加载
        component: () => import('../views/pms/Product.vue')
      }
    ]
  }
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes
})

export default router

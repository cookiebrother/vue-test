import router from './index'

//将导航守卫挂载到router
//白名单
const whileList = ['/login']
router.beforeEach((to, from, next) => {
  console.log(to, from)
  if (whileList.indexOf(to.path) !== -1) {
    next()
  } else {
    const token = window.sessionStorage.getItem('token')
    if (token) {
      // router.replace('/home')
      next()
    } else {
      next('/')
    }
  }
})

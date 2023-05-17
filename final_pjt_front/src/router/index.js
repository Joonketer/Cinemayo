import Vue from 'vue'
import VueRouter from 'vue-router'
import IntroPage from '@/views/IntroPage.vue'
// import HomePage from '@views/HomePage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/intro'
  },
  {
    path: '/intro',
    name:'IntroPage',
    component:IntroPage
  },
  // {
  //   path:'/home',
  //   name:'Home',
  //   component: HomePage
  // },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

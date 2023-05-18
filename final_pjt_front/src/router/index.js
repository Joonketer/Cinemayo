import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store' 
import IntroPage from '@/views/IntroPage.vue'
import HomePage from '@/views/HomePage.vue'
import MoviesView from '@/views/Movies/MoviesView.vue'
import MovieDetail from '@/views/Movies/MovieDetail.vue'
import ProfileView from '@/views/accounts/UserProfile.vue'



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
  {
    path:'/home',
    name:'Home',
    component: HomePage,
    meta: { requiresAuth: true }
  },
  {
    path:'/movies/:movieId',
    name:'movieDetail',
    component: MovieDetail,
    meta: { requiresAuth: true }
  },
  {
    path:'/movies',
    name:'movies',
    component: MoviesView,
    meta: { requiresAuth: true }
  },
  {
    path:'/profile/:username',
    name:'profile',
    component: ProfileView,
    meta: { requiresAuth: true }
  },
  {
    path:'/community',
    name:'community',
    component: CommunityBoard,
    meta: { requiresAuth: true }
  },
  {
    path: '/community/create',
    name: 'articleCreate',
    component: ArticleCreate,
    meta: { requiresAuth: true }
  },
  {
    path: '/community/:articlePk',
    name: 'article',
    component: ArticleView,
    meta: { requiresAuth: true }
  },
  {
    path: '/community/:articlePk/update',
    name: 'ArticleUpdate',
    component: ArticleUpdate,
    meta: { requiresAuth: true }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  // 여기서 'isLoggedIn'는 Vuex store의 getter나 state입니다.
  const isLoggedIn = store.getters.isLoggedIn

  // 로그인이 필요한 페이지에 대한 설정
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !isLoggedIn) {
    // 로그인이 필요하고 현재 로그인 상태가 아닌 경우
    next('/intro')
  } else {
    // 그 외 경우는 정상적으로 라우트를 진행
    next()
  }
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import ArticleView from '@/views/ArticleView'
import CreateView from '@/views/CreateView'
import DetailView from '@/views/DetailView'
import SignUpView from '@/views/SignUpView'
import LogInView from '@/views/LogInView'
import UserProfileView from '@/views/UserProfileView'
import DetailedSearchView from '@/views/DetailedSearchView'
import BoxOfficeView from '@/views/BoxOfficeView'
import FeaturedMovieView from '@/views/FeaturedMovieView'
import HomeView from '@/views/HomeView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
 
  {
    path: '/create',
    name: 'CreateView',
    component: CreateView
  },

  {
    path: '/signup',
    name: 'SignUpView',
    component: SignUpView
  },

  {
    path: '/login',
    name: 'LogInView',
    component: LogInView
  },

  {
    path: '/:id',
    name: 'DetailView',
    component: DetailView,
  },

  {
    path: '/:id/profile',
    name: 'UserProfileView',
    component: UserProfileView,
  },

  {
    path: '/detailsearch',
    name: 'DetailedSearchView',
    component: DetailedSearchView,
  },

  {
    path: '/boxoffice',
    name: 'BoxOfficeView',
    component: BoxOfficeView,
  },

  {
    path: '/featured',
    name: 'FeaturedMovieView',
    component: FeaturedMovieView,
  },

  {
    path: '/community',
    name: 'ArticleView',
    component: ArticleView,
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

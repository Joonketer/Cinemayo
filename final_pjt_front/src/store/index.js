import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import router from '../router'

const API_URL = 'http://127.0.0.1:8000'


Vue.use(Vuex)


export default new Vuex.Store({
  plugins: [
    createPersistedState(),
  ],
  state: {
    articles: [
    ],
    token: null,
    popularMovies:[],
    popularPage:1,
    topRatedMovies:[],
    topRatedPage:1,
    movies:[],
    page:1,
    itemsperpage:10,

  },
  getters: {
    isLogin(state) {
      return state.token ? true : false
    },
  },
  mutations: {
    SET_POPULAR_MOVIES(state, movies){
      state.popularMovies = movies.slice(0,5)
    },
    SET_TOP_RATED_MOVIES(state, movies){
      state.topRatedMovies = movies.slice(0,5)
    },
    INCREMENT_POPULAR_PAGE(state) {
      state.popularPage += 1;
    },
    DECREMENT_POPULAR_PAGE(state) {
      if (state.popularPage > 1) {
        state.popularPage -= 1;
      }
    },
    INCREMENT_TOP_RATED_PAGE(state) {
      state.topRatedPage += 1;
    },
    DECREMENT_TOP_RATED_PAGE(state) {
      if (state.topRatedPage > 1) {
        state.topRatedPage -= 1;
      }
    },
    GET_ARTICLES(state, articles) {
      state.articles = articles
    },
    // signup & login -> 완료하면 토큰 발급
    SAVE_TOKEN(state, token) {
      state.token = token
      router.push({ name: 'ArticleView' }) // store/index.js $router 접근 불가 -> import를 해야함
    },
    GET_MOVIES(state, movies){
      state.movies = movies;
    },
    RESET_PAGE(state){
      state.page=1;
    },
    INCREMENT_PAGE(state){
      if (state.page * state.itemsperpage < state.movies.length) {
        state.page += 1;
      } else {
        state.page = 1;
    }
  },
},
  actions: {
    nextPopularPage(context) {
      context.commit('INCREMENT_POPULAR_PAGE');
      context.dispatch('getMovies');
    },
    previousPopularPage(context) {
      context.commit('DECREMENT_POPULAR_PAGE');
      context.dispatch('getMovies');
    },
    nextTopRatedPage(context) {
      context.commit('INCREMENT_TOP_RATED_PAGE');
      context.dispatch('getMovies');
    },
    previousTopRatedPage(context) {
      context.commit('DECREMENT_TOP_RATED_PAGE');
      context.dispatch('getMovies');
    },
    getArticles(context) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/movies/`,
      })
        .then((res) => {
          // console.log(res, context)
          context.commit('GET_ARTICLES', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getMovies(context) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/movies/`,
      })
        .then((res) => {
          
          const movies = res.data;
          const popularMovies = [...movies].sort((a,b) => b.popularity - a.popularity)
          const topRatedMovies = [...movies].sort((a,b) => b.vote_average - a.vote_average)
          // context.commit('GET_MOVIES', res.data)
          context.commit('SET_POPULAR_MOVIES', popularMovies.slice(0, 5));
          context.commit('SET_TOP_RATED_MOVIES', topRatedMovies.slice(0, 5));
        })
        .catch((err) => {
          console.log(err)
        })
    },
    signUp(context, payload) {
      const username = payload.username
      const password1 = payload.password1
      const password2 = payload.password2

      axios({
        method: 'post',
        url: `${API_URL}/accounts/signup/`,
        data: {
          username, password1, password2
        }
      })
        .then((res) => {
          // console.log(res)
          // context.commit('SIGN_UP', res.data.key)
          context.commit('SAVE_TOKEN', res.data.key)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    login(context, payload) {
      const username = payload.username
      const password = payload.password

      axios({
        method: 'post',
        url: `${API_URL}/accounts/login/`,
        data: {
          username, password
        }
      })
        .then((res) => {
          context.commit('SAVE_TOKEN', res.data.key)
        })
        .catch((err) => console.log(err))
    }
  },
  modules: {
  }
})
